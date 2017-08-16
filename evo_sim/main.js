let COLORS = {}; // colors can only be initialized in setup

const elite = 0.1; // percent of population to use for next generation

let MOVE_SPEED = 100;
const KILL_FRAMES = 10; // how many frames blob not moving before being killed

const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 600;

const LAYER_SIZES = [3, 3, 2];

let world;



function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    noLoop();
    
    COLORS = {
        background: color(255),
        food: color(0, 200, 0)
    };
    
    
    world = new World({
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        LAYER_SIZES: LAYER_SIZES,
        population: 100,
        initialSize: 20,
        viewRange: 3
    }, (blobs, dead, population) => {
        // best blobs are at the end of the array
        for (let i = population - 1; i >= 0; i--) {
            // breed networks
            for (let j = population - 1; j >= i - 1; j--) {
                // add a new blob with random coords and a new network bred from 2 dead ones
                blobs.push(
                    new Blob(
                        random(SCREEN_WIDTH*SPAWN_MARGIN, SCREEN_WIDTH*(1-SPAWN_MARGIN)),
                        random(SCREEN_HEIGHT*SPAWN_MARGIN, SCREEN_HEIGHT*(1-SPAWN_MARGIN)),
                        START_SIZE,
                        new Network(dead[i].network, dead[j].network)
                    )
                );
                if (blobs.length >= population) break;
            }
            if (blobs.length >= population) break;
            
            // past elite part of population, start back from the best
            if (i/population < 1-elite) {
                i = population - 1;
            }
        }
        
        dead = [];
    });
}



function draw() {
    world.draw();
}