// Build every deck into dist/<naam>/ plus an index page: pnpm run build [naam]
// BASE_PATH is the site's path on the web server (CI sets it from GitHub Pages).
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { deckEntry, exitWithDeckList, listDecks, readDeckMeta, root, slidev } from './lib.mjs'

const only = process.argv[2]
if (only && !existsSync(deckEntry(only)))
  exitWithDeckList(`Presentatie "${only}" bestaat niet.`)

const base = `/${(process.env.BASE_PATH ?? '/presentations/').replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/')
const dist = join(root, 'dist')
const decks = only ? [only] : listDecks()

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

for (const slug of decks) {
  console.log(`\n▶ ${slug} → ${base}${slug}/`)
  slidev(['build', deckEntry(slug), '--base', `${base}${slug}/`, '--out', join(dist, slug), '--router-mode', 'hash'])
}

writeFileSync(join(dist, 'index.html'), indexPage(decks.map(readDeckMeta)))
console.log(`\n✓ ${decks.length} presentatie(s) gebouwd in dist/`)

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' })[c])
}

function indexPage(metas) {
  const cards = metas.map(m => `
      <a class="card" href="./${encodeURIComponent(m.slug)}/">
        <span class="title">${escapeHtml(m.title)}</span>
        ${m.info ? `<span class="info">${escapeHtml(m.info)}</span>` : ''}
      </a>`).join('')

  return `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Presentaties</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎤</text></svg>">
  <style>
    :root { --bg: #fff8ec; --ink: #1f2a44; --muted: #5b6478; --coral: #ff6b4a; --sun: #ffc93c; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--ink); font: 18px/1.5 system-ui, sans-serif; }
    main { max-width: 760px; margin: 0 auto; padding: 48px 16px; }
    h1 { font-size: 2.4rem; margin: 0 0 24px; }
    .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
    .card { display: flex; flex-direction: column; gap: 6px; padding: 20px 22px; background: white; border: 4px solid var(--sun);
            border-radius: 20px; color: inherit; text-decoration: none; box-shadow: 0 6px 0 #0001; }
    .card:hover, .card:focus-visible { border-color: var(--coral); }
    .title { font-size: 1.4rem; font-weight: 800; }
    .info { color: var(--muted); font-size: 0.95rem; }
  </style>
</head>
<body>
  <main>
    <h1>🎤 Presentaties</h1>
    <div class="grid">${cards}
    </div>
  </main>
</body>
</html>
`
}
