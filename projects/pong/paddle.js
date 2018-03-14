class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 100;

    }


    draw() {
        rect(this.x, this.y, this.width, this.height);
    }
    
    
    move(y) {
        y -= 50;
        if (y < 0) y = 0;
        else if (y > SCREEN_HEIGHT-100) y = SCREEN_HEIGHT-100;
        
        this.y = y;
    }
}
