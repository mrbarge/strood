/**
 * Strood Evolution
 * Evolution logic for musical variation
 */
Strood.Evolution = class Evolution {
    constructor(state) {
        this.state = state;
    }

    /**
     * Pick a random index different from current
     */
    evolveIndex(current, poolLength) {
        let next = Math.floor(Math.random() * poolLength);
        // Try to pick something different
        if (poolLength > 1 && next === current) {
            next = (next + 1) % poolLength;
        }
        return next;
    }

    /**
     * Subtle evolution: only tonal/timbral changes, no rhythm changes
     */
    evolveSubtle() {
        const v = this.state.variation;
        const ranges = Strood.Pools.ranges;
        const timing = Strood.Pools.timing;

        // Only evolve timbral parameters - keep rhythm and notes stable
        if (Math.random() > 0.4) {
            v.fmRange = this.evolveIndex(v.fmRange, ranges.fm.length);
        }
        if (Math.random() > 0.4) {
            v.filterRange = this.evolveIndex(v.filterRange, ranges.filter.length);
        }
        // Occasionally shift arp speed slightly
        if (Math.random() > 0.7) {
            v.arpSpeed = this.evolveIndex(v.arpSpeed, timing.arpSpeeds.length);
        }
    }

    /**
     * Radical evolution: change notes, chords, and rhythms
     */
    evolveRadical() {
        const v = this.state.variation;
        const pools = Strood.Pools;

        // Evolve melodic/harmonic content
        if (Math.random() > 0.3) {
            v.bassNotes = this.evolveIndex(v.bassNotes, pools.cMinor.bassNotes.length);
        }
        if (Math.random() > 0.4) {
            v.subNotes = this.evolveIndex(v.subNotes, pools.cMinor.subNotes.length);
        }
        if (Math.random() > 0.3) {
            v.highNotes = this.evolveIndex(v.highNotes, pools.cMinor.highNotes.length);
        }
        if (Math.random() > 0.3) {
            v.chords = this.evolveIndex(v.chords, pools.cMinor.chords.length);
        }
        if (Math.random() > 0.4) {
            v.arpeggios = this.evolveIndex(v.arpeggios, pools.cMinor.arpeggios.length);
        }

        // Evolve rhythmic patterns
        if (Math.random() > 0.4) {
            v.kickPattern = this.evolveIndex(v.kickPattern, pools.drums.kick.length);
        }
        if (Math.random() > 0.4) {
            v.hatPattern = this.evolveIndex(v.hatPattern, pools.drums.hat.length);
        }
        if (Math.random() > 0.5) {
            v.snarePattern = this.evolveIndex(v.snarePattern, pools.drums.snare.length);
        }

        // Also evolve timbral parameters
        v.arpSpeed = this.evolveIndex(v.arpSpeed, pools.timing.arpSpeeds.length);
        v.fmRange = this.evolveIndex(v.fmRange, pools.ranges.fm.length);
        v.filterRange = this.evolveIndex(v.filterRange, pools.ranges.filter.length);
    }

    /**
     * Randomize all variations (for initial start)
     */
    randomize() {
        const v = this.state.variation;
        const pools = Strood.Pools;

        v.bassNotes = Math.floor(Math.random() * pools.cMinor.bassNotes.length);
        v.subNotes = Math.floor(Math.random() * pools.cMinor.subNotes.length);
        v.highNotes = Math.floor(Math.random() * pools.cMinor.highNotes.length);
        v.chords = Math.floor(Math.random() * pools.cMinor.chords.length);
        v.arpeggios = Math.floor(Math.random() * pools.cMinor.arpeggios.length);
        v.kickPattern = Math.floor(Math.random() * pools.drums.kick.length);
        v.hatPattern = Math.floor(Math.random() * pools.drums.hat.length);
        v.snarePattern = Math.floor(Math.random() * pools.drums.snare.length);
        v.arpSpeed = Math.floor(Math.random() * pools.timing.arpSpeeds.length);
        v.fmRange = Math.floor(Math.random() * pools.ranges.fm.length);
        v.filterRange = Math.floor(Math.random() * pools.ranges.filter.length);
    }
};
