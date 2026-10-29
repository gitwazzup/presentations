# Presentaties 🎤

Spreekbeurten en presentaties maken **met AI**, zonder PowerPoint. Elke presentatie is een gewoon tekstbestand (Markdown) dat een AI zoals Claude Code goed kan lezen en schrijven. [Slidev](https://sli.dev) maakt er een mooie presentatie van, die in elke browser werkt.

Gemaakt voor kinderen van groep 5–6 die samen met een ouder een spreekbeurt maken, maar het werkt voor elke presentatie.

**Voorbeeld:** [`decks/voorbeeld-vulkanen/slides.md`](decks/voorbeeld-vulkanen/slides.md)

## Wat heb je nodig

- [Node.js](https://nodejs.org) 22 of nieuwer
- [pnpm](https://pnpm.io/installation) (**geen npm**; zie [Veiligheid](#veiligheid))
- [Claude Code](https://claude.com/claude-code)
- Git en een GitHub-account, als je de presentatie online wilt zetten

## Snel beginnen

```sh
pnpm install
pnpm run dev voorbeeld-vulkanen     # bekijk het voorbeeld op http://localhost:3030
```

### Een nieuwe spreekbeurt maken met AI

Open Claude Code in deze map en zeg bijvoorbeeld:

> Ik wil een nieuwe spreekbeurt maken over dinosaurussen.

Claude volgt de instructies in [`CLAUDE.md`](CLAUDE.md) en de skill `nieuwe-presentatie`:

- Claude stelt het kind vragen en maakt slides in de woorden van het kind.
- Claude houdt de slides kort: hooguit 3 punten per slide, met grote plaatjes.
- Claude zet een spiekbriefje (sprekersnotities) onder elke slide.
- Claude voegt een weetje, een quiz voor de klas en een bronnenlijst toe.

### Zelf doen, zonder AI

```sh
pnpm run new dinosaurussen "Dinosaurussen"   # maakt decks/dinosaurussen/
pnpm run dev dinosaurussen                   # preview die meteen ververst
```

Pas daarna `decks/dinosaurussen/slides.md` aan. Een slide wisselen doe je met `---`. Zie het voorbeeld en `CLAUDE.md` voor alle layouts en componenten.

## Presenteren in de klas

Open de link in de browser op het schoolbord of de laptop.

| Toets | Wat het doet |
|---|---|
| `→` of spatie | volgende klik of slide |
| `←` | terug |
| `f` | volledig scherm |
| `p` | presentatiemodus: spiekbriefje, klok en volgende slide (open de presentatie zelf in een tweede venster op het grote scherm) |
| `o` | overzicht van alle slides |
| `d` | tekenen op de slide |

## Online zetten (GitHub Pages)

Elke push naar `main` bouwt alle presentaties en zet ze online:

- Overzicht: `https://<gebruiker>.github.io/<repo>/`
- Eén presentatie: `https://<gebruiker>.github.io/<repo>/<naam>/`

**Let op: de site is openbaar.** Gebruik alleen voornamen, geen foto's van andere kinderen, en geen naam van de school. De pagina's vragen zoekmachines om ze niet te indexeren, maar iedereen met de link kan ze zien.

### Deze template gebruiken voor je eigen repo

1. Klik op GitHub op **Use this template** en maak een nieuwe repo.
2. Ga naar **Settings → Pages** en kies bij Source **GitHub Actions**.
3. Verwijder als je wilt het voorbeeld (`decks/voorbeeld-vulkanen`) en push.

De scripts lezen het pad voor de website zelf uit GitHub Pages, dus een andere repo-naam werkt ook.

## Veiligheid

Deze repo is ingericht om de kans op kwaadaardige packages (supply-chain-aanvallen) klein te houden:

- **Alleen pnpm.** npm negeert de pnpm-instellingen hieronder, en wordt daarom geweigerd: via `devEngines` in `package.json` en een `preinstall`-check. Claude Code krijgt in `CLAUDE.md` de opdracht nooit `npm`, `npx` of `pnpm dlx` te gebruiken.
- **Alleen packages die minstens 7 dagen oud zijn** (`minimumReleaseAge` in [`pnpm-workspace.yaml`](pnpm-workspace.yaml)). De meeste kwaadaardige versies worden binnen een paar dagen ontdekt en verwijderd.
- **Vertrouwenscheck** (`trustPolicy: no-downgrade`): een nieuwe versie zonder herkomstbewijs (provenance) wordt geweigerd als eerdere versies dat wel hadden. Dat is een teken van een overgenomen package. Versies ouder dan 30 dagen worden niet meer gecontroleerd, omdat oude onderhoudsversies anders onterecht worden afgekeurd.
- **Install-scripts van packages zijn geblokkeerd** (`strictDepBuilds`). Een package dat er toch een wil, laat de installatie mislukken totdat je het bewust toestaat.
- **Packages alleen van de registry**, nooit van git of losse URL's (`blockExoticSubdeps`).
- **Vaste versies**: exacte versies in `package.json`, en een lockfile die in CI `--frozen-lockfile` gebruikt.
- **Bekende kwetsbaarheden opgelost** met `overrides` in `pnpm-workspace.yaml`, elk met uitleg. `pnpm audit` draait bij elke push. Het blokkeert de deploy niet, maar laat een rood kruisje zien als er iets is.
- **GitHub Actions**: vastgepind op commit-SHA, met minimale rechten per job en zonder bewaarde git-credentials.
- **Dependabot** stelt maandelijks updates voor, ook pas na 7 dagen (`cooldown`).
- **Privacy van kijkers**: lettertypes worden met de site meegeleverd (geen Google Fonts), plaatjes staan in de repo zelf, en er zijn geen trackers of externe embeds.

Een nieuwe dependency nodig? Voeg hem toe met `pnpm add <package>`. Mislukt dat door een van de checks hierboven, zoek dan uit waarom voordat je een uitzondering toevoegt.

## Mappen

```
decks/<naam>/slides.md   een presentatie
decks/<naam>/public/     plaatjes voor die presentatie
decks/_sjabloon/         startversie voor nieuwe presentaties
theme/                   gedeelde stijl, layouts (cover, hoofdstuk, plaatje, bronnen, einde)
                         en componenten (Weetje, Quiz, Bron)
scripts/                 new / dev / build
CLAUDE.md                instructies voor de AI
```

## Licentie

Code: MIT. Plaatjes in `decks/voorbeeld-vulkanen/public/` hebben elk hun eigen licentie; die staat op de Bronnen-slide.
