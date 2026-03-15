/**
 * Strood Main Application
 * Entry point - wires everything together
 */
Strood.App = class App {
    constructor() {
        this.state = new Strood.State();
        this.evolution = new Strood.Evolution(this.state);
        this.ui = new Strood.UI(this.state);
        this.engine = new Strood.Engine();
        this.evolutionInterval = null;
        this.currentMoodInstance = null;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            const success = await this.engine.init();
            if (success) {
                this.state.setEngineReady(true);
                this.ui.setStatus('Select mode to begin');
            } else {
                this.ui.setStatus('Error: Engine not loaded');
            }
        } catch (error) {
            this.ui.setStatus('Error: ' + error.message);
        }

        // Bind UI events
        this.ui.bindEvents({
            onMoodSelect: (mood) => this.selectMood(mood),
            onPlay: () => this.play(),
            onStop: () => this.stop()
        });
    }

    /**
     * Select a mood
     */
    selectMood(moodName) {
        const MoodClass = Strood.Moods.get(moodName);
        if (!MoodClass) {
            console.error('Unknown mood:', moodName);
            return;
        }

        this.state.setMood(moodName, MoodClass.family);
        this.currentMoodInstance = new MoodClass(this.state);

        // Update UI
        this.ui.setActiveMood(moodName);
        this.ui.setMoodColor(Strood.Config.moodColors[moodName]);
        this.ui.setStatus(`${moodName.toUpperCase()} mode selected`);

        // If already playing, switch pattern
        if (this.state.isPlaying) {
            this.playPattern();
        }
    }

    /**
     * Start playback
     */
    play() {
        if (!this.engine.isReady()) {
            this.ui.setStatus('Engine initializing...');
            return;
        }

        if (!this.state.currentMood) {
            this.ui.setStatus('Select mode first');
            return;
        }

        this.state.setPlaying(true);

        // Randomize initial variations and reset cycle
        this.evolution.randomize();
        this.state.resetCycle();
        this.ui.resetTimerDisplay();

        // Play the pattern
        this.playPattern();

        // Update status
        this.ui.setStatus(`${this.state.currentMood.toUpperCase()} active`, true);

        // Start evolution timer
        if (this.evolutionInterval) clearInterval(this.evolutionInterval);
        this.evolutionInterval = setInterval(() => this.tick(), 100);
    }

    /**
     * Stop playback
     */
    stop() {
        this.state.setPlaying(false);
        this.engine.hush();

        // Clear evolution timer
        if (this.evolutionInterval) {
            clearInterval(this.evolutionInterval);
            this.evolutionInterval = null;
        }

        // Reset UI
        this.state.cycle.epoch = 0;
        this.ui.resetTimerDisplay();
        this.state.cycle.isTransitioning = false;

        // Update status
        const statusText = this.state.currentMood
            ? `${this.state.currentMood.toUpperCase()} halted`
            : 'Halted';
        this.ui.setStatus(statusText);
        this.ui.updateCodeDisplay(['// Pattern halted']);
    }

    /**
     * Play current pattern
     */
    playPattern(subtle = false) {
        if (!this.state.currentMood || !this.engine.isReady()) return;
        if (!this.currentMoodInstance) return;

        console.log('Playing mood:', this.state.currentMood, 'Cycle:', this.state.cycle.count, subtle ? '(subtle)' : '');

        // For subtle changes, don't hush - let Strudel crossfade
        // For radical changes and initial play, hush first
        if (!subtle) {
            this.engine.hush();
        }

        try {
            // Generate and play pattern
            const pattern = this.currentMoodInstance.generatePattern();
            const success = this.engine.play(pattern);

            if (!success) {
                this.ui.setStatus('Error: Pattern failed');
                return;
            }

            // Update code display
            const codeLines = this.currentMoodInstance.getCodeLines(subtle);
            this.ui.updateCodeDisplay(codeLines);

        } catch (error) {
            console.error('Error playing pattern:', error);
            this.ui.setStatus('Error: ' + error.message);
        }
    }

    /**
     * Evolution timer tick
     */
    tick() {
        // Update evolution state
        this.state.updateEvolution();
        this.ui.updateEvolutionBars();
        this.ui.updateCycleTimer();

        // Check if cycle completed
        if (this.state.isCycleComplete()) {
            const { cycleInEpoch, isRadicalShift } = this.state.incrementCycle();

            // Update display
            this.ui.updateCycleCount(cycleInEpoch);
            this.ui.pulseTimer();

            if (isRadicalShift) {
                // Radical shift: graceful transition with structural changes
                this.state.cycle.isTransitioning = true;
                this.ui.setStatus('Transitioning...');

                this.engine.gracefulTransition(this.state.isAmbientMood(), () => {
                    this.state.cycle.isTransitioning = false;
                    this.evolution.evolveRadical();

                    if (this.state.isPlaying && this.state.currentMood) {
                        this.ui.setStatus(`${this.state.currentMood.toUpperCase()} · Epoch ${this.state.cycle.epoch}`, true);
                        this.playPattern();
                    }
                });
            } else {
                // Subtle shift: tonal/timbral changes, smooth pattern update
                this.evolution.evolveSubtle();
                if (this.state.isPlaying && this.state.currentMood) {
                    this.playPattern(true); // true = subtle mode, no hush
                }
            }

            // Randomize next cycle duration
            this.state.randomizeCycleDuration();
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.stroodApp = new Strood.App();
    stroodApp.init();
});
