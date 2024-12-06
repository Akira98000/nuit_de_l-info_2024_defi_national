class Invader {
    constructor(ctx, x, y, size, imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmZ5xNyZbTIP_pk3ZaEl26pY9hDHzYQW4C4w&s') {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = 6;
        this.image = new Image();
        this.image.src = imageUrl;
    }

    draw() {
        if (this.image.complete) {
            this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        } else {
            this.image.onload = () => {
                this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
            };
        }
    }

    move() {
        this.x += this.speed;

        // Bounce back if hitting canvas edges
        if (this.x + this.size > this.ctx.canvas.width || this.x < 0) {
            this.speed = -this.speed;
            this.y += this.size + 20; // Move down when changing direction
        }
    }
}

class Player {
    constructor(ctx, x, y, size) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = 5;
        this.bullets = [];
        this.shootingInterval = null;
    }

    draw() {
        this.ctx.fillStyle = 'green';
        const background = new Image();
        background.src = 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGQyMC0wMjAwMDY5LXJheS5qcGc.jpg';
        this.ctx.drawImage(background, this.x, this.y, this.size + 50, this.size + 25);
    }

    move(direction) {
        if (direction === 'left' && this.x > 0) {
            this.x -= this.speed;
        } else if (direction === 'right' && this.x + this.size < this.ctx.canvas.width) {
            this.x += this.speed;
        }
    }

    shoot() {
        if (!this.shootingInterval) {
            this.shootingInterval = setInterval(() => {
                this.bullets.push({
                    x: this.x + this.size / 2 - 2,
                    y: this.y,
                    width: 4,
                    height: 10,
                    speed: 7,
                });
            }, 100); // Shoot one bullet per second
        }
    }

    drawBullets() {
        this.bullets = this.bullets.filter(bullet => {
            this.ctx.fillStyle = 'red';
            const background = new Image();
            background.src = 'https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-a-realistic-high-quality-water-bubbles-isolated-png-image_11574242.png';
            this.ctx.drawImage(background, bullet.x, bullet.y, 10, 10);
            bullet.y -= bullet.speed;
            return bullet.y + bullet.height > 0; // Keep bullets within canvas
        });
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.invaders = [];
        this.player = new Player(this.ctx, canvas.width / 2 - 20, canvas.height - 60, 20);
        this.spawnInvaders(5, 10, 30, 35);
        this.isGameRunning = true;

        // Bindings for key events
        this.keys = {};
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);

        this.loop();
    }

    spawnInvaders(rows, cols, size, spacing) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * (size + spacing);
                const y = row * (size + spacing);
                this.invaders.push(new Invader(this.ctx, x, y, size));
            }
        }
    }

    checkCollision() {
        this.player.bullets = this.player.bullets.filter(bullet => {
            let bulletHit = false;
            this.invaders = this.invaders.filter(invader => {
                const hit = (
                    bullet.x < invader.x + invader.size &&
                    bullet.x + bullet.width > invader.x &&
                    bullet.y < invader.y + invader.size &&
                    bullet.y + bullet.height > invader.y
                );
                if (hit) bulletHit = true;
                return !hit;
            });
            return !bulletHit;
        });
    }

    loop() {
        if (!this.isGameRunning) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const background = new Image();
        background.src = 'https://www.shutterstock.com/shutterstock/videos/20257795/thumb/1.jpg';
        this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);

        // Move and draw invaders
        this.invaders.forEach(invader => {
            invader.move();
            invader.draw();
        });

        // Draw and move player
        this.player.draw();
        if (this.keys['ArrowLeft']) this.player.move('left');
        if (this.keys['ArrowRight']) this.player.move('right');
        if (this.keys['Space']) this.player.shoot();

        // Draw and move player's bullets
        this.player.drawBullets();

        // Check collisions
        this.checkCollision();

        // Check if player wins
        if(this.invaders.length === 0) {
            this.isGameRunning = false;
        }

        switch (this.invaders.length) {
            case 49:
                document.getElementById('name1').style.display = 'block';
                break;
            case 46:
                document.getElementById('name2').style.display = 'block';
                break;
            case 43:
                document.getElementById('name3').style.display = 'block';
                break;
            case 40:
                document.getElementById('name4').style.display = 'block';
                break;
            case 37:
                document.getElementById('name5').style.display = 'block';
                break;
            case 34:
                document.getElementById('name6').style.display = 'block';
                break;
            case 31:
                document.getElementById('name7').style.display = 'block';
                break;
            case 28:
                document.getElementById('name8').style.display = 'block';
                break;
            case 25:
                document.getElementById('name9').style.display = 'block';
                break;
            case 22:
                document.getElementById('name10').style.display = 'block';
                break;
            case 19:
                document.getElementById('name11').style.display = 'block';
                break;
            case 16:
                document.getElementById('name12').style.display = 'block';
                break;
            case 11:
                document.getElementById('name22').style.display = 'block';
                break;
            case 13:
                document.getElementById('name13').style.display = 'block';
                break;
            case 10:
                document.getElementById('name14').style.display = 'block';
                break;
            case 7:
                document.getElementById('name15').style.display = 'block';
                break;
            case 4:
                document.getElementById('name16').style.display = 'block';
                break;
            case 3:
                document.getElementById('name18').style.display = 'block';
                break;
            case 2:
                document.getElementById('name19').style.display = 'block';
                break;
            case 1:
                document.getElementById('name20').style.display = 'block';
                break;
            case 0:
                document.getElementById('name21').style.display = 'block';
                break;
            default:
                break;
        }

        requestAnimationFrame(() => this.loop());
    }
}
export default Game;