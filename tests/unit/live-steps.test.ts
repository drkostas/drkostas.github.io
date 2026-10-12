import { describe, it, expect } from "vitest";
import {
  computeStepState,
  formatStepsDialog,
} from "@/game/npcs/live/steps";

/**
 * Step Tracker NPC — the 5th "live" NPC, reading local step count
 * instead of an HTTP API. Tests use dependency injection via
 * `computeStepState(opts)` so we don't need a mocked localStorage.
 */

describe("Live NPC — Step Tracker", () => {
  describe("computeStepState", () => {
    it("broke player → shows cheapest TM with deficit", () => {
      const state = computeStepState({
        steps: 50,
        hasItemFn: () => false, // nothing owned
      });
      expect(state.allOwned).toBe(false);
      expect(state.nextUnaffordable).toBeDefined();
      // Cheapest unowned TM is tm_numpy at 150 steps.
      expect(state.nextUnaffordable?.itemId).toBe("tm_numpy");
      expect(state.nextUnaffordable?.price).toBe(150);
      expect(state.nextUnaffordable?.deficit).toBe(100);
    });

    it("player with enough steps for a TM → deficit 0", () => {
      const state = computeStepState({
        steps: 500,
        hasItemFn: () => false,
      });
      expect(state.nextUnaffordable?.itemId).toBe("tm_numpy");
      expect(state.nextUnaffordable?.deficit).toBe(0);
    });

    it("player owns cheap TMs → points at next cheapest", () => {
      const state = computeStepState({
        steps: 500,
        // Owns numpy + pandas. Next cheapest is tailwind, which costs 150 since
        // the first four TMs were all priced at 150 (StepMilestones.ts).
        hasItemFn: (id) => id === "tm_numpy" || id === "tm_pandas",
      });
      expect(state.nextUnaffordable?.itemId).toBe("tm_tailwind");
      expect(state.nextUnaffordable?.price).toBe(150);
    });

    it("all TMs owned → allOwned=true, no nextUnaffordable", () => {
      const state = computeStepState({
        steps: 999999,
        hasItemFn: () => true,
      });
      expect(state.allOwned).toBe(true);
      expect(state.nextUnaffordable).toBeUndefined();
    });
  });

  describe("formatStepsDialog", () => {
    it("all-owned render mentions 'every TM'", () => {
      const lines = formatStepsDialog({ steps: 12345, allOwned: true });
      expect(lines.join(" ")).toContain("every TM");
      expect(lines.join(" ")).toContain("12"); // formatted step count
    });

    it("affordable render mentions 'can afford'", () => {
      const lines = formatStepsDialog({
        steps: 500,
        allOwned: false,
        nextUnaffordable: {
          itemId: "tm_tailwind",
          tm: "TAILWIND",
          price: 250,
          deficit: 0,
        },
      });
      expect(lines.join(" ")).toContain("can afford");
      expect(lines.join(" ")).toContain("TAILWIND");
    });

    it("deficit render shows steps remaining", () => {
      const lines = formatStepsDialog({
        steps: 50,
        allOwned: false,
        nextUnaffordable: {
          itemId: "tm_numpy",
          tm: "NUMPY",
          price: 150,
          deficit: 100,
        },
      });
      const joined = lines.join(" ");
      expect(joined).toContain("NUMPY");
      expect(joined).toContain("150");
      expect(joined).toContain("100");
      expect(joined).toContain("more to go");
    });
  });
});
