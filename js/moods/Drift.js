/**
 * Strood Drift Mood
 * Slow ambient, soft washes
 */
Strood.Moods.Drift = class Drift extends Strood.Moods.Base {
    static name = 'drift';
    static color = '#67e8f9';
    static description = 'Slow ambient, soft washes';
    static family = 'major';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            note("[" + v.chordNotes + "]/16")
                .s("sawtooth")
                .lpf(sine.range(v.filterRange[0], v.filterRange[1] + 400).slow(32))
                .gain(0.4)
                .room(2.5)
                .attack(4)
                .release(8),
            note(v.melodyNotes).slow(2)
                .s("sine")
                .lpf(2000)
                .gain(0.18)
                .room(2)
                .delay(0.8)
                .delayfeedback(0.75)
                .delaytime(0.5),
            s(v.washPattern).bank("RolandTR909")
                .gain(0.12)
                .room(3)
                .lpf(2500)
                .slow(2),
            note("<c2 g2>/16")
                .s("sine")
                .lpf(200)
                .gain(0.35)
                .room(1)
        ).slow(3);
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// DRIFT - Slow ambient wash',
            this.getCycleInfo(subtle),
            'stack(',
            `  note("[${v.chordNotes}]/16").s("sawtooth")`,
            `    .lpf(sine.range(${v.filterRange[0]},${v.filterRange[1] + 400}).slow(32))`,
            '    .gain(0.4).room(2.5).attack(4).release(8),',
            `  note("${v.melodyNotes}").slow(2).s("sine")`,
            '    .lpf(2000).gain(0.18).room(2)',
            '    .delay(0.8).delayfeedback(0.75).delaytime(0.5),',
            `  s("${v.washPattern}").bank("RolandTR909")`,
            '    .gain(0.12).room(3).lpf(2500).slow(2),',
            '  note("<c2 g2>/16").s("sine")',
            '    .lpf(200).gain(0.35).room(1)',
            ').slow(3)'
        ];
    }
};
