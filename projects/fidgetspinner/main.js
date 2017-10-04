window.mainCode = () => {
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
    
    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT);
        p.rectMode(p.CORNER);
        p.frameRate(60);
        
        p.ellipseMode(p.RADIUS);
        newSpinner();
        
        // draw stop button
        p.fill('red');
        p.stroke('black');
        p.strokeWeight(3);
        p.rect(5, 5, 100, 50);
        p.fill('white');
        p.noStroke();
        p.textSize(32);
        p.text('STOP', 10, 40);
        
        // draw text at top
        p.fill('black');
        p.textSize(20);
        p.text('CLICK ANYWHERE TO SPIN', 120, 40);
        
        // draw new button
        p.fill('green');
        p.stroke('black');
        p.strokeWeight(3);
        p.rect(395, 5, 100, 50);
        p.fill('white');
        p.noStroke();
        p.textSize(32);
        p.text('NEW', 405, 40);
    };
    
    
    
    p.draw = () => {
        p.fill('white');
        p.rect(0, 60, WIDTH, HEIGHT);
        
        // move spinner
        angle += angularVelocity;
        // angle = angle % p.TWO_PI;
        if (angularVelocity > 0) {
            angularVelocity -= FRICTION;
        } else if (angularVelocity < 0) {
            angularVelocity = 0;
        }
        
        // set center to 0,0
        p.translate(centerX, centerY);
        
        // draw arms
        for (let ang = 0; ang < 2*p.PI; ang += 2/3*p.PI) {
            drawArm(angle + ang);
        }
        
        // draw spinner (center portion)
        p.fill(colors.body);
        p.noStroke();
        p.ellipse(0, 0, centerR);
        
        p.fill(colors.yellow);
        p.noStroke();
        p.ellipse(0, 0, centerR*0.5);
        
        p.fill(colors.yellow);
        p.stroke(colors.yellowStroke);
        p.strokeWeight(3);
        p.ellipse(0, 0, centerR*0.4);
        
        // draw holes to make spinner rounder (gaps inbetween arms)
        for (let ang = angle+1/3*p.PI; ang < angle+p.TWO_PI; ang += 2/3*p.PI) {
            p.fill('white');
            p.noStroke();
            let dist = armDist*1;
            let size = armR*1;
            let diff = p.PI*0.33;
            
            p.arc(Math.cos(ang)*dist, Math.sin(ang)*dist, size, size, ang-diff+p.PI, ang+diff+p.PI);
        }
    };
    
    
    /**
     * Draws are with angle offset relative to current angle
     * @param  {Number} offset Angle offset from current class angle var
     */
    function drawArm(offset) {
        // draw arm connector
        p.push();
        p.fill(colors.body);
        p.noStroke();
        p.rotate(offset+p.HALF_PI);
        p.rect(-armR*0.85, -armDist, 2*armR*0.85, armDist);
        p.pop();
        
        
        p.push();
        // set arm center as new 0,0
        p.translate(Math.cos(offset) * armDist, Math.sin(offset) * armDist);
        
        // draw end of arm go from out to in
        p.fill(colors.body);
        p.noStroke();
        p.ellipse(0, 0, armR);
        
        p.fill(colors.outerBlue);
        p.noStroke();
        p.ellipse(0, 0, armR*0.57);
        
        p.fill(colors.outerBlue);
        p.stroke(colors.outerStroke);
        p.strokeWeight(2);
        p.ellipse(0, 0, armR*0.5);
        
        p.fill(colors.innerBlue);
        p.stroke(colors.innerStroke);
        p.strokeWeight(3);
        p.ellipse(0, 0, armR*0.2);
        
        p.pop();
    }
    
    
    p.mousePressed = () => {
        if (p.mouseX > 5 && p.mouseX < 100 && p.mouseY > 5 && p.mouseY < 50) {
            angularVelocity = 0;
        } else if (p.mouseX > 395 && p.mouseX < 500 && p.mouseY > 5 && p.mouseY < 50) {
            newSpinner();
        } else {
            // spin the spinner
            angularVelocity += SPIN_SPEED;
            
            if (angularVelocity > 1) {
                angularVelocity = 1;
            }
        }
    };
    
    
    function newSpinner() {
        let rand1 = Math.floor(p.random() * 360);
        let rand2 = Math.floor(p.random() * 360);
        colors = {
            yellow: p.color(`hsb(${rand1}, 80%, 100%)`),
            yellowStroke: p.color(`hsb(${rand1}, 80%, 80%)`),
            body: p.color(`hsb(${rand2}, 80%, 40%)`),
            outerBlue: p.color(`hsb(${rand2}, 60%, 100%)`),
            outerStroke: p.color(`hsb(${rand2}, 60%, 80%)`),
            innerBlue: p.color(`hsb(${rand2}, 70%, 100%)`),
            innerStroke: p.color(`hsb(${rand2}, 70%, 70%)`),
            // yellow: p.color(254, 222, 0),
            // yellowStroke: p.color(230, 198, 0),
            // body: p.color(0, 102, 104),
            // outerBlue: p.color(0, 210, 193),
            // outerStroke: p.color(0, 183, 162),
            // innerBlue: p.color(0, 201, 175),
            // innerStroke: p.color(0, 157, 133)
        };
    }
};