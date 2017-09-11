class World {
    constructor(numBirds, screenWidth, screenHeight) {
        /**
         * X position of all the birds
         * @constant {Number}
         */
        this.birdX = 150;
        /**
         * Space between pipes
         * @type {Number}
         */
        this.pipeFrequency = 300;
        /**
         * Index of the pipe that is closest to the bird
         * @type {Number}
         */
        this.closestPipe = 0;
        /**
         * Width of the screen
         * @type {Number}
         */
        this.WIDTH = screenWidth;
        /**
         * Height of the screen
         * @type {Number}
         */
        this.HEIGHT = screenHeight;
        /**
         * Height of the gap between top and bottom pipe
         * @type {Number}
         */
        this.GAP_SIZE = 120;
        /**
         * How wide each pipe is
         * @type {Number}
         */
        this.PIPE_WIDTH = 60;
        
        this.birds = [];
        this.pipes = [];
        this.dead = [];
        
        Array(numBirds).fill(0).forEach(() => {
            this.birds.push(new Bird(this.birdX, p.random(0, 600)));
        });
        Array(Math.floor(this.WIDTH/this.pipeFrequency)).fill(0).forEach((_, index) => {
            this.pipes.push(new Pipe(
                300 + index*this.pipeFrequency,
                p.random(10, this.HEIGHT-this.GAP_SIZE-10),
                this.GAP_SIZE,
                this.PIPE_WIDTH,
                this.HEIGHT
            ));
        });
    }
    
    
    /**
     * Draw and update the birds and pipes
     */
    draw() {
        p.fill('white');
        p.stroke('black');
        p.strokeWeight(5);
        p.rect(0, 500, 400, 600);
        p.textSize(32);
        
        p.fill('black');
        p.text('', 10, 550);
        
        this.birds.forEach((bird, index) => {
            if (!bird) return;
            
            bird.draw();
            let cp = this.pipes[this.closestPipe];
            
            // check for collision
            if (
                // x value within half diameter of bird 
                cp.x-bird.SIZE/2 < this.birdX &&
                cp.x+this.PIPE_WIDTH+bird.SIZE/2 > this.birdX &&
                (
                    // collided with top/bottom of pipe
                    bird.y-bird.SIZE/2 < cp.Y ||
                    bird.y+bird.SIZE/2 > cp.Y+this.GAP_SIZE
                )
            ) {
                // bird dies
                this.dead.push(bird);
                this.birds[index] = undefined;
            }
            
        });
        
        this.pipes.forEach(pipe => {
            pipe.draw();
            
            // pipe goes offscreen
            if (pipe.x < 0) {
                // respawn
                this.resetPipe(this.closestPipe);
                
                // make next pipe the closest
                this.closestPipe++;
                if (this.closestPipe == this.pipes.length) {
                    this.closestPipe = 0;
                }
            }
        });
    }
    
    
    /**
     * Reset a pipe given the index
     * @param {Number} index Index of the pipe array to reset
     */
    resetPipe(index) {
        // TODO: where to spawn pipe? (y-position)
        this.pipes[index] = new Pipe(
            600,
            p.random(10, this.HEIGHT-this.GAP_SIZE-10),
            this.GAP_SIZE,
            this.PIPE_WIDTH,
            this.HEIGHT
        );
    }
    
    
    /**
     * Called once all birds are dead. Rebreeds and spawns new birds
     */
    respawnBirds() {
        
    }
}