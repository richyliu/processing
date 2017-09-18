/**
 * Pipe that birds have to avoid
 */
window.Pipe = class {
    /**
     * Create a new pipe
     * @param  {Number} x        X position of pipe
     * @param  {Number} Y        Where the gap in the pipe is (top of gap)
     * @param  {Number} GAP      Size of the gap
     * @param  {Number} WIDTH    Width of the pipe
     * @param  {Number} HEIGHT   Height of the entire pipe
     * @param  {Number} MOVE_AMT How far to move on each frame
     */
    constructor(x, Y, GAP, WIDTH, HEIGHT, MOVE_AMT) {
        
        /**
         * Y position of pipe (left boundary of pipe)
         * @type {Number}
         */
        this.x = x;
        
        /**
         * Where the gap in the pipe is (top of gap)
         * @constant {Number}
         */
        this.Y = Y;
        /**
         * Size of the gap that birds have to go through
         * @constant {Number}
         */
        this.GAP = GAP;
        /**
         * Width of the pipe
         * @constant {Number}
         */
        this.WIDTH = WIDTH;
        /**
         * Height of the pipe
         * @constant {Number}
         */
        this.HEIGHT = HEIGHT;
        /**
         * How far to move the pipe on each frame
         * @type {Number}
         */
        this.MOVE_AMT = MOVE_AMT;
    }
    
    
    /**
     * Draws and move the pipe
     */
    draw() {
        this.x -= this.MOVE_AMT;
        
        p.fill('green');
        p.noStroke();
        p.rectMode(p.CORNERS);
        
        // top half
        p.rect(this.x, 0, this.x+this.WIDTH, this.Y);
        // bottom half
        p.rect(this.x, this.Y+this.GAP, this.x+this.WIDTH, this.HEIGHT);
    }
};