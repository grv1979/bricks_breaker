export class Paddle {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 10;
        this.x = (game.canvas.width - this.width) / 2;
        this.y = game.canvas.height - 100; // Moved paddle up to 100px from bottom
    }

    move(mouseX) {
        // Keep paddle within canvas bounds
        this.x = Math.max(0, Math.min(mouseX - this.width / 2, this.game.canvas.width - this.width));
    }

    draw(ctx) {
        // Paddle glow effect
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
        
        // Main paddle body
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, '#4488ff');
        gradient.addColorStop(1, '#2266dd');
        
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.roundRect(this.x + 2, this.y + 1, this.width - 4, this.height/3, 3);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
    }
}