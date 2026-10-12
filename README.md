# gkos.dev

![Home page of gkos.dev](./public/readme-hero.png)

The source for [gkos.dev](https://gkos.dev), my personal portfolio + blog. Built with Astro, deployed on Vercel.

If you're here from the live site and curious how it's put together, the [about page](https://gkos.dev/about) tells the human story; the rest of this README is the technical one.

## Stack

- **Framework:** [Astro](https://astro.build) (SSR mode, output: server)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Islands:** React + framer-motion for the interactive bits (the curve on /about, the reaction picker on blog posts, the orbit widgets on /home and /inspirations)
- **Content:** Astro Content Collections — Markdown / MDX for blog posts and changelog entries
- **Code highlighting:** Shiki (built into Astro)
- **Math:** KaTeX via remark-math + rehype-katex
- **Data:**
  - [Supabase](https://supabase.com) for the community wall and blog post reactions
  - [Umami Cloud](https://umami.is) + [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) for visitor stats
  - GitHub, PyPI, HuggingFace, Strava, Spotify APIs for live counts
- **Deployment:** [Vercel](https://vercel.com)

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:4321.

For the live-data widgets to work, copy `.env.example` to `.env.local` and fill in your own keys. Most of the site is functional without them; only the stats, reactions, wall and contact form need real credentials. The wall, reactions, comments and CV counters read a Supabase project — the free tier covers all of it, and `.env.example` says which three values to take from Project Settings → API.

## Structure

```
src/
├─ pages/           # one .astro file per route (home, /about, /blog/[slug], etc.)
│  └─ api/          # serverless API routes (Supabase, Umami, GitHub, Strava, reactions, ...)
├─ components/      # React + Astro components
│  ├─ about/        # shared partials used by /about
│  ├─ admin/        # local-only admin tools (gated to dev)
│  └─ editor/       # local-only explore-mode level editor
├─ content/         # MDX content (blog/, changelog/)
├─ data/            # typed data: projects, publications, coauthors, workbench, siteMetadata
├─ layouts/         # page shells
├─ lib/             # API clients (github.ts, umami.ts, supabase.ts, strava, spotify, ...)
└─ styles/          # global CSS, font + theme tokens
docs/
└─ *.sql            # database migrations (community wall, reactions)
```

## Key conventions

- **Voice**: site copy is hedged, modest, first-person. The full guide is internal but the bones: no boasty institution / venue / follower-count mentions in user-facing copy; sentence case in headings; no em-dashes as separators.
- **Content order**: when adding a new blog post, project, paper, or co-author, add it at the **top** of its data file so it appears first.
- **Dev-only routes**: `/admin`, `/admin/images`, `/explore-editor` are gated with `if (import.meta.env.PROD) return new Response(null, { status: 404 })`. They render in dev; 404 in production.

## License

No license. This is my personal portfolio, not a template. You're welcome to read the code and learn from it, but please don't deploy a fork as your own portfolio.

If something here is useful and you want to reuse it, send me a message at [gkos.dev/contact](https://gkos.dev/contact) and we'll figure something out.
