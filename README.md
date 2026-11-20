# The Last Chime of Ravenshollow

**An In-Person Murder Mystery & Social Deduction Game for 8–20 Players**

> *November 19th. A violent coastal nor'easter has washed out the only bridge to Ravenshollow Manor. At 9:00 PM sharp, as billionaire horologist Lord Arthur Vance's Grand Astronomical Clock chimes nine, the lights go out—and a crash echoes from his locked second-floor study. Seconds later, Arthur Vance is found dead behind a bolted oak door.*

---

## Overview

*The Last Chime of Ravenshollow* blends a **fair-play, Agatha Christie-style "impossible crime" mystery** with **Werewolf-style social deduction, hidden teams, Town Hall detention votes, and eyes-closed Blackout phases**.

- **Players:** 8–20 (strictly scalable—use Characters `#1` through `#N` for your exact headcount)
- **Playtime:** **30–45 minutes** (fast-paced 3-Act sprint + Final Verdict)
- **Format:** In-person party game with **print-ready 1-page character sheets**, printable evidence exhibits, mandatory dialogue exchanges, and an optional offline **Digital Companion Web App** (`companion/index.html`).
- **Difficulty:** **Very High** — 100% logically deducible before the end of Act III, but requires synthesizing 4 distributed clues, breaking an "airtight" alibi, and seeing past multiple real crimes and a decoy accomplice.
- **No Early Elimination:** Players voted out in Town Hall are **Detained** (their hidden Detention Card is searched and read aloud, and they lose their next vote), but they remain in the game, keep mingling, and still participate in all dialogues and the Final Verdict.

---

## Repository Contents

| File | Purpose |
| :--- | :--- |
| [`print/character-packets.html`](print/character-packets.html) | **Print-Ready Character Sheets (`#1`–`#20`):** Open in any browser, pick your player count (`8–20`), and hit Print! Exactly 1 ink-friendly page per character with checkboxes for Act I–III dialogues and a cut-and-fold **Sealed Detention Card**. |
| [`print/evidence-cards-stylized.html`](print/evidence-cards-stylized.html) | **Stylized Vintage Evidence Packet (Color):** Aged parchment styling, wax seals, and the illustrated **Ravenshollow Manor Map** (`assets/ravenshollow-manor-map.jpg`). |
| [`print/evidence-cards.html`](print/evidence-cards.html) | **Ink-Friendly B&W Evidence Packet:** Clean black-and-white printable Exhibits A–F, Manor Map, and False Lead slips. |
| [`print/host-guide.html`](print/host-guide.html) | **Dynamic Printable Host Guide:** Synced to your active Case Code (`RV-XXXX`) & player count (`8–20`)—generates the matching True Timeline, 4-Pillar Proof, Blackout narration, Opening Scripts, and Grand Reveal. *(Blurred on screen by default to prevent spoilers!)* |
| [`companion/index.html`](companion/index.html) | **Spoiler-Free Auto-Host Digital Companion:** Lets **everyone** (including you!) play blind! Features Voice Auto-Host narration, an automated eyes-closed Blackout wizard, illustrated Manor Map, 30–45 min sprint timer, Evidence Board, and Town Hall voting tracker. |
| [`host-guide.md`](host-guide.md) | Static Classic Case (`#4` Dr. Julian Mercer) Host Manual reference. **(For randomized Case Codes, use `print/host-guide.html` or `companion/index.html`!)** |
| [`evidence-packets.md`](evidence-packets.md) | Markdown source of Exhibits A–F and False Lead slips. |
| [`characters/core-cast-1-to-8.md`](characters/core-cast-1-to-8.md) | Markdown source for the **Core Cast (Players 1–8)** — required for every game. |
| [`characters/expansion-cast-9-to-20.md`](characters/expansion-cast-9-to-20.md) | Markdown source for the **Expansion Cast (Players 9–20)** — add in numerical order. |

---

## Quick Start (Spoiler-Free — Everyone Plays!)

You do **not** need a dedicated human host! To play completely blind alongside your friends:
1. **Do NOT open `host-guide.md` or `characters/*.md`.**
2. **Print Character Sheets Blind:** Open [`print/character-packets.html`](print/character-packets.html), set the slider to your guest count (`8–20`), and click **Print**. Fold each sheet in half (or stuff into numbered envelopes `#1`–`#N`) without reading them, and let everyone draw randomly!
3. **Print Evidence (Optional):** Print [`print/evidence-cards-stylized.html`](print/evidence-cards-stylized.html) (color parchment + illustrated map) or [`print/evidence-cards.html`](print/evidence-cards.html) (ink-friendly B&W)—or just display them on a TV using the Digital Companion!
4. **Launch [`companion/index.html`](companion/index.html):** Leave **Spoiler-Free Mode: ON** and **Voice Auto-Host: ON**. Anyone can click to advance Acts, unlock Exhibits, tally Town Hall votes, and trigger **Start Auto-Blackout**—the app narrates the eyes-closed Blackout phases aloud and handles all secret actions privately on screen!
