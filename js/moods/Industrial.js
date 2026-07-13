/**
 * Strood Industrial Mood
 * Resonant, mechanical, raw
 */
Strood.Moods.Industrial = class Industrial extends Strood.Moods.Base {
    static name = 'industrial';
    static color = '#f97316';
    static description = 'Resonant, mechanical, raw';
    static family = 'minor';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            s(v.kickPattern).bank("RolandTR909")
                .gain(0.7).room(0.4).lpf(700)
                .sometimes(x => x.distort(0.3)),
            s(v.hatPattern).bank("RolandTR808")
                .n(irand(4)).gain(rand.range(0.3, 0.45))
                .room(0.7).delay(0.4).hpf(3800)
                .sometimes(x => x.chop(2))
                .rarely(x => x.fast(2)),
            s(v.snarePattern).bank("RolandTR909")
                .gain(0.55).room(0.6),
            note("[" + v.bassNotes + "]/2")
                .s("sawtooth")
                .fm(perlin.range(v.fmRange[0], v.fmRange[1]).slow(8))
                .fmh(sine.range(1, 4).slow(6))
                .lpf(perlin.range(v.filterRange[0], v.filterRange[1]).slow(4))
                .lpq(18)
                .gain(0.55)
                .room(0.5)
                .distort(0.2),
            note(v.arpNotes).fast(v.arpSpeed).add(irand(7))
                .s("square")
                .lpf(perlin.range(800, 2000).slow(4))
                .lpq(6)
                .gain(0.3)
                .room(0.8)
                .delay(0.5),
            note("[" + v.chordNotes + "]/16")
                .s("sawtooth")
                .lpf(400)
                .gain(0.3)
                .room(1.5)
                .attack(3)
                .release(4)
        );
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// INDUSTRIAL - Resonant mechanical',
            this.getCycleInfo(subtle),
            'stack(',
            `  s("${v.kickPattern}").bank("RolandTR909")`,
            '    .gain(0.7).room(0.4).lpf(700)',
            '    .sometimes(x => x.distort(0.3)),',
            `  s("${v.hatPattern}").bank("RolandTR808")`,
            '    .n(irand(4)).gain(rand.range(0.3,0.45))',
            '    .room(0.7).delay(0.4).hpf(3800)',
            '    .sometimes(x => x.chop(2)),',
            `  note("[${v.bassNotes}]/2").s("sawtooth")`,
            `    .fm(perlin.range(${v.fmRange[0]},${v.fmRange[1]}).slow(8))`,
            '    .fmh(sine.range(1,4).slow(6))',
            `    .lpf(perlin.range(${v.filterRange[0]},${v.filterRange[1]}).slow(4))`,
            '    .lpq(18).gain(0.55).room(0.5).distort(0.2),',
            `  note("${v.arpNotes}".fast("${v.arpSpeed}").add(irand(7)))`,
            '    .s("square").lpf(perlin.range(800,2000).slow(4))',
            '    .lpq(6).gain(0.3).room(0.8).delay(0.5),',
            `  note("[${v.chordNotes}]/16").s("sawtooth")`,
            '    .lpf(400).gain(0.3).room(1.5).attack(3).release(4)',
            ')'
        ];
    }
};
