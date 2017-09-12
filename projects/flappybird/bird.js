/**
 * Bird that flies in the world
 */
window.Bird = class {
    /**
     * Create a bird
     * @param  {Number} x X position to draw bird
     * @param  {Number} y Starting y position
     */
    constructor(x, y) {
        /**
         * Y position of bird
         * @type {Number}
         */
        this.y = y;
        /**
         * How fast the bird is moving up
         * @type {Number}
         */
        this.dy = -3;
        
        /**
         * X position of bird
         * @constant {Number}
         */
        this.X = x;
        /**
         * Size of the bird
         * @type {Number}
         */
        this.SIZE = 40;
        /**
         * How much dy changes by each frame (positive is down, negative is up)
         * @type {Number}
         */
        this.GRAVITY = 0.2;
    }
    
    
    /**
     * Draws the bird and updates its y position
     */
    draw() {
        p.fill('yellow');
        p.noStroke();
        p.ellipse(this.X, this.y, this.SIZE);
        
        this.dy += this.GRAVITY;
        this.y += this.dy;
    }
    
    
    /**
     * Makes the bird jump
     * @param  {Number} [jumpAmt=-5] How much to jump by
     */
    jump(jumpAmt=-5) {
        this.dy = jumpAmt;
    }
};