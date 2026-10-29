// Shared helpers for the deck scripts.
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = join(dirname(fileURLToPath(import.meta.url)), '..')
export const decksDir = join(root, 'decks')
export const templateSlug = '_sjabloon'

const slidevBin = join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')

// Decks are folders in decks/ with a slides.md; folders starting with "_" are skipped.
export function listDecks() {
  return readdirSync(decksDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('_') && existsSync(join(decksDir, d.name, 'slides.md')))
    .map(d => d.name)
    .sort()
}

export function deckEntry(slug) {
  return join(decksDir, slug, 'slides.md')
}

// Read "title" and "info" from the first frontmatter block of a deck.
export function readDeckMeta(slug) {
  const text = readFileSync(deckEntry(slug), 'utf8')
  const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const field = name => front.match(new RegExp(`^${name}:\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '')
  return { slug, title: field('title') ?? slug, info: field('info') ?? '' }
}

// Run the Slidev CLI with Node directly (no shell, no npx).
export function slidev(args) {
  if (!existsSync(slidevBin)) {
    console.error('Slidev is niet geïnstalleerd. Voer eerst uit: pnpm install')
    process.exit(1)
  }
  const result = spawnSync(process.execPath, [slidevBin, ...args], { cwd: root, stdio: 'inherit' })
  if (result.status !== 0)
    process.exit(result.status ?? 1)
}

export function exitWithDeckList(message) {
  console.error(message)
  const decks = listDecks()
  console.error(decks.length ? `\nPresentaties: ${decks.join(', ')}` : '\nNog geen presentaties. Maak er een met: pnpm run new <naam>')
  process.exit(1)
}
