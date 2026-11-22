# The Last Chime of Ravenshollow

**An In-Person Murder Mystery & Social Deduction Game for 8–20 Players**

> *November 19th. A violent coastal nor'easter has washed out the only bridge to Ravenshollow Manor. At 9:00 PM sharp, as billionaire horologist Lord Arthur Vance's Grand Astronomical Clock chimes nine, the lights go out—and a crash echoes from his locked second-floor study. Seconds later, Arthur Vance is found dead behind a bolted oak door.*

---

## Play & Print Online (GitHub Pages)

- **Generate a Single Complete PDF (Evidence Packet first with spoiler-free Manor Map on Page 1, followed by Character Sheets & Host Guide, synced to one Case Code):**
  [https://camyoung1234.github.io/murder-mystery/print/complete-packet.html](https://camyoung1234.github.io/murder-mystery/print/complete-packet.html)
- **Launch the Spoiler-Free Digital Companion App:**
  [https://camyoung1234.github.io/murder-mystery/companion/index.html](https://camyoung1234.github.io/murder-mystery/companion/index.html)

---

## Overview

*The Last Chime of Ravenshollow* blends a **fair-play, Agatha Christie-style "impossible crime" mystery** with **social deduction, hidden teams, public Town Hall detention votes, and an elected Act I Group Leader**—designed from the ground up to be played **100% hostless**.

- **Players:** 8–20 (with **260 pre-generated balanced variations**: 20 variations per player count across 8–20 players)
- **Balanced Probabilities:** At every player count (`8–20`), each of the 20 characters appears in exactly `N` variations, is the **Killer** in exactly 1 variation, and is an **Accomplice** an equal number of times (`3` for 18–20 players, `2` for 14–17 players, `1` for 8–13 players)—giving every character equal probability of being the Killer or an Accomplice.
- **Playtime:** **30–45 minutes** (fast-paced 3-Act sprint + Final Verdict)
- **Format:** In-person party game with **print-ready 1-page character sheets**, printable evidence exhibits, mandatory dialogue exchanges, and an optional offline **Digital Companion Web App** (`companion/index.html`).
- **Difficulty:** **Very High** — 100% logically deducible before the end of Act III, but requires synthesizing 4 distributed clues, breaking an "airtight" alibi, and seeing past multiple real crimes and a decoy accomplice.
- **No Early Elimination & All-Public Voting:** All Town Hall votes are **public** (no private subgroup votes or eyes-closed Blackout phases). At the end of Act I, players publicly vote to **Detain** 1 suspect AND elect **1 Group Leader** (who breaks all detention ties and picks 1 additional player to Detain). Detained players read their Detention Card aloud and lose their next vote, but remain in the game, keep mingling, and vote in the Final Verdict.

---

## Repository Contents

| File | Purpose |
| :--- | :--- |
| [`scripts/generate-variations.js`](scripts/generate-variations.js) | **Balanced Variation Generator:** Generates and validates all **260 variations** (`20 × (20 - 8 + 1)`) top-down from 20 players to 8 players, removing 1 innocent per game per round and updating scripts/evidence for full self-consistency. Run with `node scripts/generate-variations.js`. |
| [`variations/`](variations/index.json) | **260 Committed Game Variations:** Self-consistent JSON files for every player count (`8-players/` through `20-players/`) plus [`variations/index.json`](variations/index.json) with probability balance statistics. |
| [`assets/variations-data.js`](assets/variations-data.js) | **Browser Variation Bundle:** Auto-generated blueprint lookup used by `assets/mystery-engine.js` across the Companion App and all printable HTML sheets. |
| [`print/complete-packet.html`](print/complete-packet.html) | **All-in-One Single PDF Generator:** Places the Evidence Packet first (so Page 1 is the spoiler-free Manor Map), followed by Character Sheets and optional Host Guide locked to **one Case Code** so nothing can mismatch! |
| [`print/character-packets.html`](print/character-packets.html) | **Print-Ready Character Sheets:** Open in any browser, pick your player count (`8–20`), and hit Print! Exactly 1 ink-friendly page per active character with checkboxes for Act I–III dialogues and a cut-and-fold **Sealed Detention Card**. |
| [`print/evidence-cards-stylized.html`](print/evidence-cards-stylized.html) | **Stylized Vintage Evidence Packet (Color):** Aged parchment styling, wax seals, and the illustrated **Ravenshollow Manor Map** (`assets/ravenshollow-manor-map.jpg`). |
| [`print/evidence-cards.html`](print/evidence-cards.html) | **Ink-Friendly B&W Evidence Packet:** Clean black-and-white printable Exhibits A–F, Manor Map, and False Lead slips. |
| [`print/host-guide.html`](print/host-guide.html) | **Dynamic Printable Case Solution & Rules:** Synced to your active Case Code (`RV-XXXX`) & player count (`8–20`)—generates the matching True Timeline, 4-Pillar Proof, Public Voting & Group Leader rules, Opening Scripts, and Grand Reveal. *(Blurred on screen by default to prevent spoilers!)* |
| [`companion/index.html`](companion/index.html) | **Spoiler-Free Digital Companion:** Lets **everyone** (including you!) play blind! Features Voice Auto-Host narration, illustrated Manor Map, 30–45 min sprint timer, Evidence Board, Group Leader tracker, and public Town Hall voting tracker. |
| [`host-guide.md`](host-guide.md) | Static Classic Case (`#4` Dr. Julian Mercer) Reference Guide. **(For randomized Case Codes, use `print/host-guide.html` or `companion/index.html`!)** |
| [`evidence-packets.md`](evidence-packets.md) | Markdown source of Exhibits A–F and False Lead slips. |
| [`characters/core-cast-1-to-8.md`](characters/core-cast-1-to-8.md) | Markdown source for Characters 1–8. |
| [`characters/expansion-cast-9-to-20.md`](characters/expansion-cast-9-to-20.md) | Markdown source for Characters 9–20. |

---

## Quick Start (100% Hostless — Everyone Plays!)

You do **not** need a dedicated human host! To play completely blind alongside your friends:
1. **Do NOT open `host-guide.md` or `characters/*.md`.**
2. **Print Character Sheets Blind:** Open [`print/character-packets.html`](print/character-packets.html), set the slider to your guest count (`8–20`), and click **Print**. Fold each sheet in half (or stuff into numbered envelopes) without reading them, and let everyone draw randomly!
3. **Print Evidence (Optional):** Print [`print/evidence-cards-stylized.html`](print/evidence-cards-stylized.html) (color parchment + illustrated map) or [`print/evidence-cards.html`](print/evidence-cards.html) (ink-friendly B&W)—or just display them on a TV using the Digital Companion!
4. **Launch [`companion/index.html`](companion/index.html):** Leave **Spoiler-Free Mode: ON** and **Voice Auto-Host: ON**. Anyone can click to advance Acts, unlock Exhibits, track the Elected Group Leader, and tally public Town Hall votes!
