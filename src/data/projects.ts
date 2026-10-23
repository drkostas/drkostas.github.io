export type ProjectCategory = "Machine Learning" | "Products" | "Tools" | "Fun";

export interface Project {
  slug: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  featured?: boolean;
  source_code?: string;
  demo?: string;
  live?: string;
  scholar?: string;
  pypi?: string;
  npm?: string;
  /** When this project was added to the site. Optional — if missing, the RSS
   *  feed falls back to the site-launch date so the item still appears. */
  addedAt?: Date;
}

export const projects: Project[] = [
  // ---- Machine Learning ----
  {
    slug: "explore",
    name: "ExPLoRe",
    image: "/projects/cards/explore.png",
    description:
      "Official PyTorch implementation of the ECCV 2026 ExPLoRe paper. Repurposes Soft-MoE dispatch weights as learned, per-patch loss coefficients for multi-objective masked image modeling — loss-coupling lets gradients flow through dispatch to the router for content-dependent specialization. ViT-Base + CLIP-B/16 teacher hits 80.6% linear probe and 85.3% finetune on ImageNet-1K.",
    tags: ["PyTorch", "Self-Supervised", "Soft-MoE", "MIM", "CLIP", "Computer-Vision", "ECCV-2026"],
    category: "Machine Learning",
    featured: true,
    source_code: "https://github.com/aicip/ExPLoRe",
    scholar: "https://doi.org/10.1007/978-3-032-37314-4_16",
  },
  {
    slug: "medic",
    name: "MEDiC",
    image: "/projects/cards/medic.png",
    description:
      "Official PyTorch implementation of MEDiC: Multi-objective Exploration of Distillation from CLIP. Combines token distillation, CLS alignment, and pixel reconstruction with Evolved Part Masking. Achieves 85.07% finetuning and 73.92% k-NN on ImageNet-1K.",
    tags: ["PyTorch", "Self-Supervised", "CLIP", "MIM", "Computer-Vision", "HuggingFace"],
    category: "Machine Learning",
    featured: true,
    source_code: "https://github.com/aicip/MEDiC",
    demo: "https://huggingface.co/drkostas/MEDiC-ViT-Base",
  },
  {
    slug: "cross-scale-mae",
    name: "Cross-scale MAE",
    image: "/projects/cards/cross-scale-mae.png",
    description:
      "Official code for the paper 'Cross-Scale MAE: A Tale of Multi-Scale Exploitation in Remote Sensing'. Self-supervised learning for multi-scale geospatial imagery.",
    tags: ["PyTorch", "MIM", "Computer-Vision"],
    category: "Machine Learning",
    source_code: "https://github.com/aicip/Cross-Scale-MAE",
    scholar:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&authuser=1&citation_for_view=b___QQ8AAAAJ:d1gkVwhDpl0C",
  },
  {
    slug: "maskdistill-pytorch",
    name: "MaskDistill-PyTorch",
    image: "/projects/cards/maskdistill-pytorch.png",
    description:
      "First open PyTorch reproduction of MaskDistill with pre-trained weights. Reproduces 84.8% finetuning accuracy (paper: 85.3%), with full evaluation suite: semantic segmentation, object detection, k-NN, and linear probe.",
    tags: ["PyTorch", "Self-Supervised", "CLIP", "Computer-Vision", "HuggingFace"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/MaskDistill-PyTorch",
    demo: "https://huggingface.co/drkostas/MaskDistill-ViT-Base",
  },
  {
    slug: "minecraft-ai",
    name: "Minecraft AI",
    image: "/projects/cards/minecraft-ai.png",
    description:
      "A Reinforcement Learning agent that learns how to solve maze missions in Minecraft.",
    tags: ["PyTorch", "Reinforcement-Learning", "Minecraft"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/Minecraft-AI",
  },
  {
    slug: "3d-semantic-segmentation",
    name: "3D Semantic Segmentation",
    image: "/projects/cards/3d-semantic-segmentation.png",
    description: "Semantic Segmentation with Transformers on 3D Medical Images.",
    tags: ["PyTorch", "OpenCV", "SegFormer", "Semantic-Segmentation", "Medical-Imaging"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/3D-Semantic-Segmentation",
  },
  {
    slug: "bert-qa",
    name: "BERT Question Answering",
    image: "/projects/cards/bert-qa.png",
    description: "BERT-based question answering / reading comprehension methods on Rinehart Novels.",
    tags: ["PyTorch", "SpaCy", "HuggingFace", "Transformers", "BERT"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/Bert-Question-Answering",
  },
  {
    slug: "accident-severity-prediction",
    name: "Accident Severity Prediction",
    image: "/projects/cards/accident-severity-prediction.png",
    description: "Predicting the severity of car accidents from various attributes.",
    tags: ["Pandas", "Scipy", "Bayesian-Optimization", "XGBoost", "Neural-Network"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/accident-severity-prediction",
  },
  {
    slug: "covid-vaccination-prediction",
    name: "COVID-19 Vaccination Prediction",
    image: "/projects/cards/covid-vaccination-prediction.png",
    description: "Simultaneous Time Series Forecasting on the global COVID-19 Daily Vaccinations.",
    tags: ["Tensorflow", "LSTMs", "Multivariate-Time-Series"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/covid19-vaccinations-predict",
  },
  {
    slug: "instagram-likes-prediction",
    name: "Instagram Likes Prediction",
    image: "/projects/cards/instagram-likes-prediction.png",
    description: "First attempt on predicting the likes a photo will get on Instagram.",
    tags: ["Tensorflow", "OpenCV", "Instagram", "Scraper", "CNN"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/Insta-Likes-Predict",
  },
  {
    slug: "rl-value-iteration",
    name: "RL Value Iteration",
    image: "/projects/cards/rl-value-iteration.png",
    description: "Implementation of value iteration algorithm for calculating an optimal MDP policy.",
    tags: ["Markov-Decision-Process", "Value-Iteration", "RL"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/RL-Value-Iteration",
  },

  // ---- Products ----
  {
    slug: "macro-engine",
    name: "macro-engine",
    image: "/projects/cards/macro-engine.png",
    description:
      "A self-hosted nutrition tracker for people who track their macros closely. Log meals, track weight, set a deficit target, and plan meal variations. It computes your TDEE and daily macro targets, with optional Garmin sync and natural-language meal parsing.",
    tags: ["Next.js", "Node", "PostgreSQL", "Docker", "nutrition"],
    category: "Products",
    source_code: "https://github.com/drkostas/macro-engine",
    addedAt: new Date("2026-10-09T11:48:00"),
  },
  {
    slug: "gkos-dev",
    name: "gkos.dev (this site)",
    image: "/projects/cards/gkos-dev.png",
    description:
      "The personal portfolio + blog you're on right now. Astro + Tailwind + React islands + Supabase + PostHog. Built to ship fast, stay light, and own its own analytics.",
    tags: ["Astro", "Tailwind", "React", "Supabase", "PostHog", "Vercel"],
    category: "Products",
    source_code: "https://github.com/drkostas/gkos.dev",
    live: "https://gkos.dev",
  },
  {
    slug: "hevy2garmin",
    name: "Hevy → Garmin Sync",
    image: "/projects/cards/hevy2garmin.png",
    description:
      "Web tool that pulls strength workouts from Hevy and writes them into Garmin Connect with exercise names, sets, reps, weights, HR overlay, and calorie estimation. Solves a real gap in both apps' APIs. 36 stars, 109 forks — the most-forked project I have.",
    tags: ["Python", "FastAPI", "Garmin", "Hevy", "OAuth"],
    category: "Products",
    source_code: "https://github.com/drkostas/hevy2garmin",
    demo: "https://hevy2garmin-demo.gkos.dev",
  },
  {
    slug: "fleetsmart",
    name: "FleetSmart.ai",
    image: "/projects/cards/fleetsmart.png",
    description:
      "AI-powered maritime decision engine. Helps shipowners make profitable positioning decisions: which vessel goes where, when to reposition, how to bid on cargo. Role: technical lead on a contract build — backend, LLM agent layer, data pipelines, cloud infra. Closed-source (commercial product), live in production with paying customers.",
    tags: ["FastAPI", "Next.js", "GCP", "LLM", "Agents", "PostgreSQL"],
    category: "Products",
    live: "https://fleetsmart.ai",
  },
  {
    slug: "shiftmd",
    name: "ShiftMD",
    image: "/projects/cards/shiftmd.png",
    description:
      "Intelligent shift scheduling system for medical departments using constraint programming optimization.",
    tags: ["Next.js", "Python", "OR-Tools", "Supabase"],
    category: "Products",
  },
  {
    slug: "xpensai",
    name: "XpensAI",
    image: "/projects/cards/xpensai.png",
    description:
      "AI-powered expense management platform with automated receipt scanning, OCR, and intelligent categorization.",
    tags: ["Python", "AWS", "Azure", "GPT-4o", "Serverless"],
    category: "Products",
    live: "https://xpensai.com",
  },
  {
    slug: "soma",
    name: "Soma",
    image: "/projects/cards/soma.png",
    description:
      "Personal health and fitness dashboard aggregating data from Garmin, Strava, and Hevy into a unified analytics view.",
    tags: ["Python", "Next.js", "Garmin", "Strava"],
    category: "Products",
    featured: true,
    source_code: "https://github.com/drkostas/soma",
    demo: "https://soma-demo.gkos.dev",
  },

  // ---- Tools (PyPI) ----
  {
    slug: "weekpage",
    name: "weekpage",
    image: "/projects/cards/weekpage.png",
    description:
      "A printable weekly planner. One A4 sheet with seven day columns and hour rows, filled in from my calendars and the wind forecast and anything else I give it, with the rest left to write by hand. The page is drawn as HTML and printed to a vector PDF, so the lines stay sharp at any size.",
    tags: ["Python", "CLI", "iCalendar", "Open-Meteo", "PDF"],
    category: "Tools",
    source_code: "https://github.com/drkostas/weekpage",
    addedAt: new Date("2026-10-13T12:00:00"),
  },
  {
    slug: "plaincard",
    name: "plaincard",
    image: "/projects/cards/plaincard.png",
    description:
      "Makes plain, consistent images for projects from a few lines of spec. Project cards, README banners, diagrams and icons, all in one dark style with a monospace name and a flat line drawing. A pip package and a Claude Code plugin, and the tool that drew the cards on this page.",
    tags: ["PyPi", "Python", "SVG", "Claude-Code", "CLI"],
    category: "Tools",
    source_code: "https://github.com/drkostas/plaincard",
    pypi: "https://pypi.org/project/plaincard/",
    addedAt: new Date("2026-10-09T13:00:00"),
  },
  {
    slug: "claude-ops",
    name: "claude-ops",
    image: "/projects/cards/claude-ops.png",
    description:
      "Command-line tools for running many Claude Code chats on one machine. Find any chat across your project folders, send a message into one that is already running, start named chats in tmux, and restore transcripts that Claude Code deleted.",
    tags: ["PyPi", "Python", "CLI", "tmux", "automation"],
    category: "Tools",
    source_code: "https://github.com/drkostas/claude-ops",
    pypi: "https://pypi.org/project/claude-ops/",
    addedAt: new Date("2026-10-09T12:00:00"),
  },
  {
    slug: "claude-human",
    name: "claude-human",
    image: "/projects/cards/claude-human.png",
    description:
      "A toolkit for a Mac shared by a person and an agent, so the agent can hand one step to a human: approve a prompt, check a window, type a password at the lock screen. It captures the screen, streams a single window to your phone, and sends notifications that Android will not silence.",
    tags: ["PyPi", "Python", "Swift", "TypeScript", "macOS"],
    category: "Tools",
    source_code: "https://github.com/drkostas/claude-human",
    pypi: "https://pypi.org/project/claude-human/",
    addedAt: new Date("2026-10-09T11:59:00"),
  },
  {
    slug: "couchctl",
    name: "couchctl",
    image: "/projects/cards/couchctl.png",
    description:
      "A command-line tool for the Samsung and Android TVs on your network. Read and switch power, open apps, press remote keys, and redirect the remote's fixed app buttons, like Prime Video or Disney+, to the apps you actually use.",
    tags: ["PyPi", "Python", "CLI", "adb", "smart-home"],
    category: "Tools",
    source_code: "https://github.com/drkostas/couchctl",
    pypi: "https://pypi.org/project/couchctl/",
    addedAt: new Date("2026-10-09T11:58:00"),
  },
  {
    slug: "iphone2android",
    name: "iphone2android",
    image: "/projects/cards/iphone2android.png",
    description:
      "Moves you from an iPhone to an Android phone without leaving data behind. It reads an encrypted iPhone backup and recovers what the official transfer misses: messages, call history, photos, app data, accounts, and even the exact home screen layout, over adb.",
    tags: ["PyPi", "Python", "CLI", "adb", "Android"],
    category: "Tools",
    source_code: "https://github.com/drkostas/iphone2android",
    pypi: "https://pypi.org/project/iphone2android/",
    addedAt: new Date("2026-10-09T11:57:00"),
  },
  {
    slug: "3d-review",
    name: "3d-review",
    image: "/projects/cards/3d-review.png",
    description:
      "A bench for reviewing a 3D-printable design together with an assistant. You load the model, mark what is wrong on a part, and receive answers as pictures from the same camera. A step ledger keeps a locked placement locked, and a requirement board is proven able to fail so a green board is not a false pass.",
    tags: ["PyPi", "Python", "trimesh", "Penpot", "3D-printing"],
    category: "Tools",
    source_code: "https://github.com/drkostas/3d-review",
    pypi: "https://pypi.org/project/3d-review/",
    addedAt: new Date("2026-10-09T11:56:00"),
  },
  {
    slug: "3d-card",
    name: "3d-card",
    image: "/projects/cards/3d-card.png",
    description:
      "Turns a set of 3D-printable parts into one printable kit card, like the sprue of a plastic model kit. It lays the parts on a frame, gates and numbers them, then cuts the gates itself and checks every piece comes back whole and loose. It also makes print-in-place joints with clearances measured from real test coupons.",
    tags: ["PyPi", "Python", "build123d", "trimesh", "3D-printing"],
    category: "Tools",
    source_code: "https://github.com/drkostas/3d-card",
    pypi: "https://pypi.org/project/3d-card/",
    addedAt: new Date("2026-10-09T11:55:00"),
  },
  {
    slug: "3d-base",
    name: "3d-base",
    image: "/projects/cards/3d-base.png",
    description:
      "Renders pictures of 3D meshes with no display, OpenGL, or browser, so a script can inspect models for printing. It keeps a per-pixel depth so overlapping parts draw in the right order, shades curves smoothly while keeping real edges sharp, and checks an exported STL for extra bodies and sealed cavities.",
    tags: ["PyPi", "Python", "numpy", "STL", "3D-printing"],
    category: "Tools",
    source_code: "https://github.com/drkostas/3d-base",
    pypi: "https://pypi.org/project/3d-base/",
    addedAt: new Date("2026-10-09T11:54:00"),
  },
  {
    slug: "sqlgate",
    name: "sqlgate",
    image: "/projects/cards/sqlgate.png",
    description:
      "Serves a Postgres or MySQL database you host yourself to serverless apps, without opening a database port to the internet. It answers in the exact shape the Neon serverless driver speaks, so an app already using that driver works against your own database by changing only the connection string.",
    tags: ["npm", "Node", "Postgres", "MySQL", "serverless"],
    category: "Tools",
    source_code: "https://github.com/drkostas/sqlgate",
    npm: "https://www.npmjs.com/package/@drkostas/sqlgate",
    pypi: "https://pypi.org/project/sqlgate-client/",
    addedAt: new Date("2026-10-09T11:53:00"),
  },
  {
    slug: "soma-style",
    name: "soma-style",
    image: "/projects/cards/soma-style.png",
    description:
      "The shared design tokens for the soma apps: the macro colors, the chart palette, and the status colors in one place, so soma, macro-engine, and the rest all render the same. Ships TypeScript tokens and Tailwind v4 CSS.",
    tags: ["npm", "TypeScript", "Tailwind", "design-tokens", "soma"],
    category: "Tools",
    source_code: "https://github.com/drkostas/soma-style",
    npm: "https://www.npmjs.com/package/soma-style",
    addedAt: new Date("2026-10-09T11:51:00"),
  },
  {
    slug: "banister",
    name: "banister",
    image: "/projects/cards/banister.png",
    description:
      "A TypeScript port of soma's training engine. It fits the Banister fitness-fatigue model to your training data, adds Daniels and Gilbert VDOT math for race paces, and covers readiness, pace zones, and a performance management chart. Pure functions, checked against the Python original with golden fixtures.",
    tags: ["npm", "TypeScript", "sports-science", "soma"],
    category: "Tools",
    source_code: "https://github.com/drkostas/banister",
    npm: "https://www.npmjs.com/package/banister",
    addedAt: new Date("2026-10-09T11:50:00"),
  },
  {
    slug: "run-dj",
    name: "run-dj",
    image: "/projects/cards/run-dj.png",
    description:
      "The core of soma's running DJ. Given a live heart rate it picks the target music BPM for that effort, and given a pool of songs it shuffles a session so same-artist tracks are spaced evenly instead of clustering. No I/O, so the same math runs on a treadmill, a playlist builder, or a cron job.",
    tags: ["npm", "TypeScript", "Spotify", "soma"],
    category: "Tools",
    source_code: "https://github.com/drkostas/run-dj",
    npm: "https://www.npmjs.com/package/run-dj",
    addedAt: new Date("2026-10-09T11:49:00"),
  },
  {
    slug: "python-search-engine",
    name: "Python Search Engine",
    image: "/projects/cards/python-search-engine.png",
    description:
      "A search engine for the Gutenberg Project archive, written in Python with a Flask front-end. Inverted-index lookup, ranked retrieval, query suggestions.",
    tags: ["Python", "Flask", "IR", "Search"],
    category: "Tools",
    source_code: "https://github.com/drkostas/python_search_engine",
    live: "https://search.gkos.dev",
  },
  {
    slug: "garmin-auth",
    name: "Garmin Auth",
    image: "/projects/cards/garmin-auth.png",
    description:
      "Self-healing Garmin Connect OAuth authentication. Handles the complex SSO flow (OAuth1 to OAuth2), automatic token refresh, and rate limit recovery.",
    tags: ["PyPi", "Garmin", "OAuth", "Python", "authentication"],
    category: "Tools",
    source_code: "https://github.com/drkostas/garmin-auth",
    pypi: "https://pypi.org/project/garmin-auth/",
  },
  {
    slug: "high-sql",
    name: "High SQL",
    image: "/projects/cards/high-sql.png",
    description: "A high-level SQL command utility. Currently only MySQL is supported.",
    tags: ["PyPi", "MySQL", "CircleCI", "wrapper"],
    category: "Tools",
    source_code: "https://github.com/drkostas/high-sql",
    pypi: "https://pypi.org/project/high-sql/",
  },
  {
    slug: "cloud-filemanager",
    name: "Cloud File Manager",
    image: "/projects/cards/cloud-filemanager.png",
    description: "A high-level filemanager utility for cloud services. Currently only Dropbox is supported.",
    tags: ["PyPi", "Dropbox", "CircleCI", "wrapper"],
    category: "Tools",
    source_code: "https://github.com/drkostas/cloud-filemanager",
    pypi: "https://pypi.org/project/cloud-filemanager/",
  },
  {
    slug: "yaml-wrapper",
    name: "YAML Wrapper",
    image: "/projects/cards/yaml-wrapper.png",
    description: "A YAML configuration wrapper.",
    tags: ["PyPi", "CircleCI", "yaml", "configuration", "wrapper"],
    category: "Tools",
    source_code: "https://github.com/drkostas/yaml-config-wrapper",
    pypi: "https://pypi.org/project/yaml-config-wrapper/",
  },
  {
    slug: "color-logger",
    name: "Color Logger",
    image: "/projects/cards/color-logger.png",
    description: "A logger with text formatting using termcolor.",
    tags: ["PyPi", "CircleCI", "logger", "termcolor"],
    category: "Tools",
    source_code: "https://github.com/drkostas/termcolor-logger",
    pypi: "https://pypi.org/project/termcolor-logger/",
  },
  {
    slug: "email-sender",
    name: "Email Sender",
    image: "/projects/cards/email-sender.png",
    description: "A utility for sending emails with attachments. Currently only Gmail is supported.",
    tags: ["PyPi", "Gmail", "wrapper"],
    category: "Tools",
    source_code: "https://github.com/drkostas/pyemail-sender",
    pypi: "https://pypi.org/project/pyemail-sender/",
  },
  {
    slug: "benchmark-tools",
    name: "Benchmark Tools",
    image: "/projects/cards/benchmark-tools.png",
    description: "A collection of benchmarking tools.",
    tags: ["PyPi", "CircleCI", "benchmarking"],
    category: "Tools",
    source_code: "https://github.com/drkostas/bench-utils",
    pypi: "https://pypi.org/project/bench-utils/",
  },

  // ---- Fun ----
  {
    slug: "poke-starters",
    name: "poke-starters",
    image: "/projects/cards/poke-starters.png",
    description:
      "Finds the best Pokémon starter trio you could actually catch, across Kanto, Johto, Hoenn, and Sinnoh. Pick your regions, types, and a power budget, and it searches every legal combination, then reveals the winning team through a gated slot machine so the result is not spoiled. Real Town Maps show where to catch each one.",
    tags: ["JavaScript", "Web-Worker", "Pokemon", "game"],
    category: "Fun",
    source_code: "https://github.com/drkostas/poke-starters",
    demo: "https://poke-starters-demo.gkos.dev",
    addedAt: new Date("2026-10-09T11:52:00"),
  },
  {
    slug: "youtube-comment-bot",
    name: "YouTube Comment Bot",
    image: "/projects/cards/youtube-comment-bot.png",
    description: "A bot that posts the first comment on every new video of specified channels.",
    tags: ["Youtube", "Gmail", "Dropbox", "MySQL", "AWS", "CircleCI", "Heroku"],
    category: "Fun",
    source_code: "https://github.com/drkostas/Youtube-FirstCommentBot",
    demo: "https://www.youtube.com/channel/UC_nnPV1zXEqIP42HOiVdg1A",
  },
  {
    slug: "job-application-bot",
    name: "Job Application Bot",
    image: "/projects/cards/job-application-bot.png",
    description: "A bot that automatically sends emails to new ads posted in any desired xe.gr search url.",
    tags: ["Gmail", "Dropbox", "MySQL", "AWS", "CircleCI", "Heroku", "Scraper"],
    category: "Fun",
    source_code: "https://github.com/drkostas/JobApplicationBot",
  },
  {
    slug: "tunecraft",
    name: "TuneCraft",
    image: "/projects/cards/tunecraft.png",
    description:
      "Effortlessly create personalized Spotify playlists with fresh, undiscovered tracks tailored to your taste.",
    tags: ["Spotify", "automation"],
    category: "Fun",
    source_code: "https://github.com/drkostas/TuneCraft",
  },
  {
    slug: "spotify-button-presser",
    name: "Spotify Button Presser",
    image: "/projects/cards/spotify-button-presser.png",
    description: "An app that clicks a physical button whenever Spotify starts playing on the target device.",
    tags: ["RaspberryPI", "Spotify", "SwitchBot", "automation", "smart-home"],
    category: "Fun",
    source_code: "https://github.com/drkostas/SpotiClick",
  },
  {
    slug: "cross-the-floor",
    name: "Cross The Floor",
    image: "/projects/cards/cross-the-floor.png",
    description:
      "Uses Sankey Diagrams to visualize politicians that have 'crossed the floor' from election to election.",
    tags: ["Sankey-Diagram", "Parliament", "Scraper", "Visualization"],
    category: "Fun",
    source_code: "https://github.com/drkostas/Cross-The-Floor",
  },

  // ---- Older / archive ----
  // These are still listed for completeness but show last because they're either
  // educational reimplementations or single-purpose toys from earlier in the
  // user's career.
  {
    slug: "hybrid-girvan-newman",
    name: "Hybrid Girvan Newman",
    image: "/projects/cards/hybrid-girvan-newman.png",
    description:
      "Code for the paper 'A Distributed Hybrid Community Detection Methodology for Social Networks'.",
    tags: ["Apache-Spark", "Social-Networks", "Community-Detection", "GraphFrames", "MySQL"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/HGN",
    scholar:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&authuser=1&citation_for_view=b___QQ8AAAAJ:u5HHmVD_uO8C",
  },
  {
    slug: "vanilla-numpy-cnn",
    name: "Vanilla Numpy CNN",
    image: "/projects/cards/vanilla-numpy-cnn.png",
    description: "A Vanilla Numpy-only Convolutional Neural Network.",
    tags: ["Numpy", "CNN", "Vanilla-Implementation"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/Numpy-CNN",
  },
  {
    slug: "vanilla-numpy-nn",
    name: "Vanilla Numpy Neural Network",
    image: "/projects/cards/vanilla-numpy-nn.png",
    description: "A Vanilla Numpy-only Feed-Forward Neural Network.",
    tags: ["Numpy", "Neural-Network", "Vanilla-Implementation"],
    category: "Machine Learning",
    source_code: "https://github.com/drkostas/Numpy-NeuralNet-1",
  },
  {
    slug: "2d-shooter-game",
    name: "2D Shooter Game",
    image: "/projects/cards/2d-shooter-game.png",
    description: "Simple 2d shooter game written with JavaScript and the p5.js library.",
    tags: ["P5.js", "game", "shooter-game"],
    category: "Fun",
    source_code: "https://github.com/drkostas/shooter-game-with-p5js",
    demo: "http://shooter-game.gkos.dev",
  },
  {
    slug: "quantum-mechanics-quiz",
    name: "Quantum Mechanics Quiz App",
    image: "/projects/cards/quantum-mechanics-quiz.png",
    description: "Android app with 10 questions about Quantum Mechanics.",
    tags: ["Android-App", "Java", "Quantum-Mechanics", "Quiz"],
    category: "Fun",
    source_code: "https://github.com/drkostas/Quantum-Mechanics-Quiz-App",
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Machine Learning",
  "Products",
  "Tools",
  "Fun",
];
