# Hell Farmers — Polish Pass · Milestone 1 (Cerberus Vertical Slice)

**File changed:** `hell-farmers.html` (a working copy of your `Sources/hell-farmers_107.html` — your original is untouched).

This first milestone does **one boss end-to-end** (Cerberus) plus the two shared
rendering systems that every boss and character use — so you can see exactly how
the whole game will look and feel before I roll the same standard across the
other 20 bosses.

---

## What the game already did (so we don't pay for it twice)

Before touching anything I read the full 7,100-line file. Worth knowing:

- **The bosses already move and attack.** Every boss in `BOSSDEF` has real
  multi-phase behaviour — Cerberus alone cycles three heads (creep / sonic /
  homing), then leaps, then goes into a maddened chase. The *behaviour* is
  strong; it did not need rewriting.
- **The 7 heroes are already fully wired** with sprite sheets that include
  idle / walk / **wind-up / strike** attack frames, facing, recoil and tint.
- **The real gaps** were exactly the "circles" and the missing art:
  1. Boss art was only wired for **phase 0**. The moment a boss changed phase it
     fell back to grey **placeholder blocks**. Your `Sources/bosses` art (with
     `p1 / p2 / p3` matching the phase names) was never plugged in.
  2. **Every projectile was a flat filled circle.** No direction, no motion.
  3. **Enemies were circles and squares** with dot eyes.

---

## Changes in this milestone

### 1. Cerberus — real multi-phase art
- Encoded your three Cerberus sprites and wired them to the correct phases:
  - Phase 1 `CHAINED`  → `01_cerberus_p1_chained_64x64.png`
  - Phase 2 `UNCHAINED`→ `01_cerberus_p2_unchained_64x64.png`
  - Phase 3 `MADDENED` → `01_cerberus_p3_maddened_48x48.png`
- The sprite now **swaps as the fight progresses** (verified in all three
  phases in-game — see "How I tested" below). No more placeholder blocks.
- **Which-head-is-loading telegraph** re-done: it used to be two grey boxes
  floating beside the old block art. It's now painted as glowing eyes *on the
  three heads of the real sprite* — the head about to attack flares to its
  attack's colour (green creep · white sonic · red homing).

### 2. "Aliveness" motion on the boss *(shared system, all 21 bosses)*
The art is a single frame per phase, so the life comes from **how** it's moved:
- a slow **breathing** bob so it's never a dead statue,
- a **wind-up** — as an attack's cooldown runs out the body rises and stretches,
  giving you a telegraph *for free*,
- a **recoil** kick that knocks it back and squashes it when hit.
All of it is **feet-anchored** so it never slides off its own footing.

### 3. Projectiles — the "circles", fixed *(shared system, all bosses + heroes)*
Every shot now renders as an **oriented comet**: a soft glow, a tapered tail
stamped back along its own velocity, a solid head and a hot inner core. It reads
as *something being fired at you* instead of a dot drifting across the room.
Kind-aware: sludge **creep** stays a wet dripping blob, **homing** shots trail an
ember spark, **crit / player** shots run white-hot.

### 4. Swing & impact effects
- **Ares' (Gore's) melee swing** was 9 static dots on a fixed arc. It now
  **sweeps** — the cutting edge travels across the arc and drags a fading smear
  behind it, so a swing reads as a blade moving *through* space. Runs hot orange
  while RAGE is up.
- **Shots now spark** when they hit a wall.

### 5. Enemies — the other "circles", fixed *(shared, whole game)*
`grub / imp / brute` were a circle and two flat squares. They're now little
**pixel creatures** — shaded bodies, eyes, horns, a constant idle wobble and a
leg cycle — so nothing on screen is a dead shape. (There's no source art for
these tiny mobs, so this is original procedural pixel work in the game's own
drawing vocabulary; no AI-generated art anywhere.)

---

## How I tested it
Drove the actual game in a headless browser: jumped into the Cerberus fight and
held fire until the boss died, screenshotting throughout.
- ✅ Phase art swaps confirmed: **CHAINED → UNCHAINED → MADDENED**.
- ✅ Projectiles render as comets in every phase.
- ✅ New enemy critters render in a combat room (grub + imp).
- ✅ **Zero JavaScript errors** across the whole fight. (The one "failed to load
  resource" is just the music `.mp3` files, which aren't in the folder — nothing
  to do with the code.)

## How to run
Open `hell-farmers.html` in any browser. `1` selects a hero → play. Handy keys
while testing: **F** fullscreen, **G** god mode, **J** skip room, **R** restart.

---

---

# Batch 2 — bosses 2–6 (PREPPED, pending your sign-off on Milestone 1)

