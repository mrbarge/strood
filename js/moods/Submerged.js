/**
 * Strood Submerged Mood
 * Deep sub, filtered darkness
 */
Strood.Moods.Submerged = class Submerged extends Strood.Moods.Base {
    static name = 'submerged';
    static color = '#1a8f7d';
    static description = 'Deep sub, filtered darkness';
    static family = 'minor';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            s(v.kickPattern).bank("RolandTR909")
                .gain(0.7).room(0.3).lpf(700).distort(0.2),
            s(v.hatPattern).bank("RolandTR808")
                .n(irand(3)).gain(0.3).room(0.6).hpf(3500),
            s("oh(5,8,<0 1 2>)").bank("RolandTR909")
                .gain(0.25).room(1.0).delay(0.6),
            note(v.subNotes + "/2")
                .s("sine")
                .gain(0.7)
                .lpf(120)
                .room(0.2),
            note(v.bassNotes + "/2")
                .s("sawtooth")
                .fm(v.fmRange[0])
                .fmh(2)
                .lpf(perlin.range(v.filterRange[0], v.filterRange[1]).slow(8))
                .lpq(15)
                .gain(0.5)
                .room(0.4)
                .distort(0.15),
            note(v.chordNotes + "/8")
                .s("sawtooth")
                .lpf(sine.range(300, 700).slow(16))
                .lpq(10)
                .gain(0.25)
                .room(1.5)
                .attack(2)
                .release(3)
        ).slow(1.5);
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// SUBMERGED - Deep filtered darkness',
            this.getCycleInfo(subtle),
            'stack(',
            `  s("${v.kickPattern}").bank("RolandTR909")`,
            '    .gain(0.7).room(0.3).lpf(700).distort(0.2),',
            `  s("${v.hatPattern}").bank("RolandTR808")`,
            '    .n(irand(3)).gain(0.3).room(0.6).hpf(3500),',
            `  note("${v.subNotes}/2").s("sine")`,
            '    .gain(0.7).lpf(120).room(0.2),',
            `  note("${v.bassNotes}/2").s("sawtooth")`,
            `    .fm(${v.fmRange[0]}).fmh(2)`,
            `    .lpf(perlin.range(${v.filterRange[0]},${v.filterRange[1]}).slow(8))`,
            '    .lpq(15).gain(0.5).room(0.4).distort(0.15),',
            `  note("${v.chordNotes}/8").s("sawtooth")`,
            '    .lpf(sine.range(300,700).slow(16))',
            '    .gain(0.25).room(1.5).attack(2).release(3)',
            ').slow(1.5)'
        ];
    }
};
