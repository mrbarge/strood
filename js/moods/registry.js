/**
 * Strood Mood Registry
 * Registry for mood lookup and registration
 */

// Registry storage
Strood.Moods.registry = {};

/**
 * Register a mood class
 */
Strood.Moods.register = function(MoodClass) {
    Strood.Moods.registry[MoodClass.name] = MoodClass;
};

/**
 * Get a mood class by name
 */
Strood.Moods.get = function(name) {
    return Strood.Moods.registry[name];
};

/**
 * Get all registered mood names
 */
Strood.Moods.getNames = function() {
    return Object.keys(Strood.Moods.registry);
};

// Register all moods
Strood.Moods.register(Strood.Moods.Metallic);
Strood.Moods.register(Strood.Moods.Fractured);
Strood.Moods.register(Strood.Moods.Submerged);
Strood.Moods.register(Strood.Moods.Algorithmic);
Strood.Moods.register(Strood.Moods.Crystalline);
Strood.Moods.register(Strood.Moods.Industrial);
Strood.Moods.register(Strood.Moods.Ethereal);
Strood.Moods.register(Strood.Moods.Nostalgia);
Strood.Moods.register(Strood.Moods.Drift);
