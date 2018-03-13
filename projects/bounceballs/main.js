const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 600;

let x = 0;
let y = 0;
let balls = [];


function preload () {
    
}



function setup () {
    let canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas.parent('output');
    colorMode(HSB, 1, 1, 1, 1);
    textSize(20);
}


function draw () {
    background('yellow');

    // draw button
    fill('blue');
    rect(0, 0, 100, 50);
    fill('white');
    text('Clear', 20, 30);

    // draw balls
    balls.forEach(ball => ball.draw());
}


function mouseClicked () {
    let x = mouseX;
    let y = mouseY;
    if (0 > x || x > SCREEN_WIDTH || 0 > y || y > SCREEN_HEIGHT) return;

    if (0 < x && x < 100 && 0 < y && y < 50) {
        balls = [];
    } else {
        balls.push(new Ball(x, y));
    }
}