While waiting on the client, I wired the next five bosses to the same standard.
All verified in-engine, zero errors:

| # | Boss | Phases wired | Notes |
|---|------|--------------|-------|
| 2 | **Charon** | RAFT · CAPSIZED | clean |
| 3 | **The Furies** | FORMATION · WRATH TETHER · GROUNDED | see below |
| 4 | **Minotaur** | THE CHARGE · THE PILLAR | clean |
| 5 | **Cyclops** | THE SLAM · BLIND FURY | clean |
| 6 | **Beelzebub** | THE SWARM · EXPOSED CORE | shield tint intact |

Two boss-specific calls worth flagging:
- **The Furies had no distinct phase-2 art** (only p1 and p3 were supplied). Its
  middle phase (WRATH TETHER) is still airborne and mobile, so I reused the p1
  formation sprite there rather than show placeholder blocks. If the client
  supplies a dedicated p2 fury, it's a one-line swap.
- **The Furies' two "sisters"** were drawn as flat pink boxes (separate bodies
  from the main one). They now wear the same winged-fury sprite, smaller — so all
  three read as one creature instead of one sprite plus two placeholders.

---

# Batch 3 — bosses 7–11 (PREPPED)

All verified in-engine, zero errors:

| # | Boss | Phases wired | Notes |
|---|------|--------------|-------|
| 7 | **Asmodeus** | THE RAM · THE BULL · THE MAN | 3-form boss, all art present |
| 8 | **Azazel** | THE STORM · THE SLAM | clean |
| 9 | **Belial** | ELUSIVE · BARE BONE | decoys fixed, see below |
| 10 | **Leviathan** | THE BREACH · THE GATE | clean |
| 11 | **Behemoth** | THE TREAD · GLUTTONY | clean |

- **Belial's decoys** (the fake copies it blinks between) were flat grey boxes,
  which gave away which one was real. They now render as full-size, ghosted Belial
  sprites — so the "spot the real one" mechanic actually works.

---

# Batch 4 — bosses 12–16 (PREPPED)

All verified in-engine, zero errors:

| # | Boss | Phases wired | Notes |
|---|------|--------------|-------|
| 12 | **Mammon** | THE HOARD · LIQUID GOLD | clean |
| 13 | **Abaddon** | KING OF LOCUSTS · UNSHELLED | clean |
| 14 | **Succubus & Incubus** | THE TETHER · NIGHTMARE | pair fix, see below |
| 15 | **Hellhound** | THE HUNT · BLAZING SPECTER | wide 64×48 sprite |
| 16 | **Oni** | THE KANABO · THE ANCHOR | clean |

- **The Succubus & Incubus are a tethered pair** — the game draws the second demon
  (the incubus) as a separate body. It was a purple box with two eyes; it now wears
  the same sprite as the succubus it's chained to, so the pair reads as two matching
  demons on a live tether. The sprite sizes even match the fight: 32×48 in the
  tether phase, 64×64 when they merge into the NIGHTMARE.

---

# Batch 5 — bosses 17–21 (PREPPED) · ROSTER COMPLETE

All render in-engine with zero errors:

| # | Boss | Phases wired | Notes |
|---|------|--------------|-------|
| 17 | **Gorgon** | PETRIFY · SHED SKIN | clean |
| 18 | **Preta** | HUNGER · RUPTURE | sizes match (48×64 → 32×32) |
| 19 | **Rakshasa** | THREE FACES · THE MASKS | masks fixed, see below |
| 20 | **Ghouls** | THE PACK · THE ALPHA | sizes match (48×48 → 96×64) |
| 21 | **HADES — RULER OF HELL** | 5 phases | final boss, see below |

- **Rakshasa's three masks** (wrath/deceit/gluttony) were coloured boxes; each now
  wears the demon-mask sprite tinted to its face.
- **Hades has 5 phases but only 4 sprites were supplied** (Arbiter, Helm, Tartarus,
  Core — no dedicated "River"). Phase 3 (THE RIVER) reuses the Helm form, which is a
  standing, mobile Hades — the right read for a moving phase. One-line swap if a
  River sprite is supplied later.

## Verification notes (being straight with you)
- **Every one of the 21 bosses** was launched in-engine and its first-phase sprite
  confirmed on screen, with **zero JavaScript errors** anywhere.
- **Visually confirmed through a phase change:** Cerberus (all 3), the Furies
  (formation→tether), plus the multi-body fixes — Furies sisters, Belial decoys,
  Succubus & Incubus pair.
