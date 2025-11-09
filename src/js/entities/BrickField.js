export class BrickField {
    constructor(game) {
        this.game = game;
        this.rows = 5;
        this.cols = 8;
        this.brickWidth = 80;
        this.brickHeight = 20;
        this.padding = 10;
        this.offsetTop = 30;
        this.offsetLeft = 35;
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
                    ctx.beginPath();
                    ctx.rect(brick.x, brick.y, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = '#0095DD';
                    ctx.fill();
                    ctx.closePath();
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