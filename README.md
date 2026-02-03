# Strood

**Evolving Generative Soundscapes**

Strood is a web-based generative music application that creates continuously evolving IDM (Intelligent Dance Music) and ambient soundscapes. It uses algorithmic composition techniques to generate patterns that transition between subtle tonal shifts and radical structural changes.

## Features

- **9 Distinct Musical Moods** - Each with unique sonic characteristics, from cold machine-like textures to warm ambient drifts
- **Continuous Evolution** - Patterns evolve over time through cycle-based transformations
- **Real-time Code Visualization** - See the Strudel DSL code as it generates
- **Visual Feedback** - Evolution meters and cycle tracking show the generation state

## Moods

| Mood | Character |
|------|-----------|
| **Metallic** | Cold, machine-like with FM synthesis and TR-909 drums |
| **Fractured** | Glitchy, broken textures with granular processing |
| **Submerged** | Dark, underwater atmosphere with deep sub bass |
| **Algorithmic** | Complex polyrhythmic patterns with dense euclidean rhythms |
| **Crystalline** | Sparse, bell-like FM tones with long delay tails |
| **Industrial** | Mechanical, raw with high distortion |
| **Ethereal** | Dreamy, floating pads without drums |
| **Nostalgia** | Warm, gentle arpeggios (Fez-inspired) |
| **Drift** | Minimal ambient with extended reverb |

## Usage

1. Open `index.html` in a modern web browser
2. Select a mood by clicking one of the mood buttons
3. Click "Initiate" to start generation
4. The pattern will continuously evolve - subtle changes occur regularly, with radical shifts every few cycles
5. Click "Terminate" to stop

## Technology

- **Audio Engine**: [Strudel](https://strudel.cc/) v1.2.6 - A JavaScript/WebAssembly music DSL for live coding
- **Samples**: Tidal Drum Machines library (TR-909, TR-808)
- **No Build Required**: Single HTML file with embedded CSS and JavaScript

## Deployment

The application deploys automatically to GitHub Pages on push to master. No build step is required - it's a static site.

To run locally, simply open `index.html` in a browser or serve it with any static file server.

## License

Private project.