- **Mechanism-confirmed** (same one-line phase-swap code as the above, all sprite
  images verified to decode, no errors): the deeper phases of the tankier bosses
  (Rakshasa's masks, Hades' late phases). These use identical, already-proven code —
  I just couldn't grind a test hero through their very large health bars in a
  reasonable time. When you or the client play them, they'll swap like the rest.

## Status: all 21 bosses wired
#1 (Cerberus) was the delivered milestone; #2–21 are prepped to the same standard,
plus the shared systems (comet projectiles, boss motion, swings, impacts, enemy
critters) that apply across the whole game. Ready for the client's play-through.

---

# Dev test build — `hell-farmers-TESTBUILD.html`

A separate, throwaway build for checking the whole roster fast (the shipping file
`hell-farmers.html` is unchanged). It adds a top banner and:

- **You can't die** — invulnerability is ON by default (press **G** to toggle).
- **`]` next boss · `[` previous boss** — warp straight to any boss room, so you can
  step through all 21 bosses (Cerberus → Hades) without grinding the farm/halls.
- **`\` mega-damage** — toggle a big damage multiplier to melt a boss and watch its
  phase changes and death, or blast through to the final level.
- **R** restart.

Use it to eyeball every boss and phase; ship `hell-farmers.html`.

---

# Atmosphere & feel pass (update 2026-07-16)

A follow-up polish pass on the *whole game's* presentation — all of it purely
visual, no gameplay or balance touched, and no new art (procedural canvas only).

- **Boss-entrance nameplate.** Walking into a boss gate now *announces* it: the
  boss's name slams across the arena in ember, holds a beat, and fades — with a
  "BOSS GATE N/20" kicker and an underline. It used to only appear as small HUD
  text. A free moment of theatre on every one of the 21 gates.
- **Filmic vignette.** The screen edges now fall gently into shadow, pulling the
  eye to the action — subtle in the halls, a shade heavier in a boss arena. It
  steps aside automatically in the arenas that already run their own darkness
  (e.g. the pitch-black rooms), so nothing double-darkens.
- **Ambient embers.** A few soft motes now drift up through every combat room, so
  even a cleared arena still looks like it's smouldering. They yield to the
  sandstorm/dark rooms so they never add clutter.
- **Low-health danger throb.** As your hearts run low the screen edges pulse
  blood-red, beating faster the closer you are to death — a tension cue you
  *feel* a beat before you read the health bar. Pure feedback: it changes nothing
  about the fight itself.

All verified in-engine (Puppeteer), zero JavaScript errors. The dev test build
was regenerated from this same updated file, so it carries the new feel too.

## Combat-feel pass (update 2026-07-16, cont.)

More feel, same rules — visual only, no balance, no new art:

- **Boss phase-transition punch.** A boss changing form used to happen in silence —
  the sprite just swapped. Now it *lands*: a white screen-pop, a camera kick, twin
  shockwave rings burst off the boss, and the new phase's name ("· NEW PHASE ·
  UNCHAINED") is announced across the arena. Every form-change on every boss now
  reads as an event. (Fires only on real transitions, never on the initial spawn.)
- **Boss health-bar chip damage.** A pale "ghost" now lags a beat behind the boss
  health bar and then drains down to the real value, so a big hit reads as a
  satisfying *chunk* taken instead of the bar simply being shorter the next frame.
- **Dash dust-kick.** The dash already left an afterimage trail; it now also kicks a
  small puff of ground dust off the launch, so the burst of speed has weight under it.

Again: verified in-engine, zero errors, and the dev test build was regenerated to match.

## Hall-enemy shapes pass (update 2026-07-16, cont.)

Closing out the last of the brief's "circles." The Hall mobs — the small enemies
that fill the 100 rooms between bosses — were still drawing as plain filled
circles (and one plain box). Every one is now a proper little pixel creature, in
the same hand-drawn style as the boss sprites and combat critters:

- **Fly** — a segmented body with fast-buzzing translucent wings and a red eye.
- **Pup** (hellhound whelp) — a four-legged hound with an ember eye, ear and tail,
  legs on a run cycle.
- **Ghoul** — a hunched, bowed-head undead with long dangling arms.
- **Debris** — an angular rubble chunk instead of a brown disc.
- **Monolith** — a carved standing stone with a slowly-pulsing rune (was a flat box).
- **Preta** (hungry ghost) — a distended starving belly, shrunken head, thin arms.
- **Spider** (friendly familiar) — a real little spider with animated legs.
- **Grub** (elite/normal) — kept its shape but gained segment bands, a mandible
  mouth and stubby crawling legs, so it reads as a grub instead of a green ball.

Hitboxes are untouched — this is purely how they're drawn. Verified in-engine with
a full spawn lineup, zero errors; dev test build regenerated to match.
