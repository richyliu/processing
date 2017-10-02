/**
 * Bird that flies in the world
 */
window.Bird = class {
    /**
     * Create a bird or breed one from parents
     * @param  {Number} x           X position to draw bird
     * @param  {Number} y           Starting y position
     * @param  {Network} [parent1] One parent to breed
     * @param  {Network} [parent2] Another parent to breed
     */
    constructor(x, y, parent1, parent2) {
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
        /**
         * The neural network that controls the bird
         * @type {Network}
         */
        this.network = null;
        
        /**
         * This bird is special
         * @type {Boolean}
         */
        this.specialBird = false;
        
        
        if (parent1 && parent2) {
            // breed a new network
            this.network = new Network(parent1, parent2);
        } else {
            this.network = new Network([2, 6, 1]);
        }
    }
    
    
    /**
     * Let the bird's neural network move (jump) itself given the inputs.
     * @param  {Number} distance Distance to the nearest pipe
     * @param  {Number} position Height distance to nearest pipe. 1 is furthest
     *                           below, -1 is furthest above.
     */
    move(distance, position) {
        let output = this.network.compute([distance, position]);
        // console.log(distance + ', ' + position + ': ' + output);
        if (output > 0.5) {
            this.jump();
        }
        
        // TODO: remove this later
        if (this.specialBird && false) {
            // bounding box
            p.fill('white');
            p.stroke('black');
            p.strokeWeight(5);
            p.rect(400, 500, 600, 700);
            
            // middle line
            p.strokeWeight(1);
            p.line(400, 600, 600, 600);
            
            // inputs & outputs
            // TODO: finish
            p.fill('blue');
            p.rect(450, 600, 475, 600+distance*100);
            p.rect(475, 600, 500, 600+position*100);
            p.fill('red');
            p.rect(500, 600, 525, 550+output*100);
        }
    }
    
    
    /**
     * Draws the bird and updates its y position
     */
    draw() {
        p.fill(this.specialBird ? 'red' : 'yellow');
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