class Paddle extends Moveable {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 20,
            height: 100,
            color: 'blue'
        });
    }


    /**
     * Moves the paddle given the y position of the mouse relative to the center of the paddle
     *
     * @override
     * @param {number} y Position of the mouse
     */
    move(y) {
        y -= 50;
        if (y < 0) y = 0;
        else if (y > SCREEN_HEIGHT-100) y = SCREEN_HEIGHT-100;
        
        this.y = y;
    }
}
