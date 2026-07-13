/**
 * Strood Crystalline Mood
 * FM bells, sparse ethereal
 */
Strood.Moods.Crystalline = class Crystalline extends Strood.Moods.Base {
    static name = 'crystalline';
    static color = '#7dd3fc';
    static description = 'FM bells, sparse ethereal';
    static family = 'minor';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            s(v.kickPattern).bank("RolandTR909")
                .gain(0.6).room(0.4).lpf(700).slow(2),
            s(v.hatPattern).bank("RolandTR808")
                .n(irand(4)).gain(rand.range(0.25, 0.35))
                .room(0.7).delay(0.3).hpf(3500).slow(2),
            s(v.snarePattern).bank("RolandTR909")
                .gain(0.45).room(0.6).slow(2),
            note("[" + v.highNotes + "]/2")
                .s("sine")
                .fm(sine.range(v.fmRange[0], v.fmRange[1]).slow(12))
                .fmh(perlin.range(2, 6).slow(8))
                .lpf(4000)
                .gain(0.22)
                .room(1.5)
                .delay(0.7)
                .delaytime("<0.25 0.375 0.5>")
                .pan(rand),
            note(v.arpNotes).slow(2)
                .s("sine")
                .lpf(3000)
                .gain(0.2)
                .room(1.2)
                .delay(0.7)
                .delayfeedback(0.8),
            note("[" + v.chordNotes + "]/8")
                .s("sawtooth")
                .chop(16)
                .lpf(900)
                .gain(0.18)
                .room(1.3)
        );
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// CRYSTALLINE - FM bells, ethereal',
            this.getCycleInfo(subtle),
            'stack(',
            `  s("${v.kickPattern}").bank("RolandTR909")`,
            '    .gain(0.6).room(0.4).lpf(700).slow(2),',
            `  s("${v.hatPattern}").bank("RolandTR808")`,
            '    .n(irand(4)).gain(rand.range(0.25,0.35))',
            '    .room(0.7).delay(0.3).hpf(3500).slow(2),',
            `  note("[${v.highNotes}]/2").s("sine")`,
            `    .fm(sine.range(${v.fmRange[0]},${v.fmRange[1]}).slow(12))`,
            '    .fmh(perlin.range(2,6).slow(8))',
            '    .lpf(4000).gain(0.22).room(1.5)',
            '    .delay(0.7).delaytime("<0.25 0.375 0.5>").pan(rand),',
            `  note("${v.arpNotes}".slow(2)).s("sine")`,
            '    .lpf(3000).gain(0.2)',
            '    .room(1.2).delay(0.7).delayfeedback(0.8),',
            `  note("[${v.chordNotes}]/8").s("sawtooth")`,
            '    .chop(16).lpf(900).gain(0.18).room(1.3)',
            ')'
        ];
    }
};
