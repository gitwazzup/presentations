// Create a new deck from decks/_sjabloon: pnpm run new <naam> "Titel"
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { decksDir, deckEntry, templateSlug } from './lib.mjs'

const [slug, ...titleWords] = process.argv.slice(2)

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('Gebruik: pnpm run new <naam> "Titel"')
  console.error('De naam mag alleen kleine letters, cijfers en streepjes hebben, bijvoorbeeld: dinosaurussen')
  process.exit(1)
}
if (existsSync(join(decksDir, slug))) {
  console.error(`Presentatie "${slug}" bestaat al: decks/${slug}/slides.md`)
  process.exit(1)
}

const title = titleWords.join(' ').trim() || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')

cpSync(join(decksDir, templateSlug), join(decksDir, slug), { recursive: true })
const entry = deckEntry(slug)
writeFileSync(entry, readFileSync(entry, 'utf8').replaceAll('{{TITEL}}', title))

console.log(`Klaar! Nieuwe presentatie: decks/${slug}/slides.md`)
console.log(`Bekijken: pnpm run dev ${slug}`)
