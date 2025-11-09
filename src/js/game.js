import { Ball } from './entities/Ball.js';
import { Paddle } from './entities/Paddle.js';
import { BrickField } from './entities/BrickField.js';
import { AudioManager } from './managers/AudioManager.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
        
        // Set canvas size
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // difficultyMultiplier: 0.6 (slow), 1.0 (normal), 1.6 (fast)
        this.difficultyMultiplier = 1.0;
        this.hasStarted = false;
        
        // Initialize audio (but don't autoplay until user interaction)
        this.audio = new AudioManager();
        
        // Show start overlay to pick difficulty; game will initialize after selection
        this.showStartScreen();
    }

    initialize() {
        // Initialize game entities
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.brickField = new BrickField(this);
        
        // Setup event listeners
        this.setupControls();
        
        // Start background music (user already interacted when selecting difficulty)
        this.audio.startBackgroundMusic();
        
        // Mark started and begin loop
        this.hasStarted = true;
        this.gameLoop();
    }

    showStartScreen() {
        const overlay = document.getElementById('startOverlay');
        if (!overlay) return this.initialize();

        overlay.style.display = 'flex';
        const buttons = overlay.querySelectorAll('.difficulty-buttons button');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const level = btn.getAttribute('data-level');
                // Map levels to multipliers
                if (level === '1') this.difficultyMultiplier = 0.6;
                else if (level === '2') this.difficultyMultiplier = 1.0;
                else if (level === '3') this.difficultyMultiplier = 1.6;

                // Hide overlay and start
                overlay.style.display = 'none';
                this.initialize();
            }, { once: true });
        });
    }

    setupControls() {
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            this.paddle.move(mouseX);
        });
    }

    update() {
        this.ball.update();
        this.checkCollisions();
        this.updateScore();
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw game entities
        this.brickField.draw(this.ctx);
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
    }

    checkCollisions() {
        // Ball-Paddle collision
        if (this.ball.checkPaddleCollision(this.paddle)) {
            this.audio.playSound('paddle');
        }

        // Ball-Brick collision
        if (this.brickField.checkBallCollision(this.ball)) {
            this.audio.playSound('brick');
        }
    }

    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('lives').textContent = `Lives: ${this.lives}`;
    }

    gameLoop() {
        if (!this.isGameOver) {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        } else {
            this.showGameOver();
        }
    }

    showGameOver() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw game over screen
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 50);
        
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Click to Play Again', this.canvas.width / 2, this.canvas.height / 2 + 60);
        
        this.canvas.addEventListener('click', () => this.restart(), { once: true });
    }

    restart() {
        // Reset game state
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
        
        // Reset entities
        // Recreate entities so their positions match canvas and difficulty
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.brickField = new BrickField(this);

        // Resume background music if muted state allows
        if (!this.audio.isMuted) this.audio.startBackgroundMusic();

        // Start game loop again
        this.gameLoop();
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new Game();
});