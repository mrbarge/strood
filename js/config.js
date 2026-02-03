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
    }
};
