import { Ball } from './entities/Ball.js';
import { Paddle } from './entities/Paddle.js';
import { BrickField } from './entities/BrickField.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.lives = 3;
        
        // Set canvas size
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        this.initialize();
    }

    initialize() {
        // Initialize game entities
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.brickField = new BrickField(this);
        
        // Setup event listeners
        this.setupControls();
        
        // Start game loop
        this.gameLoop();
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
            // Handle collision
        }

        // Ball-Brick collision
        this.brickField.checkBallCollision(this.ball);
    }

    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('lives').textContent = `Lives: ${this.lives}`;
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new Game();
});