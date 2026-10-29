---
name: nieuwe-presentatie
description: Use when a child (with a parent) wants to start a new spreekbeurt or class presentation in this repo. Walks through choosing a topic, interviewing the child per chapter, building Slidev slides in their own words, previewing, and practising. Triggers on "nieuwe spreekbeurt", "nieuwe presentatie", "ik wil een spreekbeurt maken", "new deck".
---

# Nieuwe spreekbeurt maken

Volg `CLAUDE.md`: je praat Nederlands met een kind uit groep 5–6. Coach, schrijf het niet voor ze. Stel één vraag tegelijk.

## 1. Onderwerp

- Vraag waar de spreekbeurt over gaat, en waarom het kind dat onderwerp koos. Bewaar dat antwoord voor de slide "Waarom dit onderwerp?".
- Kies samen een korte mapnaam: kleine letters en streepjes, bijvoorbeeld `dinosaurussen` of `mijn-hond`.
- Vraag de voornaam van het kind voor de titelslide. Geen achternaam: de site is openbaar.

## 2. Aanmaken

```sh
pnpm run new <naam> "<Titel>"
pnpm run dev <naam>
```

De preview opent in de browser en ververst vanzelf. Laat hem openstaan, zodat het kind elke wijziging meteen ziet.

## 3. Hoofdstukken kiezen

Vraag: "Over welke 3 of 4 dingen wil je vertellen?" Schrijf ze op als hoofdstukken. Kies samen een emoji per hoofdstuk.

## 4. Per hoofdstuk: praten → slides → kijken

Per hoofdstuk:

1. Vraag wat het kind erover weet. Laat het vertellen.
2. Twijfel je over een feit, of weet het kind iets niet? Zoek het samen op en noteer de bron.
3. Maak een `hoofdstuk`-slide en daarna 1–3 slides (hooguit 3 korte punten, één idee per slide).
4. Zet onder elke slide het spiekbriefje als `<!-- ... -->`, in de woorden van het kind.
5. Vraag: "Zo goed? Wil je iets anders?"

## 5. Plaatjes

- Heeft het kind eigen foto's of tekeningen? Zet ze in `decks/<naam>/public/`.
- Zoek anders samen een vrij plaatje (Wikimedia Commons: publiek domein, CC0, CC BY of CC BY-SA). Download het naar `public/` en zet maker en licentie in `<Bron>` en op de Bronnen-slide.
- Geen foto's van andere kinderen. Geen links naar plaatjes op andere sites.

## 6. Afmaken

Voeg toe:

- een `<Weetje>`: vraag het kind wat het verrassendste feit was
- een `<Quiz>`: vraag het kind welke vraag het aan de klas wil stellen
- de Bronnen-slide
- de Vragen-slide

Controleer met `pnpm run build <naam>`.

## 7. Oefenen

Leg uit hoe presenteren werkt:

- **Pijltjestoets** of **spatie**: naar de volgende klik of slide.
- **`p`**: presentatiemodus met spiekbriefje en klok. Zet de presentatie dan op het grote scherm in een tweede venster.
- **`f`**: volledig scherm.

Laat het kind één keer oefenen. Vraag daarna of er nog iets anders moet.

## 8. Online zetten (alleen als de ouder het zegt)

```sh
git add decks/<naam>
git commit -m "Spreekbeurt: <Titel>"
git push
```

Na een paar minuten staat de presentatie op `https://<gebruiker>.github.io/<repo>/<naam>/`. Controleer de GitHub Actions-run met `gh run watch` en geef de link.
