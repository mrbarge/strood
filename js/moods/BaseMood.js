/**
 * Strood Base Mood
 * Abstract base class for all moods
 */
Strood.Moods.Base = class BaseMood {
    static name = 'base';
    static color = '#ffffff';
    static description = '';
    static family = 'minor';  // 'minor' or 'major'

    constructor(state) {
        this.state = state;
    }

    /**
     * Get current variation values from pools based on state indices
     * Returns values from the appropriate harmonic family
     */
    getVariation() {
        const v = this.state.variation;
        const pools = Strood.Pools;

        // Get values based on mood family
        if (this.constructor.family === 'major') {
            return {
                // G major / dreamy pools
                chordNotes: pools.gMajor.chords[v.chords % pools.gMajor.chords.length],
                arpNotes: pools.gMajor.arpeggios[v.arpeggios % pools.gMajor.arpeggios.length],
                melodyNotes: pools.gMajor.melodies[v.highNotes % pools.gMajor.melodies.length],
                // Ambient percussion
                ambientPerc: pools.drums.ambient[v.hatPattern % pools.drums.ambient.length],
                washPattern: pools.drums.wash[v.hatPattern % pools.drums.wash.length],
                // Timing
                slowArpSpeed: pools.timing.slowArpSpeeds[v.arpSpeed % pools.timing.slowArpSpeeds.length],
                // Ranges
                fmRange: pools.ranges.fm[v.fmRange],
                filterRange: pools.ranges.filter[v.filterRange]
            };
        } else {
            return {
                // C minor / IDM pools
                bassNotes: pools.cMinor.bassNotes[v.bassNotes],
                subNotes: pools.cMinor.subNotes[v.subNotes],
                highNotes: pools.cMinor.highNotes[v.highNotes],
                chordNotes: pools.cMinor.chords[v.chords],
                arpNotes: pools.cMinor.arpeggios[v.arpeggios],
                // Drum patterns
                kickPattern: pools.drums.kick[v.kickPattern],
                hatPattern: pools.drums.hat[v.hatPattern],
                snarePattern: pools.drums.snare[v.snarePattern],
                // Timing
                arpSpeed: pools.timing.arpSpeeds[v.arpSpeed],
                // Ranges
                fmRange: pools.ranges.fm[v.fmRange],
                filterRange: pools.ranges.filter[v.filterRange]
            };
        }
    }

    /**
     * Get epoch and cycle info for code display
     */
    getCycleInfo(subtle = false) {
        const c = this.state.cycle;
        return `// Epoch ${c.epoch} · Cycle ${c.count}${subtle ? ' (subtle)' : ''}`;
    }

    /**
     * Generate the Strudel pattern - must be implemented by subclasses
     */
    generatePattern() {
        throw new Error('Subclass must implement generatePattern()');
    }

    /**
     * Get code display lines - must be implemented by subclasses
     */
    getCodeLines(subtle = false) {
        throw new Error('Subclass must implement getCodeLines()');
    }
};
