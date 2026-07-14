/**
 * Strood Engine
 * Strudel integration abstraction
 */
Strood.Engine = class Engine {
    constructor() {
        this.ready = false;
    }

    /**
     * Initialize Strudel and load samples
     */
    async init() {
        try {
            // Wait for Strudel script to fully initialize
            await new Promise(resolve => setTimeout(resolve, Strood.Config.engineInitDelay));

            if (typeof initStrudel === 'function') {
                console.log('Initializing Strudel...');
                await initStrudel({
                    prebake: () => {
                        console.log('Loading drum samples...');
                        return samples('https://strudel.b-cdn.net/tidal-drum-machines.json');
                    }
                });
                console.log('Strudel initialized');
                this.ready = true;
                return true;
            } else {
                console.error('initStrudel not found');
                return false;
            }
        } catch (error) {
            console.error('Error initializing Strudel:', error);
            throw error;
        }
    }

    /**
     * Check if engine is ready
     */
    isReady() {
        return this.ready;
    }

    /**
     * Play a Strudel pattern
     */
    play(pattern) {
        if (pattern && typeof pattern.play === 'function') {
            pattern.play();
            console.log('Pattern started');
            return true;
        } else {
            console.error('Could not play pattern');
            return false;
        }
    }

    /**
     * Stop all sound
     */
    hush() {
        if (typeof hush === 'function') {
            hush();
        }
    }

    /**
     * Graceful transition to the next pattern.
     *
     * Two strategies, selected by Strood.Config.transitions.crossfade:
     *   - crossfade (default): after ringOutTime, invoke the callback WITHOUT
     *     hushing. The callback starts the next pattern, which the Strudel
     *     scheduler swaps in while the current pattern's scheduled tail decays
     *     naturally — no dead air. (Relies on playPattern skipping its hush when
     *     crossfade is on; see main.js.)
     *   - hush: after ringOutTime, hush everything, wait tailDecayTime for
     *     reverb/delay tails to decay, then invoke the callback. The
     *     tailDecayTime wait is an intentional silent gap.
     */
    gracefulTransition(isAmbient, callback) {
        const transitions = Strood.Config.transitions;

        const ringOutTime = isAmbient
            ? transitions.ambientRingOutTime
            : transitions.ringOutTime;

        const tailDecayTime = isAmbient
            ? transitions.ambientTailDecayTime
            : transitions.tailDecayTime;

        if (transitions.crossfade) {
            // Let the current pattern breathe, then start the next one over the
            // top. No hush() → the old tail rings out under the new pattern.
            setTimeout(() => {
                if (callback) callback();
            }, ringOutTime);
            return;
        }

        // Let current pattern ring out, then hush and wait for tails to decay.
        setTimeout(() => {
            this.hush();

            // Wait for reverb/delay tails to decay (audible silent gap).
            setTimeout(() => {
                if (callback) callback();
            }, tailDecayTime);
        }, ringOutTime);
    }
};
