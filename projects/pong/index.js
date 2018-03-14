let paddleY = 0;
let paddle;

function setup () {
    let canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas.parent('output');
    paddle  = new Paddle();
}


function draw () {
    background(0);
    
    paddle.move(mouseY);
    paddle.draw();
}

