/**
 * Simulation that breeds networks to play Flappy Bird
 */
window.World = class {
    /**
     * Create a new world.
     * @param  {Number} numBirds     Number of birds in a population
     * @param  {Number} screenWidth  Width of the screen
     * @param  {Number} screenHeight Height of the screen
     */
    constructor(numBirds, screenWidth, screenHeight) {
        /**
         * X position of all the birds
         * @constant {Number}
         */
        this.birdX = 150;
        /**
         * Space between pipes
         * @constant {Number}
         */
        this.pipeFrequency = 300;
        /**
         * Index of the pipe that is closest to the bird
         * @type {Number}
         */
        this.closestPipe = 0;
        /**
         * Width of the screen
         * @constant {Number}
         */
        this.WIDTH = screenWidth;
        /**
         * Height of the screen
         * @constant {Number}
         */
        this.HEIGHT = screenHeight;
        /**
         * Height of the gap between top and bottom pipe
         * @constant {Number}
         */
        // this.GAP_SIZE = 135;
        this.GAP_SIZE = 200;
        /**
         * How wide each pipe is
         * @constant {Number}
         */
        this.PIPE_WIDTH = 60;
        /**
         * Part of the population to use when breeding the next generation
         * @constant {Number}
         */
        this.ELITE = 0.1;
        /**
         * How far in the x direction to move everything each frame
         * @type {Number}
         */
        this.MOVE_AMT = 1.5;
        /**
         * Weight of the vertical distance from the gap when calculating fitness
         * @type {Number}
         */
        this.VERT_WEIGHT = 0.5;
        /**
         * Weight of the total distance travelled when calculating fitness
         * @type {Number}
         */
        this.HORZ_WEIGHT = 1;
        /**
         * Current x position of all alive birds
         * @type {Number}
         */
        this.currentX = 0;
        /**
         * Current generation
         * @type {Number}
         */
        this.generation = 0;
        /**
         * Plot of best fitness each generation
         * @type {GPlot}
         */
        this.bestFitnessPlot = new GPlot(p, 100, this.HEIGHT, 350, 200);
		this.bestFitnessPlot.getXAxis().setAxisLabelText('generation');
		this.bestFitnessPlot.getYAxis().setAxisLabelText('best fitness');
        
        this.meanFitnessPlot = new GPlot(p, 450, this.HEIGHT, 350, 200);
        this.meanFitnessPlot.getXAxis().setAxisLabelText('generation');
		this.meanFitnessPlot.getYAxis().setAxisLabelText('avg fitness');
        
        /**
         * Birds that are currently alive. Dead birds are set to undefined.
         * @type {Bird[]}
         */
        this.birds = [];
        /**
         * Onscreen pipes
         * @type {Pipe[]}
         */
        this.pipes = [];
        /**
         * Birds that are dead. Stores the bird along with the fitness (total
         * distance travelled - distance to nearest pipe)
         * @type {Bird[]}
         */
        this.dead = [];
        
        
        Array(numBirds).fill(0).forEach(() => {
            this.birds.push(new Bird(this.birdX, p.random(0, this.HEIGHT)));
        });
        this.pipes = Array(Math.ceil(this.WIDTH/this.pipeFrequency)).fill(0);
        this.resetPipes();
    }
    
    
    /**
     * Draw and update the birds and pipes
     */
    draw() {
        p.fill('white');
        p.stroke('black');
        p.strokeWeight(5);
        p.rect(0, 500, 100, 600);
        p.textSize(32);
        
        p.fill('black');
        p.text(this.currentX, 10, 550);
        
        this.bestFitnessPlot.defaultDraw();
        this.meanFitnessPlot.defaultDraw();
        this.currentX += this.MOVE_AMT;
        
        
        this.birds.forEach((bird, index) => {
            if (!bird) return;
            
            let cp = this.pipes[this.closestPipe];
            // distance to nearest pipe normalized by greatest distance possible
            // and distance from center of gap of nearest pipe
            bird.move((cp.x-this.birdX)/this.pipeFrequency, (bird.y - cp.GAP_CENTER)/this.HEIGHT);
            bird.draw();
            
            // check for collision
            if (
                // x value within half diameter of bird 
                (cp.x-bird.SIZE/2 < this.birdX &&
                cp.x+this.PIPE_WIDTH+bird.SIZE/2 > this.birdX &&
                (
                    // collided with top/bottom of pipe
                    bird.y-bird.SIZE/2 < cp.Y ||
                    bird.y+bird.SIZE/2 > cp.Y+this.GAP_SIZE
                )) ||
                // out of bounds
                (
                    bird.y < 0 || bird.y+bird.SIZE/2 > this.HEIGHT
                )
            ) {
                // bird dies
                this.dead.push({
                    bird: bird,
                    // calculate fitness
                    // current distance minus y-distance from gap (scaled from 0 to 1)
                    fitness: this.currentX*this.HORZ_WEIGHT - Math.abs(bird.y-cp.GAP_CENTER)*this.VERT_WEIGHT
                });
                this.birds[index] = undefined;
            }
            
        });
        
        this.pipes.forEach(pipe => {
            pipe.draw();
        });
        
        // color closest pipe
        p.fill('red');
        p.rect(this.pipes[this.closestPipe].x, 0, this.pipes[this.closestPipe].x+10, 10);
        
        
        // if closest pipe goes offscreen
        if (this.pipes[this.closestPipe].x+this.PIPE_WIDTH < 0) {
            // TODO: fix pipe spawining problem
            // respawn pipe
            this.pipes[this.closestPipe] = new Pipe(
                this.pipeFrequency*this.pipes.length-this.PIPE_WIDTH,
                p.random(10, this.HEIGHT-this.GAP_SIZE-10),
                this.GAP_SIZE,
                this.PIPE_WIDTH,
                this.HEIGHT,
                this.MOVE_AMT
            );
            
            // make next pipe the closest
            this.closestPipe++;
            if (this.closestPipe == this.pipes.length) {
                this.closestPipe = 0;
            }
        }
        
        // respawn birds once all are dead
        if (this.dead.length == this.birds.length) {
            this.respawnBirds();
        }
    }
    
    
    /**
     * Reset all the pipes
     */
    resetPipes() {
        this.closestPipe = 0;
        this.pipes = this.pipes.map((_, index) => {
            return new Pipe(
                (index+1)*this.pipeFrequency + this.birdX,
                p.random(10, this.HEIGHT-this.GAP_SIZE-10),
                this.GAP_SIZE,
                this.PIPE_WIDTH,
                this.HEIGHT,
                this.MOVE_AMT
            );
        });
    }
    
    
    /**
     * Called once all birds are dead. Rebreeds and spawns new birds
     */
    respawnBirds() {
        // reset birds list
        this.birds = [];
        this.currentX = 0;
        this.generation++;
        this.resetPipes();
        
        // sort population according to fitness (best fit first)
        this.dead.sort((a, b) => {
            if (a.fitness < b.fitness) return 1;
            else if (a.fitness > b.fitness) return 0;
            else return -1;
        });
        
        // take ELITE part of population
        let elite = this.dead.slice(0, this.ELITE*this.dead.length);
        
        // update graph with best fit
        this.bestFitnessPlot.addPoint(new GPoint(this.generation, elite[0].fitness));
        // update graph with avg fit
        let value = elite.reduce((sum, bird) => {
            return {fitness: sum.fitness + bird.fitness};
        });
        this.meanFitnessPlot.addPoint(new GPoint(this.generation, value.fitness/this.dead.length));
        
        // breed them with one another to create a new population/generation
        for (let husband = 0; husband < elite.length; husband++) {
            for (let wife = 0; wife <= husband; wife++) {
                this.birds.push(new Bird(this.birdX, p.random(0, this.HEIGHT), elite[wife].network, elite[husband].network));
                if (this.birds.length == this.dead.length) break;
            }
            if (this.birds.length == this.dead.length) break;
            // start back at the beginning if still need more birds
            if (husband == elite.length-1) husband = 0;
        }
        
        this.dead = [];
        this.birds[0].specialBird = true;
    }
};