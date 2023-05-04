
// draw the board using JavaScript
var blockSize = 25
var rows =20
var cols = 20
var play;
var context;

//Head of the Snake 
var snakeX = blockSize * 10
var snakeY = blockSize * 10

//Food Square
var foodX 
var foodY

window.onload = function() {
    play = document.getElementById("game_board")
    play.height = rows * blockSize
    play.width = cols * blockSize
    context = play.getContext("2d")

    placeFood()
    document.addEventListener("keyup", changeDirection)
    update() 
}

function update() {
    context.fillStyle="rgb(221, 190, 103)"
    context.fillRect(0, 0, play.width, play.height)  
    
    context.fillStyle="rgb(108, 173, 43)"
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    context.fillStyle="rgb(241, 134, 10)"
    context.fillRect(foodX, foodY, blockSize, blockSize)
}


function changeDirection(e){
    if (e.code == "ArrowUp") {

    }
}


//put food in a random place

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
