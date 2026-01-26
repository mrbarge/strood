import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Shuffle } from 'lucide-react';

const StrudelAmbient = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState('calm');
  const [density, setDensity] = useState(0.3);
  const [reverbAmount, setReverbAmount] = useState(0.7);
  const [enableMelody, setEnableMelody] = useState(false);
  const [enableDrone, setEnableDrone] = useState(true);
  const [enablePads, setEnablePads] = useState(true);
  const [strudelLoaded, setStrudelLoaded] = useState(false);
  const [error, setError] = useState(null);
  const audioContextRef = useRef(null);
  const patternRef = useRef(null);

  const moods = {
    calm: {
      name: 'Calm',
      emoji: '😌',
      scale: 'C major',
      notes: ['c3', 'e3', 'g3', 'c4', 'e4'],
      tempo: 40,
      color: '#a8dadc'
    },
    ethereal: {
      name: 'Ethereal',
      emoji: '✨',
      scale: 'A minor pentatonic',
      notes: ['a2', 'c3', 'd3', 'e3', 'g3', 'a3', 'c4'],
      tempo: 35,
      color: '#b8b8ff'
    },
    mysterious: {
      name: 'Mysterious',
      emoji: '🌑',
      scale: 'D minor',
      notes: ['d2', 'f2', 'a2', 'd3', 'f3', 'a3'],
      tempo: 30,
      color: '#6a4c93'
    },
    oceanic: {
      name: 'Oceanic',
      emoji: '🌊',
      scale: 'E minor',
      notes: ['e2', 'g2', 'b2', 'e3', 'g3', 'b3'],
      tempo: 38,
      color: '#457b9d'
    },
    celestial: {
      name: 'Celestial',
      emoji: '🌟',
      scale: 'F lydian',
      notes: ['f3', 'a3', 'b3', 'c4', 'e4', 'f4'],
      tempo: 42,
      color: '#ffd60a'
    },
    dreamlike: {
      name: 'Dreamlike',
      emoji: '💭',
      scale: 'G major',
      notes: ['g2', 'b2', 'd3', 'g3', 'b3', 'd4'],
      tempo: 36,
      color: '#f4a261'
    }
  };

  useEffect(() => {
    const loadStrudel = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@strudel.cycles/core@latest/dist/index.min.js';
        script.onload = () => {
          setStrudelLoaded(true);
        };
        script.onerror = () => {
          setError('Failed to load Strudel library');
        };
        document.body.appendChild(script);
      } catch (err) {
        setError('Error initializing Strudel: ' + err.message);
      }
    };

    loadStrudel();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const generatePattern = () => {
    const mood = moods[currentMood];
    const noteList = mood.notes.join(' ');
    
    let layers = [];
    
    if (enableDrone) {
      const droneNote = mood.notes[0];
      layers.push(`note("${droneNote}").s("sawtooth").lpf(200).room(0.9).gain(0.3).slow(8)`);
      layers.push(`note("${droneNote}").s("triangle").lpf(150).room(0.9).gain(0.2).slow(12)`);
    }
    
    if (enablePads) {
      const padDensity = density < 0.5 ? 8 : density < 0.7 ? 4 : 2;
      layers.push(`note("<${noteList}>").slow(${padDensity}).s("sawtooth").lpf(800).room(${reverbAmount}).gain(0.4)`);
    }
    
    if (enableMelody) {
      const melodyDensity = Math.max(2, Math.floor(4 / density));
      layers.push(`note("<${noteList}>").slow(${melodyDensity}).s("triangle").lpf(2000).room(${reverbAmount * 0.6}).gain(0.3)`);
    }

    return layers.length > 0 ? `stack(${layers.join(',')}).cpm(${mood.tempo})` : '';
  };

  const togglePlay = async () => {
    if (!strudelLoaded) {
      setError('Strudel is still loading...');
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      patternRef.current = null;
    } else {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        setIsPlaying(true);
        setError(null);
      } catch (err) {
        setError('Error starting audio: ' + err.message);
      }
    }
  };

  const randomizeMood = () => {
    const moodKeys = Object.keys(moods);
    const randomMood = moodKeys[Math.floor(Math.random() * moodKeys.length)];
    setCurrentMood(randomMood);
  };

  return (
    <div className="min-h-screen p-8" style={{ 
      background: `linear-gradient(135deg, ${moods[currentMood].color}22 0%, ${moods[currentMood].color}44 100%)`,
      transition: 'background 0.5s ease'
    }}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            Strudel Ambient Generator
          </h1>
          <p className="text-gray-600">Generative ambient music powered by Strudel patterns</p>
          {!strudelLoaded && (
            <p className="text-sm text-orange-600 mt-2">Loading Strudel library...</p>
          )}
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </header>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={togglePlay}
              disabled={!strudelLoaded}
              className={`flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all ${
                !strudelLoaded ? 'bg-gray-400 cursor-not-allowed' :
                isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause size={24} />
                  Stop
                </>
              ) : (
                <>
                  <Play size={24} />
                  Play
                </>
              )}
            </button>
            
            <button
              onClick={randomizeMood}
              className="flex items-center gap-2 px-6 py-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all"
            >
              <Shuffle size={20} />
              Random Mood
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(moods).map(([key, mood]) => (
                <button
                  key={key}
                  onClick={() => setCurrentMood(key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentMood === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    backgroundColor: currentMood === key ? `${mood.color}22` : 'white'
                  }}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="font-semibold text-gray-800">{mood.name}</div>
                  <div className="text-xs text-gray-600">{mood.scale}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Layers</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableDrone}
                  onChange={(e) => setEnableDrone(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-medium">Bass Drone</span>
              </label>
              
              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enablePads}
                  onChange={(e) => setEnablePads(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-medium">Ambient Pads</span>
              </label>
              
              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableMelody}
                  onChange={(e) => setEnableMelody(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-medium">Melodic Elements</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Note Density</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-16">Sparse</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={density}
                onChange={(e) => setDensity(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-16 text-right">Dense</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Reverb Amount</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-16">Dry</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={reverbAmount}
                onChange={(e) => setReverbAmount(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-16 text-right">Wet</span>
            </div>
          </div>

          {isPlaying && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Current Pattern:</h3>
              <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap break-words">
                {generatePattern()}
              </pre>
            </div>
          )}
        </div>

        <footer className="text-center text-gray-600 text-sm">
          <p>
            Inspired by <a href="https://github.com/mrbarge/mood" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mood</a> • 
            Powered by <a href="https://strudel.cc" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Strudel</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StrudelAmbient;
