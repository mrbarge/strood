/**
 * Strood Fractured Mood
 * Granular glitch, bit decay
 */
Strood.Moods.Fractured = class Fractured extends Strood.Moods.Base {
    static name = 'fractured';
    static color = '#ff6b4a';
    static description = 'Granular glitch, bit decay';
    static family = 'minor';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            s(v.kickPattern).bank("RolandTR909")
                .gain(0.65).room(0.4).lpf(600),
            s(v.hatPattern).bank("RolandTR808")
                .n(irand(4)).gain(rand.range(0.2, 0.45))
                .room(0.8).delay(0.5).hpf(4000).pan(rand),
            s(v.snarePattern).bank("RolandTR909")
                .gain(0.5).room(0.7),
            note(v.arpNotes).fast(v.arpSpeed)
                .s("triangle")
                .chop("<2 4 8 4>")
                .coarse("<8 16 32 16>")
                .lpf(perlin.range(v.filterRange[0], v.filterRange[1]).slow(4))
                .gain(0.25)
                .room(1.0)
                .delay(0.6)
                .pan(rand),
            note("[" + v.bassNotes + "]/4")
                .s("square")
                .fm(2)
                .lpf(350)
                .lpq(20)
                .gain(0.4)
                .room(0.5)
        );
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// FRACTURED - Granular glitch',
            this.getCycleInfo(subtle),
            'stack(',
            `  s("${v.kickPattern}").bank("RolandTR909")`,
            '    .gain(0.65).room(0.4).lpf(600),',
            `  s("${v.hatPattern}").bank("RolandTR808")`,
            '    .n(irand(4)).gain(rand.range(0.2,0.45))',
            '    .room(0.8).delay(0.5).hpf(4000).pan(rand),',
            `  note("${v.arpNotes}".fast("${v.arpSpeed}")).s("triangle")`,
            '    .chop("<2 4 8 4>").coarse("<8 16 32 16>")',
            `    .lpf(perlin.range(${v.filterRange[0]},${v.filterRange[1]}).slow(4))`,
            '    .gain(0.25).room(1.0).delay(0.6).pan(rand),',
            `  note("[${v.bassNotes}]/4").s("square").fm(2)`,
            '    .lpf(350).lpq(20).gain(0.4).room(0.5)',
            ')'
        ];
    }
};
