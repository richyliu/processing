let paddle;
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
    textSize(20);

    paddle = new Paddle(20, 0);
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
    }
    if (collideLineCircle(0, 0, SCREEN_WIDTH, 0, ball.x, ball.y, ball.radius)) {
        ball.bounce(PI*1.5); 
    }
    if (collideLineCircle(0, 0, 0, SCREEN_HEIGHT, ball.x, ball.y, ball.radius)) {
        ball.bounce(PI); 
    }
    if (collideLineCircle(SCREEN_WIDTH, 0, SCREEN_WIDTH, SCREEN_HEIGHT, ball.x, ball.y, ball.radius)) {
        ball.bounce(0); 
    }
    if (collideLineCircle(0, SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT, ball.x, ball.y, ball.radius)) {
        ball.bounce(HALF_PI); 
    }

    // check out
    if (ball.x < paddle.x) {
        respawnPopup();
        ball.moves = false;
    }

    // draw and move objects
    paddle.move(mouseY);
    paddle.draw();
    ball.move();
    ball.draw();

    // draw mouse positions
    fill('yellow');
    rect(450, 0, 150, 50);
    fill('blue');
    text(mouseX, 460, 25);
    text(mouseY, 530, 25);

    // draw countdown timer
    if (countdown == 3 || countdown == 2 || countdown == 1) {
        console.log(countdown);
        waitFrame++;
        if (waitFrame == 60) {
            text(countdown, 300, 300);
            countdown--;
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


function respawnPopup() {
    fill('white');
    rect(200, 250, 200, 100);
    fill('blue');
    text('Restart', 260, 310);

    respawnWait = true;
}

function respawn() {
    ball = new Ball(200, 100, PI);
    ball.moves = false;
    countdown = 3;
}
