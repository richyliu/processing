class Ball {
    constructor(x, y, direction, size, speed) {
        this.x = x;
        this.y = y;
        this.direction = direction || random(2*Math.PI);
        this.size = size || 40;
        this.speed = speed || 2;
        this.age = 1;
        this.color = color(random(), 1, 1, 1);
    }

    draw() {
        if (this.age > 0) {
            this.color.setAlpha(this.age);
            fill(this.color);
            noStroke();
            
            this.age -= 0.005;

            ellipse(this.x, this.y, this.size, this.size);
            this.x += this.speed * Math.cos(this.direction);
            this.y += this.speed * Math.sin(this.direction);
            
            if (this.x > SCREEN_WIDTH) {
                this.x = SCREEN_WIDTH;
                this.direction += Math.PI;
            } else if (this.x < 0) {
                this.x = 0;
                this.direction += Math.PI;
            }
            if (this.y > SCREEN_HEIGHT) {
                this.y = SCREEN_HEIGHT;
                this.direction += Math.PI;
            } else if (this.y < 0) {
                this.y = 0;
                this.direction += Math.PI;
            }
        }
        
    }
}
