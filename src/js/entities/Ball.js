export class Ball {
    constructor(game) {
        this.game = game;
        this.radius = 8;
        this.reset();
    }

    reset() {
        // Start ball at paddle center
        this.x = this.game.canvas.width / 2;
        this.y = this.game.canvas.height - 30;
        this.dx = 4; // Initial horizontal speed
        this.dy = -4; // Initial vertical speed
    }

    update() {
        // Move ball
        this.x += this.dx;
        this.y += this.dy;

        // Wall collision
        if (this.x + this.radius > this.game.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Bottom collision (lose life)
        if (this.y + this.radius > this.game.canvas.height) {
            this.game.lives--;
            if (this.game.lives > 0) {
                this.reset();
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF';
        ctx.fill();
        ctx.closePath();
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