export class Ball {
    constructor(game) {
        this.game = game;
        this.radius = 8;
        this.reset();
    }

    reset() {
        // Start ball at paddle center
        this.x = this.game.canvas.width / 2;
        // Position the ball just above the paddle; preserve the paddle offset if needed
        this.y = this.game.canvas.height - 110; // default baseline; paddle may reposition itself
        // Compute speed based on difficulty multiplier (base speed 4)
        const baseSpeed = 4;
        const mul = (this.game && this.game.difficultyMultiplier) ? this.game.difficultyMultiplier : 1.0;
        const speed = baseSpeed * mul;
        this.dx = speed; // Initial horizontal speed
        this.dy = -speed; // Initial vertical speed
    }

    update() {
        // Move ball
        this.x += this.dx;
        this.y += this.dy;

        // Wall collision
        if (this.x + this.radius > this.game.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
            this.game.audio.playSound('wall');
        }
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;
            this.game.audio.playSound('wall');
        }

        // Bottom collision (lose life)
        if (this.y + this.radius > this.game.canvas.height) {
            this.game.lives--;
            if (this.game.lives > 0) {
                this.reset();
            } else {
                this.game.isGameOver = true;
                this.game.audio.playSound('gameOver');
            }
        }
    }

    draw(ctx) {
        // Ball glow effect
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
        
        // Gradient for the ball
        const gradient = ctx.createRadialGradient(
            this.x - this.radius/3, 
            this.y - this.radius/3, 
            this.radius/4,
            this.x,
            this.y,
            this.radius
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#4488ff');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Add highlight
        ctx.beginPath();
        ctx.arc(
            this.x - this.radius/3,
            this.y - this.radius/3,
            this.radius/3,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
    }

    checkPaddleCollision(paddle) {
        if (this.y + this.radius > paddle.y &&
            this.x > paddle.x &&
            this.x < paddle.x + paddle.width) {
            this.dy = -this.dy;
            return true;
        }
        return false;
    }
}