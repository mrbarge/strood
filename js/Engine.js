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
            await new Promise(resolve => setTimeout(resolve, 500));

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
     * Graceful transition with fade out
     */
    gracefulTransition(isAmbient, callback) {
        const transitions = Strood.Config.transitions;

        const ringOutTime = isAmbient
            ? transitions.ambientRingOutTime
            : transitions.ringOutTime;

        const tailDecayTime = isAmbient
            ? transitions.ambientTailDecayTime
            : transitions.tailDecayTime;

        // Let current pattern ring out
        setTimeout(() => {
            this.hush();

            // Wait for reverb/delay tails to decay
            setTimeout(() => {
                if (callback) callback();
            }, tailDecayTime);
        }, ringOutTime);
    }
};
