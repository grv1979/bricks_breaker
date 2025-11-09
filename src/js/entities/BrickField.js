export class BrickField {
    constructor(game) {
        this.game = game;
        this.rows = 5;
        this.cols = 8;
        this.brickWidth = 80;
        this.brickHeight = 25;
        this.padding = 8;
        this.offsetTop = 30;
        this.offsetLeft = 35;
        this.colors = [
            ['#FF3366', '#FF0044'], // Red gradient
            ['#FF6633', '#FF4400'], // Orange gradient
            ['#33FF66', '#00FF44'], // Green gradient
            ['#3366FF', '#0044FF'], // Blue gradient
            ['#9933FF', '#7700FF']  // Purple gradient
        ];
        this.initializeBricks();
    }

    initializeBricks() {
        this.bricks = [];
        for (let row = 0; row < this.rows; row++) {
            this.bricks[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.bricks[row][col] = { 
                    x: col * (this.brickWidth + this.padding) + this.offsetLeft,
                    y: row * (this.brickHeight + this.padding) + this.offsetTop,
                    status: 1 
                };
            }
        }
    }

    draw(ctx) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.bricks[row][col].status === 1) {
                    const brick = this.bricks[row][col];
                    
                    // Create gradient
                    const gradient = ctx.createLinearGradient(
                        brick.x, brick.y,
                        brick.x, brick.y + this.brickHeight
                    );
                    gradient.addColorStop(0, this.colors[row][0]);
                    gradient.addColorStop(1, this.colors[row][1]);

                    // Add glow effect
                    ctx.shadowColor = this.colors[row][0];
                    ctx.shadowBlur = 10;
                    
                    // Draw brick with rounded corners
                    ctx.beginPath();
                    ctx.roundRect(
                        brick.x, brick.y,
                        this.brickWidth, this.brickHeight,
                        5 // radius for rounded corners
                    );
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    // Reset shadow
                    ctx.shadowBlur = 0;
                    
                    // Add highlight
                    ctx.beginPath();
                    ctx.roundRect(
                        brick.x + 2, brick.y + 2,
                        this.brickWidth - 4, this.brickHeight/3,
                        3
                    );
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.fill();
                }
            }
        }
    }

    checkBallCollision(ball) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const brick = this.bricks[row][col];
                if (brick.status === 1) {
                    if (ball.x > brick.x && 
                        ball.x < brick.x + this.brickWidth &&
                        ball.y > brick.y && 
                        ball.y < brick.y + this.brickHeight) {
                        ball.dy = -ball.dy;
                        brick.status = 0;
                        this.game.score += 10;
                        return true;
                    }
                }
            }
        }
        return false;
    }
}