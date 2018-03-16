class Ball extends Moveable {
    constructor(x, y, direction) {
        super(x, y, 20, 'white', true, direction, 5);
    }


    /**
     * Bounces the ball against an object
     * 
     * @param {number} direction The object is relative to the ball in radians
     */
    bounce(direction) {
        this.direction = 2*direction - this.direction + PI + random(0.1);
        this.direction %= TWO_PI;
        this.speed += 0.1;
    }
}
