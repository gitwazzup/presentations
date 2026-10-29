// Preview one deck with live reload: pnpm run dev <naam>
import { existsSync } from 'node:fs'
import { deckEntry, exitWithDeckList, slidev } from './lib.mjs'

const [slug, ...rest] = process.argv.slice(2)
if (!slug)
  exitWithDeckList('Welke presentatie? Gebruik: pnpm run dev <naam>')
if (!existsSync(deckEntry(slug)))
  exitWithDeckList(`Presentatie "${slug}" bestaat niet.`)

slidev([deckEntry(slug), '--open', ...rest])
