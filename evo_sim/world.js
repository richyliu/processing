/**
 * A world in which blobs live in.
 */
class World {
    /**
     * Construct a world
     * @param  {Object}   opt             See Members below for documentation
     * @param  {number}   opt.width
     * @param  {number}   opt.height
     * @param  {number[]} opt.LAYER_SIZES Sizes of the different layer of the neural network that controls the blob
     * @param  {number}   [opt.population=100]
     * @param  {number}   [opt.initialSize=20]
     * @param  {number}   [opt.viewRange=5]
     * @param  {Function} allDead         What to do when everything dies.
     */
    constructor(opt, allDead) {
        /**
         * Width of the screen on which to draw the world
         * @constant {number}
         */
        this.WIDTH = opt.width;
        /**
         * Height of the screen
         * @constant {number}
         */
        this.HEIGHT = opt.height;
        /**
         * This function is called when every blob dies.
         * @type {Function}
         */
        this.allDead = allDead;
        /**
         * How many blobs to start the simulation with
         * @constant {number}
         */
        this.population = opt.population || 100;
        /**
         * Initial size of the blob
         * @constant {number}
         */
        this.initialSize = opt.initialSize || 20;
        /**
         * How far the blob can see. A multiplier of the size. Has to be greater than 1.
         * @constant {number}
         */
        this.viewRange = opt.viewRange || 5;
        /**
         * Whether or not to run the draw() code.
         * @type {Boolean}
         */
        this.paused = false;
        
        /**
         * All the blobs in the world
         * @type {Blob[]}
         */
        this.blobs = Array(opt.population).fill(0);
        /**
         * Blobs that have died. First in list is first died
         * @type {Blob[]}
         */
        this.dead = [];
        
        /**
         * Quadtree for collision detection
         * @type {Quadtree}
         */
        this.quadtree = new Quadtree({
            x: 0,
            y: 0,
            width: this.WIDTH,
            height: this.HEIGHT
        });
        
        // initialize blobs
        this.blobs = this.blobs.map(blob => {
            return new Blob(
                random(0, this.WIDTH),
                random(0, this.HEIGHT),
                this.initialSize,
                new Network(opt.LAYER_SIZES),
                {
                    viewRange: this.viewRange
                }
            );
        });
    }
    
    
    
    /**
     * Pause the simulation
     */
    pause() {
        this.paused = true;
    }
    
    
    
    /**
     * Resume the simulation
     */
    unpause() {
        this.paused = false;
    }
    
    
    
    /**
     * Draws and moves every blob
     */
    draw() {
        if (this.paused) return;
        
        clear();
        this.quadtree.clear();
        
        // add each blob to quadtree
        this.blobs.forEach(blob => {
            this.quadtree.insert(blob);
        });
        
        // move and draw each blob
        this.blobs.forEach(blob => {
            // what the blob sees
            let saw = blob.see(this.quadtree);
            
            // TODO: turn saw into inputs
            let input = [];
            let output = blob.network.compute(input);
            blob.move(output[0] * TWO_PI, output[1]);
            
            let collidedWith = blob.checkCollision(this.quadtree);
            if (collidedWith) {
                if (collidedWith.size > blob.size) {
                    // blob dies
                    
                } else {
                    // collidedWith dies
                    
                }
            }
            
            if (this.dead.length == this.population) {
                this.allDead();
                return;
            }
            
            blob.draw();
        });
    }
    
    
    
    /**
     * World calls this function when every blob dies. This function calls allDead()
     * @private
     */
    allDeadInternal() {
        // reset blobs list
        this.blobs = [];
        
        // sort dead according to size
        dead.sort((a, b) => {
            return a.size - b.size;
        });
        
        this.allDead(this.blobs, this.dead, this.population);
        
        this.dead = [];
    }
}