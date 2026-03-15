/**
 * Strood Configuration
 * Static configuration object for colors and constants
 */
Strood.Config = {
    // Mood color mappings
    moodColors: {
        // IDM/cold palette
        metallic: '#4a9eff',
        fractured: '#ff6b4a',
        submerged: '#1a8f7d',
        algorithmic: '#9b6bff',
        crystalline: '#7dd3fc',
        industrial: '#f97316',
        // Dreamy/warm palette
        ethereal: '#c4b5fd',
        nostalgia: '#fbbf24',
        drift: '#67e8f9'
    },

    // Default cycle duration in milliseconds
    defaultCycleDuration: 12000,

    // Number of cycles before radical shift
    cyclesPerEpoch: 5,

    // Ambient moods (use longer transitions and cycle durations)
    ambientMoods: ['ethereal', 'nostalgia', 'drift'],

    // Transition timing
    transitions: {
        ringOutTime: 2000,
        tailDecayTime: 1500,
        ambientRingOutTime: 3500,
        ambientTailDecayTime: 2500
    },

    // Evolution probability thresholds
    // Values represent the threshold above which evolution occurs (Math.random() > threshold)
    evolution: {
        subtle: {
            fmRange: 0.4,       // 60% chance to evolve FM range
            filterRange: 0.4,  // 60% chance to evolve filter range
            arpSpeed: 0.7      // 30% chance to evolve arp speed
        },
        radical: {
            bassNotes: 0.3,    // 70% chance to evolve bass notes
            subNotes: 0.4,     // 60% chance to evolve sub notes
            highNotes: 0.3,    // 70% chance to evolve high notes
            chords: 0.3,       // 70% chance to evolve chords
            arpeggios: 0.4,    // 60% chance to evolve arpeggios
            kickPattern: 0.4,  // 60% chance to evolve kick
            hatPattern: 0.4,   // 60% chance to evolve hats
            snarePattern: 0.5  // 50% chance to evolve snare
        }
    },

    // Sine wave parameters for continuous evolution
    sineWave: {
        filter: { base: 0.3, amplitude: 0.5, frequency: 0.05, phase: 0 },
        fm: { base: 0.2, amplitude: 0.6, frequency: 0.03, phase: 1 },
        density: { base: 0.3, amplitude: 0.5, frequency: 0.04, phase: 2 },
        space: { base: 0.4, amplitude: 0.5, frequency: 0.025, phase: 3 }
    },

    // Engine initialization delay (ms) - allows Strudel script to fully load
    engineInitDelay: 500
};
