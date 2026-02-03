/**
 * Strood UI
 * UI management class for DOM interactions
 */
Strood.UI = class UI {
    constructor(state) {
        this.state = state;

        // Cache DOM element references
        this.elements = {
            moodButtons: document.querySelectorAll('.mood-btn'),
            playButton: document.getElementById('play-btn'),
            stopButton: document.getElementById('stop-btn'),
            status: document.getElementById('status'),
            codeContent: document.getElementById('code-content'),
            filterBar: document.getElementById('filter-bar'),
            fmBar: document.getElementById('fm-bar'),
            densityBar: document.getElementById('density-bar'),
            spaceBar: document.getElementById('space-bar'),
            cycleTimerFill: document.getElementById('cycle-timer-fill'),
            cycleCount: document.getElementById('cycle-count'),
            cycleTimerLabel: document.querySelector('.cycle-timer-label')
        };
    }

    /**
     * Bind event listeners to UI elements
     */
    bindEvents(handlers) {
        // Mood button clicks
        this.elements.moodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mood = btn.dataset.mood;
                handlers.onMoodSelect(mood);
            });
        });

        // Play button
        this.elements.playButton.addEventListener('click', () => {
            handlers.onPlay();
        });

        // Stop button
        this.elements.stopButton.addEventListener('click', () => {
            handlers.onStop();
        });
    }

    /**
     * Set active mood button
     */
    setActiveMood(mood) {
        this.elements.moodButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mood === mood);
        });
    }

    /**
     * Update evolution progress bars
     */
    updateEvolutionBars() {
        const e = this.state.evolution;
        this.elements.filterBar.style.width = `${e.filter * 100}%`;
        this.elements.fmBar.style.width = `${e.fm * 100}%`;
        this.elements.densityBar.style.width = `${e.density * 100}%`;
        this.elements.spaceBar.style.width = `${e.space * 100}%`;
    }

    /**
     * Update cycle timer display
     */
    updateCycleTimer() {
        const progress = this.state.getCycleProgress();
        const isNextRadical = this.state.isNextRadical();

        this.elements.cycleTimerFill.style.width = `${progress * 100}%`;
        this.elements.cycleTimerFill.classList.toggle('radical', isNextRadical);
        this.elements.cycleTimerLabel.classList.toggle('radical', isNextRadical);
        this.elements.cycleTimerLabel.textContent = isNextRadical ? 'Radical Shift' : 'Next Evolution';
    }

    /**
     * Update cycle count display
     */
    updateCycleCount(cycleInEpoch) {
        const c = this.state.cycle;
        this.elements.cycleCount.textContent = `Epoch ${c.epoch} · ${cycleInEpoch}/${c.cyclesPerEpoch}`;
    }

    /**
     * Trigger pulse animation on cycle complete
     */
    pulseTimer() {
        this.elements.cycleTimerFill.classList.add('pulse');
        setTimeout(() => this.elements.cycleTimerFill.classList.remove('pulse'), 400);
    }

    /**
     * Reset timer display
     */
    resetTimerDisplay() {
        const c = this.state.cycle;
        this.elements.cycleTimerFill.style.width = '0%';
        this.elements.cycleTimerFill.classList.remove('radical');
        this.elements.cycleTimerLabel.classList.remove('radical');
        this.elements.cycleTimerLabel.textContent = 'Next Evolution';
        this.elements.cycleCount.textContent = `Epoch ${c.epoch} · 0/${c.cyclesPerEpoch}`;
    }

    /**
     * Update code display with pattern lines
     */
    updateCodeDisplay(lines) {
        this.elements.codeContent.innerHTML = lines.map(line => {
            if (line.startsWith('//')) {
                return `<div class="code-comment">${line}</div>`;
            } else {
                return `<div class="code-line">${line}</div>`;
            }
        }).join('');
    }

    /**
     * Set status text
     */
    setStatus(text, playing = false) {
        this.elements.status.textContent = text;
        this.elements.status.classList.toggle('playing', playing);
    }

    /**
     * Set mood color CSS variable
     */
    setMoodColor(color) {
        document.documentElement.style.setProperty('--mood-color', color);
    }
};
