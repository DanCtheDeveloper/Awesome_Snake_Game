// draw the board using JavaScript:
let blockSize = 25
let rows =20
let cols = 20
let play;
let context;

//Head of the Snake: 
let snakeX = blockSize * 10
let snakeY = blockSize * 10
let speedX = 0;
let speedY = 0;

//Code to Grow the snake body:
let snakeGrow = []

//Food Square:

let foodX 
let foodY

let score = 0
//Add High Score:
let highScore = localStorage.getItem('highScore') || 0

let timeElapsed = 0

//"Game Over":
let gameOver = false

window.onload = function() {
    play = document.getElementById("game_board")
    play.height = rows * blockSize
    play.width = cols * blockSize
    context = play.getContext("2d")
    
    let backAudio = new Audio('./assets/15326_1460400695.mp3')
    backAudio.loop = true;
    backAudio.volume = 0.1
    backAudio.play()

    //code for placing the food:
    placeFood()
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1000/10)
}

    //code for drawing and re-drawing game_board, snake, and food characteristics:
function update() {

    //setting up the timer:
    timeElapsed += 1

    //Telling the game to stop when Game Over:
    if(gameOver) {
        return
    }
    //Game Board:
    context.fillStyle="rgb(221, 190, 103)"
    context.fillRect(0, 0, play.width, play.height)  
    //Food:
    context.fillStyle="rgb(241, 134, 10)"
    context.fillRect(foodX, foodY, blockSize, blockSize)
    context.strokeStyle="black"
    context.strokeRect(foodX, foodY, blockSize -1, blockSize -1)

 //code for making the snake eat the food:
 if (snakeX === foodX && snakeY === foodY){
    let snakeEat = new Audio('./assets/14423_1460034386.mp3')
    snakeEat.play()
    //code for growing the snake:
    snakeGrow.push([foodX, foodY])
    placeFood()
    score +=10
    if (score > highScore) highScore = score;
    }

    context.font = "20px arial"
    context.fillText("Score:" + score + "           High Score:" + highScore,  20, 20)
    //Saving High Score in local storage:
    localStorage.setItem('highScore', highScore);
    
    //For-let statement to move the body with the head:
    for (let i = snakeGrow.length-1; i > 0; i--){
        snakeGrow[i] = snakeGrow[i-1]
    }
    if (snakeGrow.length) {
        snakeGrow[0] = [snakeX, snakeY]
    }

    //Snake Styling:
    context.fillStyle="rgb(108, 173, 43)"
    snakeX += speedX * blockSize
    snakeY += speedY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    context.strokeStyle="black"
    context.strokeRect(snakeX, snakeY, blockSize -1, blockSize -1)
     //For-Let statement to change the food green when eaten:
     for (let i=0; i<snakeGrow.length; i++) {
        context.fillRect(snakeGrow[i][0], snakeGrow[i][1], blockSize, blockSize)
    }

    // Bumping the wall - "Game Over":
    if(snakeX < 0 || snakeX > cols*blockSize -1 || snakeY < 0 || snakeY > rows*blockSize -1){
        gameOver = true
        let deadSound = new Audio('./assets/17913_1464199839.mp3')
        deadSound.play()
        setTimeout(function() {
            let wall = confirm("Game Over, you ran off the edge!")
            if (wall = true){
                window.location.reload()
            } 
          }, 1000)       
    }
    displayTimer()
    didSnakeCollide()
}

        //if the snake runs into itself - "Game Over":
function didSnakeCollide() {
    for (let i = 1; i < snakeGrow.length; i++) 
        if (snakeGrow[i][0] === snakeGrow[0][0] && snakeGrow[i][1] === snakeGrow[0][1]) {
            gameOver = true
            let deadSound = new Audio('./assets/17913_1464199839.mp3')
            deadSound.play()
        setTimeout(function() {
                let dead = confirm("Game Over, you bit your tail!")
                if (dead = true){
                window.location.reload()
                }
            }, 1000)
        }
    }

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
              
function displayTimer() {
    const timerElement = document.getElementById('timer');
    const formattedTime = formatTime(timeElapsed);
    timerElement.innerText = `Time: ${formattedTime}`;
    }      

    //code for directions/movement:
function changeDirection(e){
    if (e.code === "ArrowUp") {
        speedX = 0
        speedY = -1
    }
    else if (e.code === "ArrowDown") {
        speedX = 0
        speedY = 1
    }
    else if (e.code === "ArrowLeft") {
        speedX = -1
        speedY = 0
    }
    else if (e.code === "ArrowRight") {
        speedX = 1
        speedY = 0
    }
}

//put food in a random place:
function placeFood() {
    foodX = Math.floor(Math.random() * cols) *blockSize
    foodY = Math.floor(Math.random() * rows) *blockSize
}
