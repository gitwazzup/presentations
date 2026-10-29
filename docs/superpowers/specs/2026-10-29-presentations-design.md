# Design: AI-friendly presentation template

Date: 2026-10-29

## Intent

A template repo for making presentations with AI, with no PowerPoint. Slides are plain Markdown that an AI agent (Claude Code) reads and writes. The first real use is a child in groep 5–6 (ages 8–10) giving a class presentation ("spreekbeurt"), built together with a parent. At school it is opened in a browser from a link.

## Decisions (owner)

- **Engine:** Slidev (Markdown + Vue): click-by-click reveals, transitions, presenter mode with notes.
- **Hosting:** public GitHub repo `gitwazzup/presentations`, published with GitHub Pages at `https://gitwazzup.github.io/presentations/<deck>/`.
- **Structure:** many decks in one repo (`decks/<slug>/`), plus a generated index page.
- **Language:** slides and AI guidance in Dutch; code comments in English.
- **AI tool:** Claude Code (`CLAUDE.md` + project skill `nieuwe-presentatie`).
- **Example:** a neutral Dutch example deck (`voorbeeld-vulkanen`). The child's real deck is made fresh.
- **Package manager:** pnpm only; npm and npx must never be used in this repo (security).
- **Dependencies:** only versions at least 7 days old.
- **Trust policy:** `trustPolicy: no-downgrade`, checking only releases from the last 30 days (`trustPolicyIgnoreAfter`). This avoids false positives on old maintenance releases.

## Decisions (builder's calls)

- README in Dutch.
- `routerMode: hash` (and `--router-mode hash` at build) so deep links work on Pages without 404 tricks.
- One shared local theme (`theme/`) with kid-friendly styling, layouts (`cover`, `hoofdstuk`, `plaatje`, `bronnen`, `einde`) and components (`Weetje`, `Quiz`, `Bron`).
- No PDF/PPTX export (Playwright is heavy, and PowerPoint is an explicit non-goal).
- The AI coaches rather than writes: the child's words come first, there are no invented facts, and sources go on a Bronnen slide.
- Viewer privacy:
  - The font is self-hosted (`@fontsource-variable/nunito`, `fonts.provider: none`).
  - The favicon is an inline emoji, not the default jsdelivr URL.
  - Images are downloaded into the deck, never hotlinked.
  - There are no embeds.
  - The index page is `noindex`.
- Dropped `@slidev/theme-default`: the local theme doesn't use it, and fewer dependencies is better.

## Supply-chain hardening

- **`pnpm-workspace.yaml`:**
  - `minimumReleaseAge: 10080`
  - `trustPolicy: no-downgrade` + `trustPolicyIgnoreAfter: 43200`
  - `blockExoticSubdeps`
  - `strictDepBuilds` with an empty `onlyBuiltDependencies`
  - `savePrefix: ''`
  - `engineStrict`
  - `managePackageManagerVersions`
- **Overrides** for audited advisories (dompurify, @hono/node-server, image-size), plus a compatibility pin (`@comark/markdown-it>markdown-it`). Each has a comment.
- **npm blocked** two ways: `devEngines.packageManager` (npm ≥ 10.9 refuses) and a `preinstall` user-agent check.
- **CI:**
  - Actions pinned to SHAs
  - `permissions: {}` at top level, with minimal permissions per job
  - `persist-credentials: false`
  - `--frozen-lockfile`
  - no dependency cache
  - `pnpm audit` as a separate, non-blocking job
- **Dependabot:** monthly and grouped, with a 7-day `cooldown`.

## Non-goals

PowerPoint/PDF export, an offline single-file build, private hosting, AI image generation, multi-language support.

## Open items

- A `.claude/settings.json` that denies `npm`/`npx`/`pnpm dlx` for the agent. Adding it needs the owner's approval, because it changes the agent's own permissions.
