const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player = document.getElementById('player');
const enemyImgs = [
    document.getElementById('enemy1'),
    document.getElementById('enemy2'),
    document.getElementById('enemy3')
];
const restartButton = document.getElementById('restart-button');
const gameOverMessage = document.getElementById('game-over-message');

// إخفاء المؤقت وعدد القتلى في البداية
const timerDisplay = document.getElementById('timer');
const killCountDisplay = document.getElementById('kill-count');

timerDisplay.style.display = 'none';
killCountDisplay.style.display = 'none';

// إظهار المؤقت وعدد القتلى بعد ثانيتين
setTimeout(() => {
    timerDisplay.style.display = 'block';
    killCountDisplay.style.display = 'block';
}, 2000);

let playerX;
let playerY;
let playerWidth;
let playerHeight;
let playerSpeed = 10;
let bullets = [];
let enemies = [];
let enemyBullets = [];
let killCount = 0; // عدد الأعداء المقتولين
let timer = 0;
let gameInterval;
let canShoot = true;
const shootInterval = 30;
let lastShootTime = 0;

const nonMovableMarginLeft = 68;
const nonMovableMarginRight = 30;
const sideMargin = 20;
const enemySpeed = 2;
const enemyShootInterval = 2000;
const enemyDropInterval = 10000;
const enemyRespawnInterval = 15000;
let lastEnemyShootTime = 0;
let lastEnemyDropTime = 0;
let lastEnemyRespawnTime = 0;

// متغير لتتبع وقت بدء اللعبة
let gameStartTime = Date.now();

// إضافة ملفات الصوت الخاصة بإطلاق النار وموت العدو
const shootSound = new Audio('music/shoot.wav');
const enemyDeathSound = new Audio('music/enemy-death.wav');

// Initialize the game
function setupGame() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    playerWidth = player.width;
    playerHeight = player.height;
    playerX = canvas.width / 2 - playerWidth / 2 + nonMovableMarginLeft - 30;
    playerY = canvas.height - playerHeight - 30;
    player.style.position = 'absolute';
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    resetEnemies();

    gameInterval = setInterval(updateGame, 1000 / 60);

    // Reset kill count and timer at the start of the game
    killCount = 0;
    updateKillCountDisplay();
    timer = 0;
}

// Update kill count display
function updateKillCountDisplay() {
    const killCountDisplay = document.getElementById('kill-count');
    if (killCountDisplay) {
        killCountDisplay.textContent = `Kills: ${killCount}`;
    }
}

// Reset enemies
function resetEnemies() {
    enemies = [];
    const enemyWidth = enemyImgs[0].width;
    const enemyHeight = enemyImgs[0].height;
    const numberOfEnemiesPerRow = Math.floor((canvas.width - nonMovableMarginLeft - nonMovableMarginRight) / (enemyWidth * 2));
    const numberOfRows = 3;

    const totalEnemiesWidth = numberOfEnemiesPerRow * enemyWidth * 2;
    const startX = (canvas.width - totalEnemiesWidth - nonMovableMarginRight) / 2 + nonMovableMarginLeft - 30;
    const startY = 50;

    for (let j = 0; j < numberOfRows; j++) {
        for (let i = 0; i < numberOfEnemiesPerRow; i++) {
            enemies.push({
                x: startX + i * enemyWidth * 2,
                y: startY + j * enemyHeight * 2,
                width: enemyWidth,
                height: enemyHeight,
                img: enemyImgs[Math.floor(Math.random() * enemyImgs.length)],
                dx: enemySpeed,
                canShoot: false
            });
        }
    }
}

// Update the game
function updateGame() {
    const currentTime = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    playerX = Math.max(nonMovableMarginLeft, Math.min(canvas.width - playerWidth - nonMovableMarginRight, playerX));
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    bullets.forEach((bullet, index) => {
        bullet.y -= 10;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });

    bullets.forEach(bullet => {
        ctx.fillStyle = '#f39c12';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    enemyBullets.forEach((bullet, index) => {
        bullet.y += 5;
        if (bullet.y > canvas.height) {
            enemyBullets.splice(index, 1);
        }
    });

    enemyBullets.forEach(bullet => {
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    enemies.forEach((enemy, index) => {
        enemy.x += enemy.dx;
        if (enemy.x + enemy.width > canvas.width - nonMovableMarginRight || enemy.x < nonMovableMarginLeft) {
            enemy.dx = -enemy.dx;
        }

        ctx.drawImage(enemy.img, enemy.x, enemy.y);

        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(index, 1);
                killCount++;
                updateKillCountDisplay();

                // تشغيل صوت موت العدو عند قتله
                enemyDeathSound.play();
            }
        });

        if (enemy.y + enemy.height > canvas.height - playerHeight) {
            gameOver();
        }
    });

    enemyBullets.forEach((bullet, bulletIndex) => {
        if (bullet.x < playerX + playerWidth &&
            bullet.x + bullet.width > playerX &&
            bullet.y < playerY + playerHeight &&
            bullet.y + bullet.height > playerY) {
            gameOver();
        }
    });

    if (Date.now() - lastEnemyDropTime > enemyDropInterval) {
        lastEnemyDropTime = Date.now();
        resetEnemies();
    }

    enemies.forEach(enemy => {
        if (Date.now() - lastEnemyShootTime > enemyShootInterval) {
            lastEnemyShootTime = Date.now();
            enemyBullets.push({
                x: enemy.x + enemy.width / 2,
                y: enemy.y + enemy.height,
                width: 5,
                height: 10
            });
        }
    });

    // ابدأ العد بعد مرور ثانيتين
    if (currentTime - gameStartTime > 2000) {
        timer += 1 / 60;
        const timerDisplay = document.getElementById('timer');
        if (timerDisplay) {
            timerDisplay.textContent = `Time: ${Math.floor(timer)}`;
        }
    }

    if (enemies.length === 0) {
        gameOver();
    }

    if (Date.now() - lastShootTime > shootInterval) {
        canShoot = true;
    }
}

// Handle keydown events for movement and shooting
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        playerX -= playerSpeed;
    } else if (e.key === 'ArrowRight') {
        playerX += playerSpeed;
    } else if (e.key === ' ') {
        if (canShoot) {
            bullets.push({
                x: playerX + playerWidth / 2 - 27,
                y: playerY - 10,
                width: 4,
                height: 10
            });
            
            // تشغيل صوت إطلاق النار عند الإطلاق
            shootSound.play();
            
            canShoot = false;
            lastShootTime = Date.now();
        }
    }
});

// Handle game restart
restartButton.addEventListener('click', () => {
    setupGame();
    restartButton.style.display = 'none';
    gameOverMessage.style.display = 'none';
});

// Handle game over
function gameOver() {
    clearInterval(gameInterval);
    restartButton.style.display = 'block';
    gameOverMessage.style.display = 'block';
}

// Start the game
setupGame();
