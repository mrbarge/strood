/**
 * Strood Algorithmic Mood
 * Polyrhythmic complexity
 */
Strood.Moods.Algorithmic = class Algorithmic extends Strood.Moods.Base {
    static name = 'algorithmic';
    static color = '#9b6bff';
    static description = 'Polyrhythmic complexity';
    static family = 'minor';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            s(v.kickPattern).bank("RolandTR909")
                .gain(0.6).room(0.4).lpf("<700 900 600>"),
            s(v.hatPattern).bank("RolandTR808")
                .n(irand(4)).gain(rand.range(0.25, 0.4))
                .room(perlin.range(0.5, 0.9).slow(8))
                .delay(perlin.range(0.3, 0.6).slow(4))
                .hpf(rand.range(3000, 5000)).pan(rand),
            s(v.snarePattern).bank("RolandTR909")
                .gain(0.5).room(0.6),
            note(v.arpNotes).fast(v.arpSpeed)
                .s("square")
                .lpf(perlin.range(v.filterRange[0], v.filterRange[1]).slow(4))
                .gain(0.2)
                .room(0.8)
                .delay(0.5),
            note("[" + v.subNotes + "]/4")
                .s("sine")
                .fm(0.5)
                .gain(0.45)
                .lpf(200)
                .room(0.8)
        );
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// ALGORITHMIC - Polyrhythmic complexity',
            this.getCycleInfo(subtle),
            'stack(',
            `  s("${v.kickPattern}").bank("RolandTR909")`,
            '    .gain(0.6).room(0.4).lpf("<700 900 600>"),',
            `  s("${v.hatPattern}").bank("RolandTR808")`,
            '    .n(irand(4)).gain(rand.range(0.25,0.4))',
            '    .room(perlin.range(0.5,0.9).slow(8))',
            '    .delay(perlin.range(0.3,0.6).slow(4))',
            '    .hpf(rand.range(3000,5000)).pan(rand),',
            `  s("${v.snarePattern}").bank("RolandTR909")`,
            '    .gain(0.5).room(0.6),',
            `  note("${v.arpNotes}".fast("${v.arpSpeed}"))`,
            `    .s("square").lpf(perlin.range(${v.filterRange[0]},${v.filterRange[1]}).slow(4))`,
            '    .gain(0.2).room(0.8).delay(0.5),',
            `  note("[${v.subNotes}]/4").s("sine").fm(0.5)`,
            '    .gain(0.45).lpf(200).room(0.8)',
            ')'
        ];
    }
};
