const blockSize = 25;
const rows = 20;
const cols = 20;
const play = document.getElementById('game_board') as HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;
let snakeX = blockSize * 10;
let snakeY = blockSize * 10;
let speedX = 0;
let speedY = 0;
let snakeGrow: [number, number][] = [];
let foodX: number;
let foodY: number;
let score = 0;
let highScore = localStorage.getItem('highScore') || '0';
let timeElapsed = 0;
let gameOver = false;

window.onload = function () {
    if (play !== null) {
        play.style.overflow = 'hidden';
        play.height = rows * blockSize;
        play.width = cols * blockSize;
        context = play.getContext('2d');
    }

    const backAudio = new Audio('./assets/15326_1460400695.mp3');
    backAudio.loop = true;
    backAudio.volume = 0.1;
    backAudio.play();

    placeFood();
    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000 / 10);
};

function update() {
    timeElapsed += 1;
    if (gameOver) {
        return;
    }

    if (context) {
        context.fillStyle = 'rgb(221, 190, 103)';
        context.fillRect(0, 0, play.width, play.height);
    }

    // Rest of the update function remains the same.
    // ...

    displayTimer();
    didSnakeCollide();
}

function didSnakeCollide() {
    for (let i = 1; i < snakeGrow.length; i++) {
        if (snakeGrow[i][0] === snakeGrow[0][0] && snakeGrow[i][1] === snakeGrow[0][1]) {
            gameOver = true;
            const deadSound = new Audio('./assets/17913_1464199839.mp3');
            deadSound.play();
            setTimeout(function () {
                const dead = confirm('Game Over, you bit your tail!');
                if (dead) {
                    window.location.reload();
                }
            }, 1000);
        }
    }
}

function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function displayTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        const formattedTime = formatTime(timeElapsed);
        timerElement.innerText = `Time: ${formattedTime}`;
    }
}

function changeDirection(e: KeyboardEvent) {
    if (e.code === 'ArrowUp') {
        speedX = 0;
        speedY = -1;
    } else if (e.code === 'ArrowDown') {
        speedX = 0;
        speedY = 1;
    } else if (e.code === 'ArrowLeft') {
        speedX = -1;
        speedY = 0;
    } else if (e.code === 'ArrowRight') {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}