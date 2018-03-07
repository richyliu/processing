const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 600;

let x = 0;
let y = 0;
let balls = [];


p.preload = () => {
    
};



p.setup = () => {
    p.createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    p.colorMode(p.HSB, 1, 1, 1, 1);
};


p.draw = () => {
    p.background('yellow');
    balls.forEach(ball => ball.draw());
};


p.mouseClicked = () => {
    balls.push(new Ball(p.mouseX, p.mouseY));
}