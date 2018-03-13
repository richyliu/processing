/**
 * Width of the screen
 * @const {Number}
 */
const WIDTH = 500;
/**
 * Height of the screen
 * @const {Number}
 */
const HEIGHT = 500;

let spinner;

const centerX = WIDTH/2;
const centerY = HEIGHT*0.6;
const size = 480;
let angle = 0;
let angularVelocity = 0;
const FRICTION = 0.002;
const SPIN_SPEED = 0.6;

const centerR = 60;
const armR = 60;
const armDist = 120;
let colors;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    rectMode(CORNER);
    frameRate(60);
    
    ellipseMode(RADIUS);
    newSpinner();
    
    // draw stop button
    fill('red');
    stroke('black');
    strokeWeight(3);
    rect(5, 5, 100, 50);
    fill('white');
    noStroke();
    textSize(32);
    text('STOP', 10, 40);
    
    // draw text at top
    fill('black');
    textSize(20);
    text('CLICK ANYWHERE TO SPIN', 120, 40);
    
    // draw new button
    fill('green');
    stroke('black');
    strokeWeight(3);
    rect(395, 5, 100, 50);
    fill('white');
    noStroke();
    textSize(32);
    text('NEW', 405, 40);
}



function draw() {
    fill('white');
    rect(0, 60, WIDTH, HEIGHT);
    
    // move spinner
    angle += angularVelocity;
    // angle = angle % TWO_PI;
    if (angularVelocity > 0) {
        angularVelocity -= FRICTION;
    } else if (angularVelocity < 0) {
        angularVelocity = 0;
    }
    
    // set center to 0,0
    translate(centerX, centerY);
    
    // draw arms
    for (let ang = 0; ang < 2*PI; ang += 2/3*PI) {
        drawArm(angle + ang);
    }
    
    // draw spinner (center portion)
    fill(colors.body);
    noStroke();
    ellipse(0, 0, centerR);
    
    fill(colors.yellow);
    noStroke();
    ellipse(0, 0, centerR*0.5);
    
    fill(colors.yellow);
    stroke(colors.yellowStroke);
    strokeWeight(3);
    ellipse(0, 0, centerR*0.4);
    
    // draw holes to make spinner rounder (gaps inbetween arms)
    for (let ang = angle+1/3*PI; ang < angle+TWO_PI; ang += 2/3*PI) {
        fill('white');
        noStroke();
        let dist = armDist*1;
        let size = armR*1;
        let diff = PI*0.33;
        
        arc(Math.cos(ang)*dist, Math.sin(ang)*dist, size, size, ang-diff+PI, ang+diff+PI);
    }
}


/**
 * Draws are with angle offset relative to current angle
 * @param  {Number} offset Angle offset from current class angle var
 */
function drawArm(offset) {
    // draw arm connector
    push();
    fill(colors.body);
    noStroke();
    rotate(offset+HALF_PI);
    rect(-armR*0.85, -armDist, 2*armR*0.85, armDist);
    pop();
    
    
    push();
    // set arm center as new 0,0
    translate(Math.cos(offset) * armDist, Math.sin(offset) * armDist);
    
    // draw end of arm go from out to in
    fill(colors.body);
    noStroke();
    ellipse(0, 0, armR);
    
    fill(colors.outerBlue);
    noStroke();
    ellipse(0, 0, armR*0.57);
    
    fill(colors.outerBlue);
    stroke(colors.outerStroke);
    strokeWeight(2);
    ellipse(0, 0, armR*0.5);
    
    fill(colors.innerBlue);
    stroke(colors.innerStroke);
    strokeWeight(3);
    ellipse(0, 0, armR*0.2);
    
    pop();
}


function mousePressed() {
    if (mouseX > 5 && mouseX < 100 && mouseY > 5 && mouseY < 50) {
        angularVelocity = 0;
    } else if (mouseX > 395 && mouseX < 500 && mouseY > 5 && mouseY < 50) {
        newSpinner();
    } else {
        // spin the spinner
        angularVelocity += SPIN_SPEED;
        
        if (angularVelocity > 1) {
            angularVelocity = 1;
        }
    }
}


function newSpinner() {
    let rand1 = Math.floor(random() * 360);
    let rand2 = Math.floor(random() * 360);
    colors = {
        yellow: color(`hsb(${rand1}, 80%, 100%)`),
        yellowStroke: color(`hsb(${rand1}, 80%, 80%)`),
        body: color(`hsb(${rand2}, 80%, 40%)`),
        outerBlue: color(`hsb(${rand2}, 60%, 100%)`),
        outerStroke: color(`hsb(${rand2}, 60%, 80%)`),
        innerBlue: color(`hsb(${rand2}, 70%, 100%)`),
        innerStroke: color(`hsb(${rand2}, 70%, 70%)`),
        // yellow: color(254, 222, 0),
        // yellowStroke: color(230, 198, 0),
        // body: color(0, 102, 104),
        // outerBlue: color(0, 210, 193),
        // outerStroke: color(0, 183, 162),
        // innerBlue: color(0, 201, 175),
        // innerStroke: color(0, 157, 133)
    };
}
