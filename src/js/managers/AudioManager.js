export class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.bgMusic = new Audio('src/assets/sounds/background.mp3');
        this.bgMusic.loop = true;
        this.isMuted = false;

        // Configure background music
        this.bgMusic.volume = 0.5;

        // Initialize sound effects
        this.loadSounds();
        
        // Add mute toggle button
        this.createMuteButton();
    }

    loadSounds() {
        // Add sound effects here
        this.addSound('paddle', 'paddle-hit.mp3');
        this.addSound('brick', 'brick-break.mp3');
        this.addSound('wall', 'wall-hit.mp3');
        this.addSound('gameOver', 'game-over.mp3');
    }

    addSound(name, filename) {
        const audio = new Audio(`src/assets/sounds/${filename}`);
        audio.volume = 0.3;
        this.sounds.set(name, audio);
    }

    createMuteButton() {
        const button = document.createElement('button');
        button.id = 'muteButton';
        button.textContent = '🔊';
        button.style.position = 'absolute';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.fontSize = '24px';
        button.style.padding = '5px 10px';
        button.style.background = 'rgba(255, 255, 255, 0.2)';
        button.style.border = '1px solid white';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px';
        
        button.addEventListener('click', () => this.toggleMute());
        
        const gameContainer = document.querySelector('.game-container');
        gameContainer.appendChild(button);
    }

    startBackgroundMusic() {
        this.bgMusic.play().catch(error => {
            console.log('Audio autoplay failed:', error);
        });
    }

    playSound(name) {
        if (!this.isMuted && this.sounds.has(name)) {
            // Clone the audio to allow overlapping sounds
            const sound = this.sounds.get(name).cloneNode();
            sound.play().catch(error => {
                console.log(`Failed to play ${name} sound:`, error);
            });
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const button = document.getElementById('muteButton');
        
        if (this.isMuted) {
            this.bgMusic.pause();
            button.textContent = '🔈';
        } else {
            this.bgMusic.play();
            button.textContent = '🔊';
        }

        // Update all sound effects volume
        this.sounds.forEach(sound => {
            sound.volume = this.isMuted ? 0 : 0.3;
        });
    }
}