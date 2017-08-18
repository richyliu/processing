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
     * @param  {number}   [opt.population=100] Non of the settings below may be zero, or any other falsy value.
     * @param  {number}   [opt.initialSize=20]
     * @param  {number}   [opt.viewRange=5]
     * @param  {number}   [opt.elite=0.1]
     * @param  {number}   [opt.moveSpeed=20]
     * @param  {number}   [opt.foodRatio=5] Amount of food per blob
     * @param  {number}   [opt.foodSize=10]
     */
    constructor(opt) {
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
         * Percentage of population to use to breed the next generation.
         * @constant {number}
         */
        this.elite = opt.elite || 0.1;
        /**
         * How many pixels the blobs can move maximum on each draw. It is divided by the size
         * @constant {number}
         */
        this.moveSpeed = opt.moveSpeed || 20;
        /**
         * Diameter of food in pixels
         * @type {number}
         */
        this.foodSize = opt.foodSize || 10;
        
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
         * Food particles
         * @type {BasicBlob[]}
         */
        this.food = Array(opt.population * (opt.foodRatio || 5)).fill(0);
        
        /**
         * Quadtree for collision detection
         * @type {Quadtree}
         */
        this.quadtree = new Quadtree({
            x: 0,
            y: 0,
            width: this.WIDTH,
            height: this.HEIGHT
        }, 4, 4);
        
        
        /* Initialize lists */
        
        // populate blobs
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
        
        // add food
        this.spawnFood();
    }
    
    
    
    /**
     * Draws and moves every blob
     */
    draw() {
        if (this.paused) return;
        
        clear();
        this.quadtree.clear();
        
        // draw the food
        this.food.forEach(f => {
            if (f) {
                f.draw();
                this.quadtree.insert(f);
            }
        });
        
        // add each blob to quadtree
        this.blobs.forEach(blob => {
            if (blob) {
                this.quadtree.insert(blob);
            }
        });
        
        // move and draw each blob
        this.blobs.forEach((blob, index) => {
            if (blob) {
                // what the blob sees
                let input = blob.see(this.quadtree);
                let output = blob.network.compute(input);
                blob.move(output[0] * TWO_PI, output[1] * this.moveSpeed / blob.size);
                
                let collidedWith = blob.checkCollision(this.quadtree);
                if (collidedWith) {
                    // food eaten
                    if (!(collidedWith instanceof Blob)) {
                        blob.size += collidedWith.size;
                        this.food[this.food.indexOf(collidedWith)] = undefined;
                    // blob dies
                    } else if (collidedWith.size > blob.size) {
                        // add size to bigger blob
                        collidedWith.size += blob.size;
                        // add blob to dead list
                        this.dead.push(blob);
                        // remove from blobs list
                        this.blobs[index] = undefined;
                    // collidedWith dies
                    } else {
                        // add size to bigger blob
                        blob.size += collidedWith.size;
                        // add blob to dead list
                        this.dead.push(collidedWith);
                        // remove from blobs list
                        this.blobs[this.blobs.indexOf(collidedWith)] = undefined;
                    }
                }
                blob.draw();
                
                if (this.dead.length == this.population) {
                    this.allDead();
                    return;
                }
            }
        });
    }
    
    
    
    /**
     * Called when every blob dies. Breeds new blobs based on dead order and
     * elitism rate.
     * @private
     */
    allDead() {
        // spawn new food
        this.spawnFood();
        
        // reset blobs list
        this.blobs = [];
        
        // sort dead according to size
        this.dead.sort((a, b) => {
            return a.size - b.size;
        });
        
        // best blobs are at the end of the array
        for (let i = this.population - 1; i >= 0; i--) {
            // breed networks
            for (let j = this.population - 1; j >= i - 1; j--) {
                // add a new blob with random coords and a new network bred from 2 dead ones
                this.blobs.push(
                    new Blob(
                        random(0, this.WIDTH),
                        random(0, this.HEIGHT),
                        this.initialSize,
                        new Network(this.dead[i].network, this.dead[j].network),
                        {
                            viewRange: this.viewRange
                        }
                    )
                );
                if (this.blobs.length >= this.population) break;
            }
            if (this.blobs.length >= this.population) break;
            
            // past elite part of population, start back from the best
            if (i/this.population < 1-this.elite) {
                i = this.population - 1;
            }
        }
        
        this.dead = [];
    }
    
    
    
    /**
     * Spawns the food.
     * @private
     */
    spawnFood() {
        this.food = this.food.map(f => {
            return new BasicBlob(
                random(0, this.WIDTH),
                random(0, this.HEIGHT),
                this.foodSize
            );
        });
    }
}