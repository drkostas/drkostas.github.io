/**
 * Central item definitions — the single source of truth for every
 * item the player can collect. An item belongs to exactly one bag
 * pocket, so the giveItem flow can look the item up by id and route
 * it to the right pocket array in GameSave.
 *
 * Adding a new item:
 *   1. Pick an id and pocket.
 *   2. Drop an entry into ITEM_DEFINITIONS.
 *   3. Reference the id from wherever grants the item — a hidden item
 *      tile (hiddenItems.ts), an NPC gift, a step milestone, a
 *      questionnaire reward, etc.
 */

export type BagPocketId = "papers" | "blogs" | "keyItems" | "tms";

export interface ItemDef {
  /** Unique id — used for save persistence. */
  id: string;
  /** Display name shown in the bag and in pickup dialogs. */
  name: string;
  /** Which pocket this item lives in. */
  pocket: BagPocketId;
  /** Multi-line description for the bag's detail panel. */
  description: string;
  /** Optional URL — makes the item act like a link when USEd. */
  url?: string;
  /** Optional custom bag icon. Falls back to a pocket default. */
  icon?: string;
}

export const ITEM_DEFINITIONS: Record<string, ItemDef> = {
  // ── PAPERS pocket — the 10 real publications ────────────────
  // 6 gym papers (handed out by gym trainers) + 4 route papers
  // (given by route trainers). Data sourced from the old repo's
  // pages/api/published-papers.json; each has its own per-paper
  // venue URL instead of one shared scholar profile link.

  // --- 6 GYM papers ---------------------------------------------
  "paper_explore": {
    id: "paper_explore",
    name: "ExPLoRe",
    pocket: "papers",
    description:
      "Per-patch loss routing through\nSoft-MoE dispatch weights.\nECCV 2026.",
    url: "https://doi.org/10.1007/978-3-032-37314-4_16",
    icon: "/game/ui/bag/oran_berry.png",
  },
  "paper_medic": {
    id: "paper_medic",
    name: "MEDiC",
    pocket: "papers",
    description:
      "Multi-objective exploration\nof distillation from CLIP.\narXiv 2026.",
    url: "https://arxiv.org/abs/2603.29009",
    icon: "/game/ui/bag/master_ball.png",
  },
  "paper_dementia_chase": {
    id: "paper_dementia_chase",
    name: "Dementia Trust",
    pocket: "papers",
    description:
      "Trustworthy AI for early\ndementia detection.\nIEEE/ACM CHASE 2025.",
    url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&citation_for_view=b___QQ8AAAAJ:Tyk-4Ss8FVUC",
    icon: "/game/ui/bag/stardust.png",
  },
  "paper_multiscale_igarss": {
    id: "paper_multiscale_igarss",
    name: "Multi-scale MAE",
    pocket: "papers",
    description:
      "Fine-tuning strategies for\nmulti-scale remote sensing.\nIEEE IGARSS 2024.",
    url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&citation_for_view=b___QQ8AAAAJ:2osOgNQ5qMEC",
    icon: "/game/ui/bag/nugget.png",
  },
  "paper_crossscale_mae": {
    id: "paper_crossscale_mae",
    name: "Cross-Scale MAE",
    pocket: "papers",
    description:
      "Multiscale exploitation in\nremote sensing. 54 citations.\nNeurIPS 2023.",
    url: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/3fadcbd0437ef86ca1bba27a18ec7dff-Abstract-Conference.html",
    icon: "/game/ui/bag/star_piece.png",
  },
  "paper_semseg_wacv": {
    id: "paper_semseg_wacv",
    name: "Semantic Seg",
    pocket: "papers",
    description:
      "Multi-level contrastive learning\nfor aerial imagery.\nIEEE WACV 2023. 31 citations.",
    url: "https://openaccess.thecvf.com/content/WACV2023/html/Tang_Semantic_Segmentation_in_Aerial_Imagery_Using_Multi-Level_Contrastive_Learning_With_WACV_2023_paper.html",
    icon: "/game/ui/bag/revive.png",
  },

  // --- 4 ROUTE papers -------------------------------------------
  "paper_teaching_asst": {
    id: "paper_teaching_asst",
    name: "Teach. Asst.",
    pocket: "papers",
    description:
      "Teaching assistant for better\npseudo-labels in semi-sup OD.\nRev. Tec. en Marcha 2025.",
    url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&citation_for_view=b___QQ8AAAAJ:UeHWp8X0CEIC",
    icon: "/game/ui/bag/rare_candy.png",
  },
  "paper_koopman_igarss": {
    id: "paper_koopman_igarss",
    name: "Koopman KTD",
    pocket: "papers",
    description:
      "Koopman-based transition\ndetection in satellite imagery.\nIEEE IGARSS 2024.",
    url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&citation_for_view=b___QQ8AAAAJ:qjMakFHDy7sC",
    icon: "/game/ui/bag/max_elixir.png",
  },
  "paper_occasionally_secure": {
    id: "paper_occasionally_secure",
    name: "LLM Security",
    pocket: "papers",
    description:
      "Occasionally Secure —\na comparative analysis of\ncode-gen LLMs. arXiv 2024.",
    url: "https://arxiv.org/abs/2402.00689",
    icon: "/game/ui/bag/full_restore.png",
  },
  "paper_community_detection": {
    id: "paper_community_detection",
    name: "Community",
    pocket: "papers",
    description:
      "Distributed hybrid community\ndetection for social networks.\nAlgorithms (MDPI) 2019.",
    url: "https://www.mdpi.com/1999-4893/12/8/175",
    icon: "/game/ui/bag/hp_up.png",
  },

  // ── BLOG POSTS pocket — stories shared by NPCs ───────────────
  // Each blog has a unique in-game drop point (see NPC autoGive
  // wiring in npcs.ts / interiors.ts). The `url` will be replaced
  // with the real post URL when gkos.dev/blog goes live — for
  // now they share the landing URL and the description carries
  // the "real content" regression tests require.
  "blog_first_post": {
    id: "blog_first_post",
    name: "Hello World",
    pocket: "blogs",
    description: "My very first blog post.\nEvery journey starts here.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/tm_case.png",
  },
  "blog_phd_journey": {
    id: "blog_phd_journey",
    name: "PhD Journey",
    pocket: "blogs",
    description: "Reflections from the\nBredesen Center at UTK.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/old_amber.png",
  },
  "blog_clip_distill": {
    id: "blog_clip_distill",
    name: "CLIP Distill",
    pocket: "blogs",
    description:
      "How MEDiC shrinks CLIP\ninto a clinic-ready model.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/heart_scale.png",
  },
  "blog_mae_scale": {
    id: "blog_mae_scale",
    name: "MAE Across Scales",
    pocket: "blogs",
    description:
      "Why a single scale is never\nenough for remote sensing.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/star_piece.png",
  },
  "blog_maritime_ai": {
    id: "blog_maritime_ai",
    name: "Maritime AI",
    pocket: "blogs",
    description:
      "Building FleetSmart.ai from\na dorm room to production.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/aurora_ticket.png",
  },
  "blog_shiftmd_story": {
    id: "blog_shiftmd_story",
    name: "ShiftMD Story",
    pocket: "blogs",
    description:
      "Constraint programming for\nmedical shift scheduling.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/rare_candy.png",
  },
  "blog_ray_tune_tips": {
    id: "blog_ray_tune_tips",
    name: "Ray Tune Tips",
    pocket: "blogs",
    description:
      "HPO tricks I wish I knew\nbefore starting my PhD.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/full_restore.png",
  },
  "blog_amazon_l5": {
    id: "blog_amazon_l5",
    name: "Amazon L5",
    pocket: "blogs",
    description:
      "Lessons from year one as an\nApplied Scientist at Amazon.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/nugget.png",
  },
  "blog_jupyter_to_prod": {
    id: "blog_jupyter_to_prod",
    name: "Jupyter → Prod",
    pocket: "blogs",
    description:
      "Moving ML research from\nnotebooks to real systems.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/max_elixir.png",
  },
  "blog_why_i_blog": {
    id: "blog_why_i_blog",
    name: "Why I Blog",
    pocket: "blogs",
    description:
      "Writing is how I find out\nwhat I actually believe.",
    url: "https://gkos.dev/blog",
    icon: "/game/ui/bag/stardust.png",
  },

  // ── KEY ITEMS pocket — world exploration rewards ────────────
  "key_resume": {
    id: "key_resume",
    name: "RESUME.PDF",
    pocket: "keyItems",
    description: "KOSTAS's CV.\nUSE to download the PDF.",
    url: "/resume.pdf",
    icon: "/game/ui/bag/aurora_ticket.png",
  },
  "key_github": {
    id: "key_github",
    name: "GITHUB.URL",
    pocket: "keyItems",
    description: "8,300+ followers.\nVisit KOSTAS's GitHub.",
    url: "https://github.com/drkostas",
    icon: "/game/ui/bag/master_ball.png",
  },
  "key_linkedin": {
    id: "key_linkedin",
    name: "LINKEDIN.URL",
    pocket: "keyItems",
    description: "Professional profile\non LinkedIn.",
    url: "https://linkedin.com/in/drkostas",
    icon: "/game/ui/bag/amulet_coin.png",
  },
  "key_scholar": {
    id: "key_scholar",
    name: "SCHOLAR.URL",
    pocket: "keyItems",
    description: "Google Scholar.\n10 papers, 102+ citations.",
    url: "https://scholar.google.com/citations?user=drkostas",
    icon: "/game/ui/bag/lucky_egg.png",
  },
  "key_huggingface": {
    id: "key_huggingface",
    name: "HUGGINGFACE.URL",
    pocket: "keyItems",
    description: "HuggingFace models\nand datasets.",
    url: "https://huggingface.co/drkostas",
    icon: "/game/ui/bag/oran_berry.png",
  },
  "tm_portfolio": {
    id: "tm_portfolio",
    name: "TM PORTFOLIO",
    pocket: "tms",
    description: "Awarded for completing\nthe portfolio questionnaire.",
    icon: "/game/ui/bag/tm_case.png",
  },
  "key_rock_potion": {
    id: "key_rock_potion",
    name: "ROCK POTION",
    pocket: "keyItems",
    description: "A POTION you found\nbeside a rock.",
    icon: "/game/ui/bag/potion.png",
  },
  "key_research_log": {
    id: "key_research_log",
    name: "RESEARCH LOG",
    pocket: "keyItems",
    description: "KOSTAS's personal journal.\nUSE to read entries.",
    icon: "/game/ui/bag/old_amber.png",
  },
  // PHONE.NUMBER — endgame reward from MEW beyond the water
  // boundary. This is the key item whose presence triggers the
  // CHAMPION badge auto-award (see BadgeMilestones.ts §champion).
  "key_phone_number": {
    id: "key_phone_number",
    name: "PHONE.NUMBER",
    pocket: "keyItems",
    description:
      "KOSTAS's personal line.\n+865 978 9244\nCall when you're ready.",
    url: "tel:+8659789244",
    icon: "/game/ui/bag/heart_scale.png",
  },

  // ── TMs pocket — foundational starters + MART purchases ─────
  // STARTER TMs pre-loaded in the PC at the POKeMON CENTER on a
  // fresh save. These are the skills every ML engineer begins with
  // before buying higher-tier TMs from the MART (see StepMilestones
  // for the purchasable catalog).
  "tm_python": {
    id: "tm_python",
    name: "TM PYTHON",
    pocket: "tms",
    description: "The lingua franca of\nmachine learning.",
    icon: "/game/ui/bag/tm_case.png",
  },
  "tm_git": {
    id: "tm_git",
    name: "TM GIT",
    pocket: "tms",
    description: "Version control for every\nproject worth shipping.",
    icon: "/game/ui/bag/tm_case.png",
  },
  "tm_linux": {
    id: "tm_linux",
    name: "TM LINUX",
    pocket: "tms",
    description: "The operating system\nbehind every ML rig.",
    icon: "/game/ui/bag/tm_case.png",
  },
  // ── MART purchases — step-threshold catalog (StepMilestones) ──
  "tm_tailwind": {
    id: "tm_tailwind",
    name: "TM TAILWIND",
    pocket: "tms",
    description: "Utility-first CSS.\nWalked 250 steps.",
    icon: "/game/ui/bag/tm_case.png",
  },
  "tm_fastapi": {
    id: "tm_fastapi",
    name: "TM FASTAPI",
    pocket: "tms",
    description: "Python web framework.\nWalked 500 steps.",
    icon: "/game/ui/bag/pp_up.png",
  },
  "tm_nextjs": {
    id: "tm_nextjs",
    name: "TM NEXT.JS",
    pocket: "tms",
    description: "React meta-framework.\nWalked 1000 steps.",
    icon: "/game/ui/bag/pp_max.png",
  },
  "tm_docker": {
    id: "tm_docker",
    name: "TM DOCKER",
    pocket: "tms",
    description: "Containerization.\nWalked 1500 steps.",
    icon: "/game/ui/bag/fresh_water.png",
  },
  "tm_pytorch": {
    id: "tm_pytorch",
    name: "TM PYTORCH",
    pocket: "tms",
    description: "Deep learning framework.\nWalked 2000 steps.",
    icon: "/game/ui/bag/soda_pop.png",
  },
  "tm_aws": {
    id: "tm_aws",
    name: "TM AWS",
    pocket: "tms",
    description: "Cloud infrastructure.\nWalked 3000 steps.",
    icon: "/game/ui/bag/lemonade.png",
  },
  "tm_kubernetes": {
    id: "tm_kubernetes",
    name: "TM KUBERNETES",
    pocket: "tms",
    description: "Container orchestration.\nWalked 4000 steps.",
    icon: "/game/ui/bag/berry_juice.png",
  },
  "tm_terraform": {
    id: "tm_terraform",
    name: "TM TERRAFORM",
    pocket: "tms",
    description: "Infrastructure as code.\nWalked 6000 steps.",
    icon: "/game/ui/bag/lava_cookie.png",
  },
  "tm_system_design": {
    id: "tm_system_design",
    name: "TM SYSTEM DESIGN",
    pocket: "tms",
    description: "Architecture at scale.\nWalked 8000 steps.",
    icon: "/game/ui/bag/leftovers.png",
  },
  // ── Expansion to 20 TMs (7 additions) ──
  // Research-adjacent tools to round out the ML engineer toolkit.
  // NumPy/Pandas/Jupyter are cheap early wins; HuggingFace/Ray/
  // LangChain/Vercel slot into the upper tier.
  "tm_numpy": {
    id: "tm_numpy",
    name: "TM NUMPY",
    pocket: "tms",
    description: "Vectorized numerical\ncomputing. Walked 150 steps.",
    icon: "/game/ui/bag/potion.png",
  },
  "tm_pandas": {
    id: "tm_pandas",
    name: "TM PANDAS",
    pocket: "tms",
    description: "DataFrames, the MLE's\nspreadsheet. Walked 200 steps.",
    icon: "/game/ui/bag/super_potion.png",
  },
  "tm_jupyter": {
    id: "tm_jupyter",
    name: "TM JUPYTER",
    pocket: "tms",
    description: "Notebooks for research\niteration. Walked 300 steps.",
    icon: "/game/ui/bag/hyper_potion.png",
  },
  "tm_huggingface": {
    id: "tm_huggingface",
    name: "TM HUGGINGFACE",
    pocket: "tms",
    description: "Pretrained models +\ndatasets. Walked 2500 steps.",
    icon: "/game/ui/bag/max_potion.png",
  },
  "tm_ray": {
    id: "tm_ray",
    name: "TM RAY",
    pocket: "tms",
    description: "Distributed training\nat scale. Walked 5000 steps.",
    icon: "/game/ui/bag/rare_candy.png",
  },
  "tm_langchain": {
    id: "tm_langchain",
    name: "TM LANGCHAIN",
    pocket: "tms",
    description: "LLM orchestration +\nagents. Walked 7000 steps.",
    icon: "/game/ui/bag/max_elixir.png",
  },
  "tm_vercel": {
    id: "tm_vercel",
    name: "TM VERCEL",
    pocket: "tms",
    description: "Ship it, instantly.\nWalked 10000 steps.",
    icon: "/game/ui/bag/sacred_ash.png",
  },
};

/** Get a list of item definitions for a pocket. */
export function getItemsByPocket(pocket: BagPocketId): ItemDef[] {
  return Object.values(ITEM_DEFINITIONS).filter((i) => i.pocket === pocket);
}

/** Look up an item definition by id. Returns undefined if unknown. */
export function getItemDef(id: string): ItemDef | undefined {
  return ITEM_DEFINITIONS[id];
}

/** Display label for a pocket id. */
export const POCKET_LABELS: Record<BagPocketId, string> = {
  papers: "PAPERS",
  blogs: "BLOG POSTS",
  keyItems: "KEY ITEMS",
  tms: "TMs",
};
