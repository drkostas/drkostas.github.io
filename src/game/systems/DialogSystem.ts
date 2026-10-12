/**
 * DialogSystem — Phaser-side dialog manager.
 *
 * Emits SHOW_DIALOG to trigger the React DialogBox overlay,
 * then waits for DIALOG_COMPLETE before resolving the promise.
 * This lets callers `await dialogSystem.showDialog(...)` and
 * block game logic (e.g. NPC movement) until the player finishes reading.
 */

import {
  GameEvents,
  emitGameEvent,
  onGameEvent,
  type DialogPayload,
} from "@/game/EventBridge";
import { getSave } from "@/game/systems/GameSave";
import { resolveTemplates } from "@/game/systems/TemplateResolver";

/**
 * Replace `{NAME}` placeholders in a string with the player's name
 * from the current save (fallback: "TRAINER"). Other placeholders
 * can be added here as the game grows (e.g. `{RIVAL}`, `{MOM}`).
 */
export function interpolateText(text: string): string {
  const save = getSave();
  const name = save.playerName || "TRAINER";
  return text.replace(/\{NAME\}/g, name);
}

/** Run `interpolateText` on every entry of an array. */
export function interpolateLines(lines: string[]): string[] {
  return lines.map(interpolateText);
}

/**
 * Word-wrap a single string at word boundaries.
 * Returns an array of lines, each at most `maxWidth` characters.
 */
export function wordWrap(text: string, maxWidth: number = 36): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current.length + word.length + 1 > maxWidth && current.length > 0) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Dynamically pick a word-wrap column count based on the current
 * viewport width. Portrait phones (iPhone 14 Pro ~393px) need ~24
 * columns; landscape phones (~852px) ~30; desktops and up stay at 36.
 * Reads `window.innerWidth` once at pagination time so the page is
 * re-paginated on each showDialog call. If `window` is undefined
 * (SSR), fall back to 36.
 */
function viewportWrapWidth(): number {
  if (typeof window === "undefined") return 36;
  const w = window.innerWidth;
  if (w < 450) return 24;
  if (w < 700) return 28;
  if (w < 900) return 30;
  return 36;
}

/**
 * Paginate dialog lines into 2-line pages (OG Pokemon Emerald style).
 *
 * - Long lines are word-wrapped at a viewport-appropriate width
 *   (24 columns on portrait phones, 30 on landscape phones, 36 on
 *   desktop). Previously hard-coded 36, which overflowed on 393px.
 * - Empty strings act as forced page breaks.
 * - Lines are grouped into pages of `linesPerPage` (default 2),
 *   joined with `\n` so DialogBox can render them with pre-wrap.
 */
export function paginateDialog(rawLines: string[], linesPerPage: number = 2): string[] {
  const wrapCols = viewportWrapWidth();
  const wrapped = rawLines.flatMap((line) => {
    if (line === "") return [""]; // preserve forced page breaks
    return wordWrap(line, wrapCols);
  });

  const pages: string[] = [];
  let buffer: string[] = [];
  for (const line of wrapped) {
    if (line === "") {
      if (buffer.length > 0) {
        pages.push(buffer.join("\n"));
        buffer = [];
      }
      continue;
    }
    buffer.push(line);
    if (buffer.length >= linesPerPage) {
      pages.push(buffer.join("\n"));
      buffer = [];
    }
  }
  if (buffer.length > 0) pages.push(buffer.join("\n"));
  return pages;
}

export class DialogSystem {
  private isActive = false;
  private resolveDialog: (() => void) | null = null;
  private unsubscribe: (() => void) | null = null;

  constructor() {
    this.unsubscribe = onGameEvent(GameEvents.DIALOG_COMPLETE, () => {
      this.isActive = false;
      if (this.resolveDialog) {
        this.resolveDialog();
        this.resolveDialog = null;
      }
    });
  }

  /** Whether a dialog is currently being shown. */
  get active(): boolean {
    return this.isActive;
  }

  /**
   * Show a dialog and wait for the player to dismiss it.
   * Resolves once the React overlay fires DIALOG_COMPLETE.
   *
   * If called while a previous dialog is still active, the previous
   * `resolveDialog` would be silently overwritten, leaving the first
   * await hanging forever. This is a latent bug that fires whenever
   * two code paths race to show a dialog in the same frame (e.g.
   * badge-earned notification + pickup dialog). We reject the
   * second call with a typed error so the caller sees the race
   * instead of the hung await.
   */
  async showDialog(payload: DialogPayload): Promise<void> {
    // The guard reads `isActive` alone, and the resolver is set before the first
    // `await`: template resolution awaits, and a second call made in the same frame
    // used to find no resolver yet, pass the guard and overwrite the first one.
    if (this.isActive) {
      return Promise.reject(
        new Error(
          "DialogSystem: showDialog called while another dialog is still open. " +
            "Await the first dialog before starting a second one, or queue them.",
        ),
      );
    }
    this.isActive = true;
    const done = new Promise<void>((resolve) => {
      this.resolveDialog = resolve;
    });
    // 0. Resolve {{ namespace.key }} templates (only runs if tokens present)
    const templateResolved = await resolveTemplates(payload.lines);
    // 1. Interpolate {NAME} placeholders using the current save
    // 2. Word-wrap + group into 2-line pages
    // Interpolation runs BEFORE pagination so wrap sees the final length.
    const interpolated = interpolateLines(templateResolved);
    const paginated = paginateDialog(interpolated);
    const speakerName = payload.speakerName
      ? interpolateText(payload.speakerName)
      : undefined;
    emitGameEvent(GameEvents.SHOW_DIALOG, {
      ...payload,
      lines: paginated,
      speakerName,
    });
    return done;
  }

  /** Clean up the event listener (call on scene shutdown). */
  destroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
}
