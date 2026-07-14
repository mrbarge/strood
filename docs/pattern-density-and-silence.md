# Pattern Density & Silence — Analysis Notes

Investigation notes from debugging a reported "large gap of silence on each loop"
in generated patterns. Kept for future reference because the root cause is a
subtle mini-notation gotcha that is easy to reintroduce.

## TL;DR

- **Bug found & fixed:** every mood built pads/basses as `note(v.seq + "/N")`.
  In Strudel mini-notation `/N` binds **only to the token it follows**, not the
  whole sequence. Result: all chords/notes except the last fired *every cycle*
  (too dense, harmonically wrong), and only the final token was slowed. The
  documented intent ("spread the whole progression over N cycles") never
  happened. Fixed by wrapping the sequence: `note("[" + v.seq + "]/N")`.
- **The reported silence was NOT this bug.** The generated patterns are fully
  gap-free when looped in isolation. The audible silence is the app's own
  **graceful-transition dead air** at radical shifts (deliberate `hush()` +
  wait). See [The silence](#the-silence-separate-from-the-bug).

## The mini-notation gotcha (root cause of the density bug)

In Strudel/Tidal mini-notation, the `/` (slow) operator is a **postfix modifier
on the single element immediately before it**. It does *not* slow the enclosing
sequence.

```
"a b c d/8"     → a, b, c play every cycle; only d is slowed (plays 1 in 8 cycles)
"[a b c d]/8"   → the whole 4-step group is slowed → progression spread over 8 cycles
```

So string-concatenating a divisor onto a multi-token sequence is a silent
misparse:

```js
// BROKEN — "/8" only applies to the last chord
note(v.chordNotes + "/8")

// CORRECT — brackets make "/8" apply to the whole progression
note("[" + v.chordNotes + "]/8")
```

Equivalent correct forms: `note("[" + seq + "]/N")`  ≡  `note(seq).slow(N)`
(when `note()` parses the string as mini-notation).

### Why this matters: `/N` also stretches note *duration*

A common wrong assumption is that spreading a progression over N cycles creates
silence. It does not. Slowing stretches each event's **whole duration** to fill
its (now longer) slot, so a `[chords]/8` pad **sustains continuously** even
though a new chord only *onsets* every 2 cycles. Basslines become one held note
per cycle. This is why the fix makes patterns *more coherent*, not sparser.

## Empirical evidence

Measured with the actual parser (`@strudel/mini@1.2.6`) via `queryArc`, counting
onsets per cycle over 16 cycles (each digit = onsets in that cycle):

```
bass  "c2 eb2 g2 bb2/4"    (BROKEN) : 4333433343334333   ← notes 1-3 every cycle
bass  "[c2 eb2 g2 bb2]/4"  (FIXED)  : 1111111111111111   ← one note/cycle, held

pad   "[chords]/8"   (FIXED) : 4040303040403030   fullySustained = true
pad   "[chords]/16"  (FIXED) : 4000400030003000   fullySustained = true
```

`fullySustained = true` means every instant of the timeline is covered by a held
note — i.e. no silent gap despite sparse onsets. Melodic layers that contain
rests (`~`) report `false`, which is correct/intended (they are melodies over a
bed, not pads).

### Reproducing the measurement

```js
import { mini } from '@strudel/mini';
const evs = mini("[c2 eb2 g2 bb2]/4").queryArc(0, 16).filter(e => e.hasOnset());
// inspect e.part.begin (onset) and e.whole.begin/end (held span)
```

Note: when driving the parser standalone under Node, `@strudel/core@1.2.6` fails
to import because its transitive `@kabelsalat/web` dep doesn't expose the
`SalatRepl` named export in CJS. Use `@strudel/mini`'s `mini()` directly (it
parses strings and returns a queryable `Pattern`) rather than `note("...")`,
because bare `note()` outside the full web runtime does not auto-parse
mini-notation and will treat the whole string as one literal note value.

## The fix (applied)

Wrapped every spread sequence in brackets, in **both** `generatePattern()` and
`getCodeLines()` (the displayed code), across all 9 moods:

| Mood        | Layers fixed                                   |
|-------------|------------------------------------------------|
| Metallic    | `bassNotes /4`, `highNotes /2`                 |
| Fractured   | `bassNotes /4`                                 |
| Submerged   | `subNotes /2`, `bassNotes /2`, `chordNotes /8` |
| Algorithmic | `subNotes /4`                                  |
| Crystalline | `highNotes /2`, `chordNotes /8`                |
| Industrial  | `bassNotes /2`, `chordNotes /16`               |
| Ethereal    | `chordNotes /4`                                |
| Nostalgia   | `chordNotes /8`                                |
| Drift       | `chordNotes /16`                               |

`js/pools.js` comments were updated to state the rule: **mood code must wrap
spread sequences as `[seq]/N`** — `seq + "/N"` is a misparse.

Left intentionally unchanged:
- Drift's `note("<c2 g2>/16")` — `<c2 g2>` is a *single* alternating element, so
  `/16` correctly applies to it (a slow sub-bass drone).
- The displayed-code arp layers still show the `"notes".slow(2)` string-method
  form (cosmetic; only relevant if display text is copy-pasted into strudel.cc).

## The silence (separate from the bug)

The generated patterns are structurally gap-free, so the reported "gap of silence
on each loop" comes from the runtime, not the notes. The only silence in the
system is deliberate:

- `js/Engine.js` `gracefulTransition()` — on a radical shift it lets the pattern
  ring out (`ringOutTime`), calls `hush()`, then waits `tailDecayTime` **with
  nothing scheduled** before starting the next pattern. That wait is pure
  silence.
- `js/config.js` `transitions` — the silent window is **1500 ms** (**2500 ms**
  for ambient moods).
- Radical shifts fire every **5th cycle** (`cyclesPerEpoch`, see
  `js/State.js` `incrementCycle()`), which matches "after a few evolutions" and
  "recurs each loop/epoch".

If this dead air is undesirable, the fix lives in the transition: reduce
`tailDecayTime` toward 0, or replace `hush()`-then-wait with a real crossfade
(start the next pattern before/while lowering the current one's gain rather than
hard-hushing into silence).

## Update — both fixes implemented (2026-07-14)

Both mitigations above were implemented and made switchable via a new
`transitions.crossfade` flag in `js/config.js`:

- **`crossfade: true` (new default).** `Engine.gracefulTransition()` skips
  `hush()` entirely on a radical shift: after `ringOutTime` it just starts the
  next pattern. The Strudel scheduler swaps the active pattern in, so the
  outgoing pattern's already-scheduled tail (reverb/delay/held notes) rings out
  under the new one — zero dead air. This reuses the exact mechanism the subtle
  path already relied on every cycle. Requires `main.js` `playPattern()` to skip
  its `!subtle` hush when crossfade is on (otherwise it would hush the very tail
  it's preserving); that guard is now in place.
- **`crossfade: false`.** Original hush-then-wait path, but `tailDecayTime` was
  cut from **1500→400 ms** (ambient **2500→800 ms**) so the silent window only
  covers tail decay instead of a full ~1.5 s gap.

Side effect of crossfade mode: switching moods while playing (`selectMood` →
`playPattern()`, `main.js`) now also blends instead of hard-cutting, since it too
skips the hush. This is harmless (Strudel swaps rather than stacks patterns, so
nothing leaks) and generally sounds better; if a hard cut on manual mood-switch
is ever wanted, pass an explicit flag from that call site to force the hush.
