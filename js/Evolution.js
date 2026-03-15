/**
 * Strood Evolution
 * Evolution logic for musical variation
 */
Strood.Evolution = class Evolution {
    constructor(state) {
        this.state = state;
    }

    /**
     * Get the appropriate harmonic pool based on current mood family
     */
    getHarmonicPool() {
        const pools = Strood.Pools;
        return this.state.currentFamily === 'major' ? pools.gMajor : pools.cMinor;
    }

    /**
     * Get the appropriate arp speeds based on current mood family
     */
    getArpSpeeds() {
        const timing = Strood.Pools.timing;
        return this.state.currentFamily === 'major' ? timing.slowArpSpeeds : timing.arpSpeeds;
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
        const thresholds = Strood.Config.evolution.subtle;

        // Only evolve timbral parameters - keep rhythm and notes stable
        if (Math.random() > thresholds.fmRange) {
            v.fmRange = this.evolveIndex(v.fmRange, ranges.fm.length);
        }
        if (Math.random() > thresholds.filterRange) {
            v.filterRange = this.evolveIndex(v.filterRange, ranges.filter.length);
        }
        // Occasionally shift arp speed slightly
        if (Math.random() > thresholds.arpSpeed) {
            v.arpSpeed = this.evolveIndex(v.arpSpeed, this.getArpSpeeds().length);
        }
    }

    /**
     * Radical evolution: change notes, chords, and rhythms
     */
    evolveRadical() {
        const v = this.state.variation;
        const pools = Strood.Pools;
        const harmonicPool = this.getHarmonicPool();
        const thresholds = Strood.Config.evolution.radical;

        // Evolve melodic/harmonic content based on mood family
        if (this.state.currentFamily === 'major') {
            // Major family uses gMajor pools
            if (Math.random() > thresholds.chords) {
                v.chords = this.evolveIndex(v.chords, harmonicPool.chords.length);
            }
            if (Math.random() > thresholds.arpeggios) {
                v.arpeggios = this.evolveIndex(v.arpeggios, harmonicPool.arpeggios.length);
            }
            if (Math.random() > thresholds.highNotes) {
                v.highNotes = this.evolveIndex(v.highNotes, harmonicPool.melodies.length);
            }
            // Major family uses ambient percussion
            if (Math.random() > thresholds.hatPattern) {
                v.hatPattern = this.evolveIndex(v.hatPattern, pools.drums.ambient.length);
            }
        } else {
            // Minor family uses cMinor pools
            if (Math.random() > thresholds.bassNotes) {
                v.bassNotes = this.evolveIndex(v.bassNotes, harmonicPool.bassNotes.length);
            }
            if (Math.random() > thresholds.subNotes) {
                v.subNotes = this.evolveIndex(v.subNotes, harmonicPool.subNotes.length);
            }
            if (Math.random() > thresholds.highNotes) {
                v.highNotes = this.evolveIndex(v.highNotes, harmonicPool.highNotes.length);
            }
            if (Math.random() > thresholds.chords) {
                v.chords = this.evolveIndex(v.chords, harmonicPool.chords.length);
            }
            if (Math.random() > thresholds.arpeggios) {
                v.arpeggios = this.evolveIndex(v.arpeggios, harmonicPool.arpeggios.length);
            }
            // Minor family uses full drum patterns
            if (Math.random() > thresholds.kickPattern) {
                v.kickPattern = this.evolveIndex(v.kickPattern, pools.drums.kick.length);
            }
            if (Math.random() > thresholds.hatPattern) {
                v.hatPattern = this.evolveIndex(v.hatPattern, pools.drums.hat.length);
            }
            if (Math.random() > thresholds.snarePattern) {
                v.snarePattern = this.evolveIndex(v.snarePattern, pools.drums.snare.length);
            }
        }

        // Always evolve timbral parameters (shared across families)
        v.arpSpeed = this.evolveIndex(v.arpSpeed, this.getArpSpeeds().length);
        v.fmRange = this.evolveIndex(v.fmRange, pools.ranges.fm.length);
        v.filterRange = this.evolveIndex(v.filterRange, pools.ranges.filter.length);
    }

    /**
     * Randomize all variations (for initial start)
     */
    randomize() {
        const v = this.state.variation;
        const pools = Strood.Pools;
        const harmonicPool = this.getHarmonicPool();

        // Randomize based on mood family
        if (this.state.currentFamily === 'major') {
            v.chords = Math.floor(Math.random() * harmonicPool.chords.length);
            v.arpeggios = Math.floor(Math.random() * harmonicPool.arpeggios.length);
            v.highNotes = Math.floor(Math.random() * harmonicPool.melodies.length);
            v.hatPattern = Math.floor(Math.random() * pools.drums.ambient.length);
        } else {
            v.bassNotes = Math.floor(Math.random() * harmonicPool.bassNotes.length);
            v.subNotes = Math.floor(Math.random() * harmonicPool.subNotes.length);
            v.highNotes = Math.floor(Math.random() * harmonicPool.highNotes.length);
            v.chords = Math.floor(Math.random() * harmonicPool.chords.length);
            v.arpeggios = Math.floor(Math.random() * harmonicPool.arpeggios.length);
            v.kickPattern = Math.floor(Math.random() * pools.drums.kick.length);
            v.hatPattern = Math.floor(Math.random() * pools.drums.hat.length);
            v.snarePattern = Math.floor(Math.random() * pools.drums.snare.length);
        }

        // Shared parameters
        v.arpSpeed = Math.floor(Math.random() * this.getArpSpeeds().length);
        v.fmRange = Math.floor(Math.random() * pools.ranges.fm.length);
        v.filterRange = Math.floor(Math.random() * pools.ranges.filter.length);
    }
};
