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
}


function draw () {
    background('yellow');
    balls.forEach(ball => ball.draw());
}


function mouseClicked () {
    balls.push(new Ball(mouseX, mouseY));
}
