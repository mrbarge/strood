/**
 * Strood State
 * Centralized state management class
 */
Strood.State = class State {
    constructor() {
        // Current mood name
        this.currentMood = null;

        // Playback state
        this.isPlaying = false;

        // Engine ready state
        this.engineReady = false;

        // Variation indices into pools
        this.variation = {
            bassNotes: 0,
            subNotes: 0,
            highNotes: 0,
            chords: 0,
            arpeggios: 0,
            kickPattern: 0,
            hatPattern: 0,
            snarePattern: 0,
            arpSpeed: 0,
            fmRange: 0,
            filterRange: 0
        };

        // Cycle state
        this.cycle = {
            count: 0,
            epoch: 1,
            startTime: 0,
            duration: Strood.Config.defaultCycleDuration,
            cyclesPerEpoch: Strood.Config.cyclesPerEpoch,
            isTransitioning: false
        };

        // Evolution state (continuous parameters)
        this.evolution = {
            filter: 0.3,
            fm: 0.4,
            density: 0.5,
            space: 0.6
        };
    }

    /**
     * Set the current mood
     */
    setMood(mood) {
        this.currentMood = mood;
    }

    /**
     * Set playing state
     */
    setPlaying(playing) {
        this.isPlaying = playing;
    }

    /**
     * Set engine ready state
     */
    setEngineReady(ready) {
        this.engineReady = ready;
    }

    /**
     * Reset cycle state for new playback
     */
    resetCycle() {
        this.cycle.startTime = Date.now();
        this.cycle.count = 0;
        this.cycle.epoch = 1;
        this.cycle.duration = Strood.Config.defaultCycleDuration;
        this.cycle.isTransitioning = false;
    }

    /**
     * Increment cycle count and update epoch
     */
    incrementCycle() {
        this.cycle.count++;
        this.cycle.startTime = Date.now();

        const cycleInEpoch = ((this.cycle.count - 1) % this.cycle.cyclesPerEpoch) + 1;
        const isRadicalShift = cycleInEpoch === this.cycle.cyclesPerEpoch;

        if (isRadicalShift) {
            this.cycle.epoch++;
        }

        return { cycleInEpoch, isRadicalShift };
    }

    /**
     * Check if current mood is ambient
     */
    isAmbientMood() {
        return Strood.Config.ambientMoods.includes(this.currentMood);
    }

    /**
     * Get current cycle progress (0-1)
     */
    getCycleProgress() {
        const elapsed = Date.now() - this.cycle.startTime;
        return Math.min(elapsed / this.cycle.duration, 1);
    }

    /**
     * Check if cycle is complete
     */
    isCycleComplete() {
        const elapsed = Date.now() - this.cycle.startTime;
        return elapsed >= this.cycle.duration && !this.cycle.isTransitioning;
    }

    /**
     * Check if next cycle will be radical shift
     */
    isNextRadical() {
        const nextCycleInEpoch = (this.cycle.count % this.cycle.cyclesPerEpoch) + 1;
        return nextCycleInEpoch === this.cycle.cyclesPerEpoch;
    }

    /**
     * Set new random cycle duration
     */
    randomizeCycleDuration() {
        const durations = Strood.Pools.timing.cycleDurations;
        const baseDuration = durations[Math.floor(Math.random() * durations.length)];
        this.cycle.duration = this.isAmbientMood() ? baseDuration * 1.5 : baseDuration;
    }

    /**
     * Update evolution state based on time
     */
    updateEvolution() {
        const time = Date.now() / 1000;

        // Use different sine wave periods for each parameter
        this.evolution.filter = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(time * 0.05));
        this.evolution.fm = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(time * 0.03 + 1));
        this.evolution.density = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(time * 0.04 + 2));
        this.evolution.space = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(time * 0.025 + 3));
    }
};
