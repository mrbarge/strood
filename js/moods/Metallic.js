/**
 * Strood Metallic Mood
 * Cold FM textures, machine pulse
 */
Strood.Moods.Metallic = class Metallic extends Strood.Moods.Base {
    static name = 'metallic';
    static color = '#4a9eff';
    static description = 'Cold FM textures, machine pulse';
    static family = 'minor';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            s(v.kickPattern).bank("RolandTR909")
                .gain(0.6).room(0.4).lpf(800),
            s(v.hatPattern).bank("RolandTR808")
                .n(irand(4)).gain(0.35).room(0.7)
                .delay(0.3).pan(rand.range(0.3, 0.7)).hpf(3000),
            s(v.snarePattern).bank("RolandTR909")
                .gain(0.5).room(0.6),
            note("[" + v.bassNotes + "]/4")
                .s("sawtooth")
                .fm(perlin.range(v.fmRange[0], v.fmRange[1]).slow(8))
                .fmh(sine.range(0.5, 2).slow(6))
                .lpf(perlin.range(v.filterRange[0], v.filterRange[1]).slow(4))
                .lpq(8)
                .gain(0.5)
                .room(0.3),
            note("[" + v.highNotes + "]/2")
                .s("square")
                .lpf(2000)
                .gain(0.2)
                .room(0.8)
                .delay(0.5)
                .pan(rand)
        );
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// METALLIC - Cold FM textures',
            this.getCycleInfo(subtle),
            'stack(',
            `  s("${v.kickPattern}").bank("RolandTR909")`,
            '    .gain(0.6).room(0.4).lpf(800),',
            `  s("${v.hatPattern}").bank("RolandTR808")`,
            '    .n(irand(4)).gain(0.35).room(0.7)',
            '    .delay(0.3).pan(rand.range(0.3,0.7)).hpf(3000),',
            `  note("[${v.bassNotes}]/4").s("sawtooth")`,
            `    .fm(perlin.range(${v.fmRange[0]},${v.fmRange[1]}).slow(8))`,
            '    .fmh(sine.range(0.5,2).slow(6))',
            `    .lpf(perlin.range(${v.filterRange[0]},${v.filterRange[1]}).slow(4))`,
            '    .lpq(8).gain(0.5).room(0.3),',
            `  note("[${v.highNotes}]/2").s("square")`,
            '    .lpf(2000).gain(0.2).room(0.8)',
            '    .delay(0.5).pan(rand)',
            ')'
        ];
    }
};
