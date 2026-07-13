# Architecture

## Overview

Strood is a single-file web application (`index.html`) containing all HTML, CSS, and JavaScript. This monolithic approach enables zero-dependency deployment while maintaining clear internal organization.

## Technology Stack

- **Frontend**: Vanilla JavaScript (no framework)
- **Audio**: Strudel Web v1.2.6 (CDN-loaded)
- **Styling**: CSS3 with custom properties for theming
- **Fonts**: Space Mono (Google Fonts)
- **Deployment**: GitHub Pages via GitHub Actions

## Application Flow

```
User clicks mood button
    ↓
Sets currentMood & updates CSS color theme
    ↓
User clicks "Initiate"
    ↓
playPattern() generates Strudel code for selected mood
    ↓
Pattern plays audio through Web Audio API
    ↓
Evolution timer starts (100ms intervals)
    ↓
evolveState() updates UI bars using sine waves
    ↓
Cycle completes → evolveSubtle() or evolveRadical()
    ↓
Pattern regenerates with new variations
```

## Key Components

### State Management

Global state is managed through several key variables:

- `currentMood` - Currently selected mood (string)
- `currentVariation` - Object tracking 11 evolution parameters:
  ```javascript
  {
    bassNotes, subNotes, highNotes, chords, arpeggios,
    kickPattern, hatPattern, snarePattern,
    arpSpeed, fmRange, filterRange
  }
  ```
- `cycleCount` - Tracks cycles for determining radical shift timing
- `evolutionTimer` - Interval reference for evolution updates

### Pattern Generation

Each mood generates patterns through a switch statement in `playPattern(subtle)`:

1. **Code Display String** - Human-readable Strudel DSL shown in UI
2. **Executable Pattern** - Actual Strudel code for audio playback

Pattern generation uses **evolution pools** - arrays of harmonically/rhythmically compatible sequences that can be indexed into for variation.

> **Gotcha:** spread sequences must be wrapped as `[seq]/N` (not `seq + "/N"`),
> otherwise `/N` slows only the last token. See
> [docs/pattern-density-and-silence.md](docs/pattern-density-and-silence.md).

### Evolution System

The evolution system operates on two levels:

**Subtle Evolution** (every cycle):
- Updates only timbral parameters (FM range, filter settings)
- Quick crossfade transition (~2 seconds)

**Radical Evolution** (every N cycles, configurable):
- Changes melodic, harmonic, and rhythmic content
- Graceful transition: hush (~2 sec) + decay (~1.5 sec)
- Ambient moods get longer transitions (3.5 + 2.5 sec)

Visual feedback:
- Evolution bars display sine-wave-generated parameter values
- Cycle timer shows progress with "radical shift" warning indicator

### Harmonic System

Two distinct harmonic families:

**C Natural Minor** (IDM moods: metallic, fractured, submerged, algorithmic, crystalline, industrial):
- Scale: C, D, Eb, F, G, Ab, Bb
- Chords: Cm, Fm, Gm, Ab, Bb, Eb

**G Major / C Lydian** (Dreamy moods: ethereal, nostalgia, drift):
- Scale: G, A, B, C, D, E, F#
- Provides warm, major-key contrast

### Rhythmic Patterns

Uses **Euclidean rhythm algorithm** for polyrhythmic interest:
- Example: `bd(3,8)` = 3 beats distributed across 8 steps
- Provides musically interesting combinations without hard-coding specific patterns

## Key Functions

| Function | Purpose |
|----------|---------|
| `playPattern(subtle)` | Generates and plays audio pattern for current mood |
| `evolveSubtle()` | Updates timbral parameters only |
| `evolveRadical()` | Changes melodic, harmonic, and rhythmic content |
| `evolveState()` | Updates visual progress bars and cycle timer |
| `randomizeVariations()` | Initializes random pattern indices on startup |
| `gracefulTransition()` | Smooth crossfade between radical shifts |

## Audio Processing

Strudel provides the audio engine with:

- **Synthesis**: FM synthesis, filters, envelopes
- **Effects**: Reverb, delay, distortion, filtering
- **Samples**: TR-909/TR-808 drum kits from Tidal library
- **Modulation**: Perlin noise for natural parameter variation
- **Randomization**: `irand()`, `rand`, `rand.range()` for controlled variation

## UI Architecture

**Color Theming**: CSS custom property `--mood-color` propagates accent color throughout UI when mood changes.

**Layout**: CSS Grid with responsive breakpoints (3 columns → 2 columns on smaller screens).

**Visual Elements**:
- Mood selection buttons with active state
- Evolution progress bars (sine-wave driven)
- Cycle timer with radical shift warning
- Real-time code display panel

## File Structure

```
strood/
├── index.html          # Complete application (HTML + CSS + JS)
├── package.json        # Minimal package definition (no dependencies)
├── README.md           # Project overview
├── ARCHITECTURE.md     # This file
├── .gitignore          # Excludes .idea directory
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

## External Dependencies

All loaded via CDN at runtime:

1. **Strudel Web v1.2.6**: `https://unpkg.com/@strudel/web@1.2.6`
2. **Tidal Drum Machines**: `https://strudel.b-cdn.net/tidal-drum-machines.json`
3. **Google Fonts**: Space Mono (400 & 700 weights)
