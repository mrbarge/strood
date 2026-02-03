/**
 * Strood Evolution Pools
 * Musical variation pools organized by harmonic family
 */
Strood.Pools = {
    // === C MINOR FAMILY (for IDM moods) ===
    // All in C natural minor: C, D, Eb, F, G, Ab, Bb
    cMinor: {
        // Bass note sequences
        bassNotes: [
            "<c2 eb2 g2 bb2>",      // Cm7 arpeggio
            "<c2 f2 g2 bb2>",       // Cm7 variation
            "<c2 eb2 f2 g2>",       // Cm add4
            "<c2 g2 bb2 c3>",       // Cm octave
            "<c2 eb2 ab2 g2>",      // Cm - Ab
            "<c2 f2 ab2 g2>",       // C - F - Ab - G
            "<c2 bb1 ab1 g1>",      // Descending
            "<c2 d2 eb2 g2>"        // C minor scale fragment
        ],

        // Sub bass notes (root movement in C minor)
        subNotes: [
            "<c1 ~ c1 ~ g1 ~ g1 ~>",       // C - G pedal
            "<c1 ~ eb1 ~ f1 ~ g1 ~>",      // Scale walk
            "<c1 ~ ~ c1 ~ ~ g1 ~>",        // Sparse C - G
            "<c1 ~ f1 ~ c1 ~ g1 ~>",       // C - F - C - G
            "<c1 ~ ab0 ~ bb0 ~ c1 ~>",     // Ab - Bb - C
            "<c1 ~ ~ ~ g1 ~ ~ ~>"          // Very sparse
        ],

        // High melodic fragments (C minor pentatonic: C, Eb, F, G, Bb)
        highNotes: [
            "<c5 ~ eb5 ~ ~ g5 ~ ~>",
            "<eb5 ~ g5 ~ ~ c6 ~ ~>",
            "<g5 ~ bb5 ~ ~ c6 ~ ~>",
            "<c5 ~ f5 ~ ~ g5 ~ ~>",
            "<bb4 ~ c5 ~ ~ eb5 ~ ~>",
            "<g5 ~ ~ c6 ~ ~ eb6 ~>",
            "~ c5 ~ ~ ~ eb5 ~ ~ ~ ~ g5 ~ ~ ~ c6 ~",
            "~ ~ eb5 ~ ~ ~ g5 ~ ~ ~ bb5 ~ ~ ~ ~ ~"
        ],

        // Chord voicings (C minor family - Cm, Fm, Gm, Ab, Bb, Eb)
        chords: [
            "<[c3,eb3,g3] [f3,ab3,c4] [g3,bb3,d4]>",           // Cm - Fm - Gm
            "<[c3,eb3,g3,bb3] [ab2,c3,eb3,g3]>",               // Cm7 - Abmaj7
            "<[eb3,g3,bb3] [ab2,c3,eb3] [bb2,d3,f3]>",         // Eb - Ab - Bb
            "<[c3,eb3,g3] [bb2,d3,f3] [ab2,c3,eb3]>",          // Cm - Bb - Ab
            "<[f3,ab3,c4] [eb3,g3,bb3] [c3,eb3,g3]>",          // Fm - Eb - Cm
            "<[g3,bb3,d4] [f3,ab3,c4] [eb3,g3,bb3]>",          // Gm - Fm - Eb
            "<[c3,eb3,bb3] [ab2,eb3,g3] [bb2,f3,ab3]>",        // Cm7 - Ab - Bb
            "<[c3,g3,c4] [eb3,bb3,eb4] [f3,c4,f4]>"            // Open voicings
        ],

        // Arpeggios (C minor family)
        arpeggios: [
            "c4 eb4 g4 bb4 c5 bb4 g4 eb4",     // Cm7
            "c4 eb4 g4 c5 g4 eb4 c4 g3",       // Cm
            "eb4 g4 bb4 eb5 bb4 g4 eb4 bb3",   // Eb
            "f4 ab4 c5 f5 c5 ab4 f4 c4",       // Fm
            "g4 bb4 d5 g5 d5 bb4 g4 d4",       // Gm
            "ab3 c4 eb4 ab4 eb4 c4 ab3 eb3",   // Ab
            "bb3 d4 f4 bb4 f4 d4 bb3 f3",      // Bb
            "c4 g4 c5 eb5 c5 g4 eb4 c4"        // Cm spread
        ]
    },

    // === G MAJOR / C LYDIAN FAMILY (for dreamy moods) ===
    // All in G major: G, A, B, C, D, E, F#
    gMajor: {
        // Warm pad chords (G major family)
        chords: [
            "<[g3,b3,d4,f#4] [c3,e3,g3,b3] [d3,f#3,a3,c4]>",   // Gmaj7 - Cmaj7 - D7
            "<[c3,e3,g3,b3] [g3,b3,d4,f#4] [a3,c4,e4,g4]>",    // Cmaj7 - Gmaj7 - Am7
            "<[e3,g3,b3,d4] [a3,c4,e4,g4] [d3,f#3,a3,c4]>",    // Em7 - Am7 - D7
            "<[g3,b3,d4] [c3,e3,g3] [d3,f#3,a3]>",             // G - C - D
            "<[c3,e3,g3,b3] [d3,f#3,a3,c4] [e3,g3,b3,d4]>",    // Cmaj7 - D7 - Em7
            "<[a3,c4,e4] [g3,b3,d4] [e3,g3,b3]>",              // Am - G - Em
            "<[g3,d4,g4] [c3,g3,c4] [d3,a3,d4]>",              // Open voicings
            "<[e3,b3,e4] [a3,e4,a4] [g3,d4,g4]>"               // Open voicings
        ],

        // Bright arpeggios (G major family)
        arpeggios: [
            "g4 b4 d5 g5 d5 b4 g4 d4",         // G
            "c4 e4 g4 c5 g4 e4 c4 g3",         // C
            "d4 f#4 a4 d5 a4 f#4 d4 a3",       // D
            "e4 g4 b4 e5 b4 g4 e4 b3",         // Em
            "a4 c5 e5 a5 e5 c5 a4 e4",         // Am
            "g4 b4 d5 f#5 d5 b4 g4 d4",        // Gmaj7
            "c4 e4 g4 b4 g4 e4 c4 g3",         // Cmaj7
            "d4 a4 d5 f#5 d5 a4 f#4 d4"        // D spread
        ],

        // Gentle melodic fragments (G major pentatonic: G, A, B, D, E)
        melodies: [
            "~ g5 ~ ~ b5 ~ ~ d6 ~ ~ ~ ~ ~ ~ ~ ~",
            "~ ~ a5 ~ ~ ~ d6 ~ ~ ~ e6 ~ ~ ~ ~ ~",
            "e5 ~ ~ ~ g5 ~ ~ ~ b5 ~ ~ ~ d6 ~ ~ ~",
            "~ b5 ~ ~ ~ d6 ~ ~ ~ g6 ~ ~ ~ ~ ~ ~",
            "~ ~ ~ g5 ~ ~ ~ b5 ~ ~ ~ e6 ~ ~ ~ ~",
            "d5 ~ ~ ~ ~ g5 ~ ~ ~ ~ b5 ~ ~ ~ ~ d6",
            "~ a5 ~ ~ ~ ~ d6 ~ ~ ~ ~ e6 ~ ~ ~ ~",
            "~ ~ ~ ~ g5 ~ ~ ~ ~ ~ b5 ~ ~ ~ ~ d6"
        ]
    },

    // === DRUM PATTERNS (shared) ===
    drums: {
        // Euclidean kick patterns
        kick: [
            "bd(3,8)",
            "bd(5,8)",
            "bd(3,8,<0 1 2>)",
            "bd(5,8,<0 2>)",
            "bd(<3 5>,8)",
            "bd(<3 5 2 4>,<8 7 9 11>)",
            "bd(7,16)",
            "bd ~ bd:1 ~",
            "bd ~ [bd bd:1] ~",
            "bd(<3 4 5 3>,8)"
        ],

        // Euclidean hat patterns
        hat: [
            "hh(11,16)",
            "hh(13,16)",
            "hh(<11 13>,16)",
            "hh(<13 17 11>,<16 16 16>)",
            "hh*<8 12 16 6>",
            "hh*<8 10 12 14 16 14 12 10>",
            "hh(11,16,<0 1 2>)",
            "hh(<11 13 17>,16)"
        ],

        // Snare patterns
        snare: [
            "~ sd(3,8,<0 2 1>)",
            "sd(<3 4 5>,<8 9 7>,<0 1 2 3>)",
            "~ [sd cp] ~ <sd rim>",
            "~ sd ~ <sd [sd*2]>",
            "sd(<3 5>,8,<1 0 2>)",
            "~ sd(3,8) ~",
            "~ <sd [sd cp]> ~ sd",
            "sd(<3 4>,<8 7>,<0 2>)"
        ],

        // Soft ambient percussion
        ambient: [
            "~ ~ ~ ~ ~ ~ ~ oh:3",
            "~ ~ ~ ~ oh:2 ~ ~ ~",
            "~ ~ ~ ~ ~ ~ oh:1 ~",
            "oh:3 ~ ~ ~ ~ ~ ~ ~",
            "~ ~ oh:2 ~ ~ ~ ~ ~",
            "~ ~ ~ ~ ~ oh:1 ~ ~"
        ],

        // Long cymbal/wash patterns
        wash: [
            "~ ~ ~ ~ ~ ~ ~ ~",
            "oh:3 ~ ~ ~ ~ ~ ~ ~",
            "~ ~ ~ ~ oh:2 ~ ~ ~",
            "~ ~ ~ oh:1 ~ ~ ~ oh:3"
        ]
    },

    // === TIMING ===
    timing: {
        // Arpeggio speeds
        arpSpeeds: ["<1 1.5 2>", "<1 2 1.5>", "<0.5 1 1.5>", "<1 1.5 2 1.5>", "<2 1 0.5>"],

        // Slow arp speeds for ambient
        slowArpSpeeds: ["<0.5 0.25>", "<0.5 0.75>", "<0.25 0.5>", "<0.75 0.5 0.25>", "0.5"],

        // Cycle durations (ms)
        cycleDurations: [10000, 12000, 14000, 16000, 18000, 20000]
    },

    // === PARAMETER RANGES ===
    ranges: {
        // FM modulation ranges
        fm: [[2, 5], [1, 4], [3, 8], [2, 6], [1, 6], [4, 10]],

        // Filter ranges
        filter: [[200, 500], [300, 600], [250, 700], [400, 900], [200, 800], [300, 1000]]
    }
};
