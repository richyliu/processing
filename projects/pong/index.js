let paddle;
let compPaddle;
let ball;
// waiting for the user to respond after dying
let respawnWait = false;
// 3, 2, or 1 when counting down
let countdown = -1;
// used for counting 60 frames for countdown
let waitFrame = 0;

function setup () {
    let canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas.parent('output');
    frameRate(60);
    textSize(20);
    textAlign(CENTER, CENTER);

    paddle = new Paddle(20, 0);
    compPaddle = new Paddle(SCREEN_WIDTH-20, 0);
    respawn();
}


/**
 * Draws everything onscreen
 */
function draw () {
    background(0);
    
    // check collision
    if (collideRectCircle(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y, ball.radius)) {
        ball.bounce(PI);
    } else if (collideRectCircle(compPaddle.x, compPaddle.y, compPaddle.width, compPaddle.height, ball.x, ball.y, ball.radius)) {
        ball.bounce(0);
    } else if (collideLineCircle(0, 0, SCREEN_WIDTH, 0, ball.x, ball.y, ball.radius)) {
        ball.bounce(PI*1.5); 
    } else if (collideLineCircle(0, 0, 0, SCREEN_HEIGHT, ball.x, ball.y, ball.radius)) {
        ball.bounce(PI); 
    } else if (collideLineCircle(SCREEN_WIDTH, 0, SCREEN_WIDTH, SCREEN_HEIGHT, ball.x, ball.y, ball.radius)) {
        ball.bounce(0); 
    } else if (collideLineCircle(0, SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT, ball.x, ball.y, ball.radius)) {
        ball.bounce(HALF_PI); 
    }

    // ball out of bounds
    if (ball.x < paddle.x) {
        respawnPopup();
        ball.moves = false;
    } else if (ball.x > compPaddle.x) {
        respawnPopup();
        ball.moves = false;
    }

    // draw and move objects
    paddle.move(mouseY);
    paddle.draw();
    ball.move();
    ball.draw();
    compPaddle.draw();
    compPaddle.move(mouseX);

    // draw mouse positions
    fill('yellow');
    rect(450, 0, 150, 50);
    fill('blue');
    text(mouseX, 450, 0, 75, 50);
    text(mouseY, 525, 0, 75, 50);

    // draw countdown timer
    if (countdown == 3 || countdown == 2 || countdown == 1) {
        fill('white');
        rect(275, 275, 50, 50);
        fill('blue');
        text(countdown, 275, 275, 50, 50);
        
        waitFrame++;
        if (waitFrame > 60) {
            countdown--;
            waitFrame = 0;
        }
    } else if (countdown === 0) {
        ball.moves = true;
    }
}


function mouseClicked() {
    if (respawnWait && mouseX > 200 && mouseX < 400 && mouseY > 250 && mouseY < 350) {
        respawn(); 
    }
}


/**
 * The player has died (ball touched either side)
 * 
 * @param {string} text To display on death
 */
function respawnPopup(text) {
    fill('white');
    rect(200, 250, 200, 100);
    fill('blue');
    text('Restart', 200, 250, 200, 100);

    respawnWait = true;
}

/**
 * Respawn the player by starting the countdown. Game actually starts after the countdown ends.
 */
function respawn() {
    ball = new Ball(200, 300, random(PI*0.75, PI*1.25));
    ball.moves = false;
    countdown = 3;
}
