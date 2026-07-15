# Hell Farmers — Polish Pass · Final Delivery

Thanks for the project! This folder is the complete handoff. Below is what's in it,
how to run it, and exactly what changed.

## What's in this folder

| File | What it is |
|------|-----------|
| **`hell-farmers.html`** | **The game — this is the file you ship.** Single self-contained HTML file; all art is embedded, nothing else to host. |
| `hell-farmers-TESTBUILD.html` | An optional **inspection build** for reviewing every boss quickly. Do **not** ship this one — see below. |
| `phase-showcase.html` | A visual showcase of the Cerberus multi-phase art (open in a browser). |
| `screenshots/` | Reference PNGs of the phase swaps + the new enemy critters. |
| `CHANGELOG.md` | The detailed, boss-by-boss breakdown of everything that changed. |

## How to run

Open **`hell-farmers.html`** in any modern browser — that's it. No server, no build step.
Press `1` to pick a hero and play. Handy keys: **F** fullscreen · **G** god mode · **J** skip room · **R** restart.

## What was done

The whole roster and every shared visual system got the polish pass you asked for:

- **All 21 bosses now show their real multi-phase art.** Previously the art was only
  wired for a boss's first phase — the moment it changed phase it fell back to grey
  placeholder blocks. Every phase of every boss now uses your `Sources/` sprites, and
  the sprite swaps live as the fight progresses.
- **The "circles" are gone.** Every projectile is now an oriented comet (glow, tail,
  hot core) so it reads as something *fired at you*; enemies that were flat circles and
  boxes are now shaded pixel creatures with idle motion.
- **Bosses feel alive.** A shared motion system gives every boss a breathing bob, an
  attack wind-up telegraph, and a recoil kick when hit — all feet-anchored.
- **Swings & impacts have juice.** The melee swing now sweeps with a trailing smear;
  shots spark on wall hits.
- **Multi-body bosses fixed.** The placeholder boxes for Cerberus' head telegraphs, the
  Furies' sisters, Belial's decoys, the Succubus/Incubus partner, and Rakshasa's masks
  now all render with the proper sprites.

Full detail — boss by boss, phase by phase — is in **`CHANGELOG.md`**.

## Ground rules honored

- **All original artwork — no AI-generated art.** Your provided `Sources/` PNGs are the
  sprites; every effect (projectiles, motion, swings, impacts, the small enemy critters)
  is hand-written procedural canvas code in the game's own drawing style. No AI art, no
  hidden watermarks.
- **Gameplay and balance untouched.** This was a visuals/feel pass only, as agreed —
  no numbers, hit-points, or mechanics were changed.

## About the test build (optional)

`hell-farmers-TESTBUILD.html` is a throwaway tool for reviewing the roster fast — it is
**not** for shipping. It adds a banner and these helpers:

- You **can't die** (invulnerability on by default; **G** toggles it).
- **`]`** next boss · **`[`** previous boss — warp straight through all 21 bosses
  (Cerberus → Hades) without grinding.
- **`\`** mega-damage — melt a boss to watch its phase changes and death.
- **R** restart.

Use it to eyeball every boss and phase, then ship `hell-farmers.html`.

---

Any boss art or phase that looks off when you play through — just point me at it and I'll adjust.
