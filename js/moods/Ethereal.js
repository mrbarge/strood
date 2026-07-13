/**
 * Strood Ethereal Mood
 * Dreamy pads, floating melody
 */
Strood.Moods.Ethereal = class Ethereal extends Strood.Moods.Base {
    static name = 'ethereal';
    static color = '#c4b5fd';
    static description = 'Dreamy pads, floating melody';
    static family = 'major';

    generatePattern() {
        const v = this.getVariation();

        return stack(
            note("[" + v.chordNotes + "]/4")
                .s("sawtooth")
                .lpf(sine.range(v.filterRange[0] + 400, v.filterRange[1] + 800).slow(20))
                .gain(0.35)
                .room(2)
                .attack(3)
                .release(5),
            note(v.arpNotes).slow(v.slowArpSpeed)
                .s("triangle")
                .lpf(v.filterRange[1] + 1000)
                .gain(0.2)
                .room(1.5)
                .delay(0.6)
                .delaytime(0.375)
                .delayfeedback(0.6),
            note(v.melodyNotes)
                .s("sine")
                .lpf(2500)
                .gain(0.25)
                .room(2)
                .delay(0.7)
                .delayfeedback(0.7)
        ).slow(2);
    }

    getCodeLines(subtle = false) {
        const v = this.getVariation();

        return [
            '// ETHEREAL - Dreamy floating',
            this.getCycleInfo(subtle),
            'stack(',
            `  note("[${v.chordNotes}]/4").s("sawtooth")`,
            `    .lpf(sine.range(${v.filterRange[0] + 400},${v.filterRange[1] + 800}).slow(20))`,
            '    .gain(0.35).room(2).attack(3).release(5),',
            `  note("${v.arpNotes}").slow(${v.slowArpSpeed}).s("triangle")`,
            `    .lpf(${v.filterRange[1] + 1000}).gain(0.2).room(1.5)`,
            '    .delay(0.6).delaytime(0.375).delayfeedback(0.6),',
            `  note("${v.melodyNotes}").s("sine")`,
            '    .lpf(2500).gain(0.25).room(2)',
            '    .delay(0.7).delayfeedback(0.7)',
            ').slow(2)'
        ];
    }
};
