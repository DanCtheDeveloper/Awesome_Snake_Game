
// draw the board using JavaScript
let blockSize = 25
let rows =20
let cols = 20
let play;
let context;

//Head of the Snake 
let snakeX = blockSize * 10
let snakeY = blockSize * 10
let speedX = 0;
let speedY = 0;

//Code to Grow the snake body:
let snakeGrow = []

//Food Square

let foodX 
let foodY

let score = 0

let timeElapsed = 0

//"Game Over"
let gameOver = false

window.onload = function() {
    play = document.getElementById("game_board")
    play.height = rows * blockSize
    play.width = cols * blockSize
    context = play.getContext("2d")


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

    context.fillStyle="rgb(221, 190, 103)"
    context.fillRect(0, 0, play.width, play.height)  

    context.fillStyle="rgb(241, 134, 10)"
    context.fillRect(foodX, foodY, blockSize, blockSize)


 //code for making the snake eat the food:
 if (snakeX === foodX && snakeY === foodY){
    //code for growing the snake
    snakeGrow.push([foodX, foodY])
    placeFood()
    score +=10
    }

    context.fillText("Score:" + score, 20, 20)
    
    //For-let statement to move the body with the head:
    for (let i = snakeGrow.length-1; i > 0; i--){
        snakeGrow[i] = snakeGrow[i-1]
    }
    if (snakeGrow.length) {
        snakeGrow[0] = [snakeX, snakeY]
    }

    
    context.fillStyle="rgb(108, 173, 43)"
    snakeX += speedX * blockSize
    snakeY += speedY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
     //For-Let statement to change the food green when eaten:
     for (let i=0; i<snakeGrow.length; i++) {
        context.fillRect(snakeGrow[i][0], snakeGrow[i][1], blockSize, blockSize)
    }

   

    
    // Bumping the wall - "Game Over":
    if(snakeX < 0 || snakeX > cols*blockSize -1 || snakeY < 0 || snakeY > rows*blockSize -1){
        gameOver = true
        let wall = confirm("Game Over, you ran into the wall")
            if (wall = true){
                window.location.reload()

               
            }
    }
    displayTimer()
    didSnakeCollide()
}

        //if the snake runs into itself
        function didSnakeCollide() {
            for (let i = 1; i < snakeGrow.length; i++) 
            if (snakeGrow[i][0] === snakeGrow[0][0] && snakeGrow[i][1] === snakeGrow[0][1]) {
                gameOver = true
                    console.log("Snake Bit Himself", snakeGrow)
                    let dead = confirm("Game Over, you bit your tail!")
                    if (dead = true){
                    window.location.reload()
                    }
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















// // event listener for start of page//

// //event listeners for directions when arrow keys are pressed//

// const nS = newSnake(100, 110)

// // Create a non-playable character
// const nF = newFood(15, 15)

// // have the NPC start walking east immediately
// // async function moveNS(){
// //     await nS.walkNorth(1400)
// //     await nS.walkEast(1200)
// //     await nS.walkSouth(300)
// //     await nS.walkEast(1500)
// //     await nS.walkSouth(1500)
// //     await nS.walkWest(2700)
// //     await nS.walkNorth(400)
// // }

// function newSnake(x, y) {
//     const element = newImage('')
//     element.style.zIndex = 1;

//     function handleDirectionChange(direction) {
//         if (direction === null) {
//             element.src = `assets/green-character/static.gif`
//         }
//         if (direction === 'west') {
//             element.src = `assets/green-character/west.gif`
//         }
//         if (direction === 'north') {
//             element.src = `assets/green-character/north.gif`
//         }
//         if (direction === 'east') {
//             element.src = `assets/green-character/east.gif`
//         }
//         if (direction === 'south') {
//             element.src = `assets/green-character/south.gif`
//         }
//     }

//     move(element).withArrowKeys(x, y, handleDirectionChange)

//     return {
//         element: element
//     }
// }

// // move commands
// function move(element) {
//     element.style.position = 'fixed'

//     function moveToCoordinates(left, bottom) {
//         element.style.left = left + 'px'
//         element.style.bottom = bottom + 'px'
//     }

//     function moveWithArrowKeys(left, bottom, callback){
//         let direction = null;
//         let x = left;
//         let y = bottom;

//         element.style.left = x + 'px'
//         element.style.bottom = y + 'px'
        
//         function moveCharacter(){ 
//             if(direction === 'west'){
//                 x-=1
//             }
//             if(direction === 'north'){
//                 y+=1
//             }
//             if(direction === 'east'){
//                 x+=1
//             }
//             if(direction === 'south'){
//                 y-=1
//             }
//             element.style.left = x + 'px'
//             element.style.bottom = y + 'px'
//         }
        
//         setInterval(moveCharacter, 1)
        
//         document.addEventListener('keydown', function(e){
//             if(e.repeat) return;
        
//             if(e.key === 'ArrowLeft'){
//                 direction = 'west'
//             }
//             if(e.key === 'ArrowUp'){
//                 direction = 'north'
//             }
//             if(e.key === 'ArrowRight'){
//                 direction = 'east'
//             }
//             if(e.key === 'ArrowDown'){
//                 direction = 'south'
//             }
//             callback(direction)
//         })
        
//         document.addEventListener('keyup', function(e){
//             direction = null
//             callback(direction)
//         })
//     }

//     return {
//         to: moveToCoordinates,
//         withArrowKeys: moveWithArrowKeys
//     }
// }

// // Collision Detection

// //game over conditions

// //event listeners for score ?//
