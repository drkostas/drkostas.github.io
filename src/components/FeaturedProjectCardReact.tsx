import { motion } from "framer-motion";

const MAX_DESCRIPTION_CHARS = 120;

function truncate(text: string, max: number): { text: string; truncated: boolean } {
  if (text.length <= max) return { text, truncated: false };
  // Cut at the last word boundary before `max` so we don't chop mid-word
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  return { text: cut.replace(/[.,;:]+$/, ""), truncated: true };
}

type FeaturedProjectCardProps = {
  slug: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
  direction?: "left" | "right";
  className?: string;
};

export function FeaturedProjectCardReact({
  slug,
  name,
  image,
  description,
  tags,
  direction = "right",
  className = "",
}: FeaturedProjectCardProps) {
  const { text: shortDescription, truncated } = truncate(description, MAX_DESCRIPTION_CHARS);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const target = document.getElementById(`project-${slug}`);
    if (!target) return;

    // Measure any sticky/fixed header so the target lands below it.
    // If the header isn't sticky/fixed, it scrolls away naturally and offset is 0.
    let offset = 0;
    const header = document.querySelector<HTMLElement>('header[role="banner"]');
    if (header) {
      const { position } = window.getComputedStyle(header);
      if (position === "sticky" || position === "fixed") {
        offset = header.getBoundingClientRect().height;
      }
    }
    const BREATHING_ROOM = 16;
    const targetTop =
      window.scrollY + target.getBoundingClientRect().top - offset - BREATHING_ROOM;

    // Update URL hash without triggering default jump
    history.replaceState(null, "", `#project-${slug}`);
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    // Remove then re-add the class to retrigger the animation if clicked again
    target.classList.remove("project-highlight");
    // Force reflow so the animation restarts
    void target.offsetWidth;
    target.classList.add("project-highlight");
    window.setTimeout(() => {
      target.classList.remove("project-highlight");
    }, 2000);
  }

  return (
    <motion.li
      whileHover={{
        scale: 1.05,
        zIndex: 9999,
      }}
      whileTap={{ scale: 1.08, zIndex: 9999 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ zIndex: 1 }}
      className={`z-50 flex h-full flex-col rounded-3xl border border-border-primary bg-bg-primary p-2 ${className}`}
    >
      <a
        className="flex h-full cursor-pointer flex-col rounded-2xl"
        href={`#project-${slug}`}
        onClick={handleClick}
      >
        <img
          src={image}
          alt={name}
          className="aspect-[2/1] w-full rounded-2xl object-cover"
        />
        <div className="my-4 flex w-full flex-grow flex-col space-y-3 text-balance px-4">
          <h2 className="text-lg font-medium leading-7 tracking-tight text-text-primary">
            {name}
          </h2>
          <p className="flex-grow leading-7 text-text-secondary">
            {shortDescription}
            {truncated && (
              <>
                {"... "}
                <span className="font-medium text-indigo-600">read more</span>
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-primary px-2 py-0.5 text-xs text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.li>
  );
}
