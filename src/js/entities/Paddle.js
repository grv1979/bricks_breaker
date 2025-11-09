export class Paddle {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 10;
        this.x = (game.canvas.width - this.width) / 2;
        this.y = game.canvas.height - 20;
    }

    move(mouseX) {
        // Keep paddle within canvas bounds
        this.x = Math.max(0, Math.min(mouseX - this.width / 2, this.game.canvas.width - this.width));
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }
}