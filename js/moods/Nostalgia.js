/**
 * Strood Nostalgia Mood
 * Warm arpeggios, gentle glow (Fez-inspired)
 */
Strood.Moods.Nostalgia = class Nostalgia extends Strood.Moods.Base {
    static name = 'nostalgia';
    static color = '#fbbf24';
    static description = 'Warm arpeggios, gentle glow';
    static family = 'major';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            note(v.arpNotes).slow(v.slowArpSpeed)
                .s("square")
                .lpf(perlin.range(v.filterRange[0] + 800, v.filterRange[1] + 1200).slow(12))
                .gain(0.22)
                .room(1.2)
                .delay(0.5)
                .delaytime("<0.25 0.375>"),
            note(v.chordNotes + "/8")
                .s("triangle")
                .lpf(1200)
                .gain(0.3)
                .room(1.8)
                .attack(2)
                .release(4),
            note(v.melodyNotes)
                .s("sine")
                .lpf(3000)
                .gain(0.2)
                .room(1.5)
                .delay(0.6)
                .delayfeedback(0.65),
            s(v.ambientPerc).bank("RolandTR909")
                .gain(0.15)
                .room(2.5)
                .lpf(3000)
        ).slow(1.5);
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// NOSTALGIA - Warm Fez-like glow',
            this.getCycleInfo(subtle),
            'stack(',
            `  note("${v.arpNotes}").slow(${v.slowArpSpeed}).s("square")`,
            `    .lpf(perlin.range(${v.filterRange[0] + 800},${v.filterRange[1] + 1200}).slow(12))`,
            '    .gain(0.22).room(1.2).delay(0.5).delaytime("<0.25 0.375>"),',
            `  note("${v.chordNotes}/8").s("triangle")`,
            '    .lpf(1200).gain(0.3).room(1.8)',
            '    .attack(2).release(4),',
            `  note("${v.melodyNotes}").s("sine")`,
            '    .lpf(3000).gain(0.2).room(1.5)',
            '    .delay(0.6).delayfeedback(0.65),',
            `  s("${v.ambientPerc}").bank("RolandTR909")`,
            '    .gain(0.15).room(2.5).lpf(3000)',
            ').slow(1.5)'
        ];
    }
};
