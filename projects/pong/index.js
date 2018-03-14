const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 600;


let paddleY = 0;


function setup () {
    let canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas.parent('output');
}


function draw () {
    background(0);
    
    // draw paddle
    fill('blue');
    y = mouseY - 50;
    if (y < 0) y = 0;
    else if (y > SCREEN_HEIGHT-100) y = SCREEN_HEIGHT-100;
    rect(10, y, 20, 100);
}

