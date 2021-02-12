const canvas = document.getElementById("canvas")
const canavs  = document.getElementById("the-btn")
const ctx = canvas.getContext("2d")

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
//pour la vittesse
speed = 7;
// pour la taille du serpent

tileCount = 20;
tileSize = canvas.width / tileCount - 2;

//pour la tete du serpent
headX = 10;
headY = 10;

// pour ladirection du snake
xVelocity = 0;
yVelocity= 0;

// pour la nouristuure du serpent 
pommeX = 5
pommeY = 5;
// pour la queue du serpent
const snakeParts = [];
let tailLengh = 2

let score = 0

let isPaused = false


// boucle du jeux
function drawGame(){
    clearScreen();
    changeSnakePosition();


    let resultat = verificationDuGameOver();
    if(resultat){
        return;
    }
    verifierLaColision()
    drawPomme();
    drawSnake();
    verifierLeScore()
    if(score > 3 ){
        speed = 15;
    }
    if(score > 5 ){
        speed = 20;
    }
    
    setTimeout(drawGame, 1000/7)
}


function pauseGame(){
clearInterval(clearInterval)
isPaused = true;

ctx.fillText("Gamee Paused", 400, 250);
}


function déposeGame(){
    isPaused = false;
    ctx.clearRect(0,0, canvas.width, canvas.height)
    canvas.style.opacity = 1
}



function verificationDuGameOver() {
    let gameOver = false;

if(yVelocity == 0 && xVelocity === 0){
    return false
}



    if (headX < 0 ) {
        gameOver = true;
    }
    else if (headX === tileCount) {
        gameOver = true 
    } else if ( headY < 0){
        gameOver = true;
    } else if (headY === tileCount){
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y == headY){
            gameOver = true;
            break;
        }
    }
    if (gameOver) {
        ctx.fillStyle = "white"
        ctx.font = "40px Verdana";

        ctx.fillText("Game Over !!!!!!!!", canvas.width / 9.5, canvas.height / 1.5)
        ctx.fillStyle = "red"
        ctx.fillText("Tu a perdu !!!!!!!!", canvas.width / 9.5, canvas.height / 2)
        ctx.fillStyle = "white"
 
            
        }
    return gameOver;
}





function verifierLeScore(){
    ctx.fillStyle = "white"
    ctx.font = "10px Verdana"
    ctx.fillText("Ton score est de : " + score, canvas.width-400, 20)

}

function clearScreen(){ 
    ctx.fillStyle = "grey"
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height)

}


// dessin du serpent
function drawSnake( ){
   

    ctx.fillStyle = 'yellow'
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    } 

    snakeParts.push(new SnakePart(headX, headY)); 
    while(snakeParts.length > tailLengh){
        snakeParts.shift();
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize, tileSize)

}

function drawPomme(){
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(pommeX* tileCount, pommeY* tileCount, tileSize, tileSize )

}
// change la position de la pomme 
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
function verifierLaColision(){
    if(pommeX ===  headX && pommeY === headY){
        pommeX = Math.floor(Math.random() * tileCount) ;
        pommeY = Math.floor(Math.random() * tileCount);
        tailLengh++;
        score++;
    }
}
   
document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    // pour aller en haut
    if(event.keyCode == 38){
        event.preventDefault()
        if (yVelocity == 1) {
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }
    // pour aller en bas
    if(event.keyCode == 40) {
        event.preventDefault()
        if (yVelocity == -1) {
            return
        }
        yVelocity = 1;
        xVelocity = 0;
    }
    // a gauche 
    if(event.keyCode  == 37) {
        event.preventDefault()
        if (xVelocity == 1) {
            return
        }
        yVelocity = 0;
        xVelocity = -1;
    }
    // a droite
    if(event.keyCode  == 39) {
        event.preventDefault()
        if (xVelocity == -1) {
            return
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}


drawGame()






