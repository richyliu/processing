window.mainCode = () => {
    /**
     * Width of the screen
     * @const {Number}
     */
    const WIDTH = 800;
    /**
     * Height of the screen
     * @const {Number}
     */
    const HEIGHT = 500;
    /**
     * How far player is from left of screen
     * @const {Number}
     */
    const PLAYER_X = 100;
    /**
     * Width and height of player
     * @const {Number}
     */
    const PLAYER_SIZE = 40;
    /**
     * Width of the spike (height is (side*sqrt(3))/2)
     * @const {Number}
     */
    const SPIKE_SIZE = PLAYER_SIZE;
    /**
     * How far to move spike each frame
     * @const {Number}
     */
    const SPIKE_SPEED = 4;
    /**
     * This is added to velocity every frame
     * @type {Number}
     */
    const GRAVITY = 0.9;
    /**
     * Velocity of jumping
     * @type {Number}
     */
    const JUMP = 9;
    
    /**
     * Y position of the player
     * @type {Number}
     */
    let playerY = 400;
    /**
     * X position of the spikes
     * @type {Number}
     */
    let spikeX = 0;
    /**
     * Speed of player. Negative is up, positive is down
     * @type {Number}
     */
    let playerVelocity = 0;
    /**
     * Array of spikes' leftmost point distance from left side of screen
     * @type {Number[]}
     */
    let spikes = window.geodash_data.level1.map(num => num*PLAYER_SIZE);
    /**
     * Y position of the ground
     * @type {Number}
     */
    let ground = 400;
    /**
     * Number of deaths
     * @type {Number}
     */
    let deathCount = 0;
    
    
    
    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT);
        p.rectMode(p.CORNER);
        p.frameRate(30);
    };
    
    
    
    p.draw = () => {
        // draw sky
        p.background('darkblue');
        // draw the ground
        p.fill('black');
        p.rect(0, ground, WIDTH, HEIGHT);
        
        // move player
        if (playerY <= ground) {
            playerY += playerVelocity;
            playerVelocity += GRAVITY;
            
            // player hit ground
            if (playerY > ground) {
                playerY = ground;
                playerVelocity = 0;
            }
        }
        // draw player
        p.fill('red');
        p.rect(PLAYER_X, playerY-PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
        
        // move and draw spikes
        spikeX -= SPIKE_SPEED;
        p.fill('grey');
        spikes.forEach(spike => {
            p.triangle(
                // left corner
                spikeX + spike, ground,
                // top corner
                spikeX + spike+SPIKE_SIZE/2, ground-(SPIKE_SIZE*Math.sqrt(3))/2,
                // right corner
                spikeX + spike+SPIKE_SIZE, ground
            );
        });
        
        // collision detection
        spikes.forEach(spike => {
            if (
                // if playerX lines up width spike's x
                (spikeX+spike < PLAYER_X+PLAYER_SIZE && spikeX+spike+SPIKE_SIZE > PLAYER_X) &&
                // and playerY below spike's top
                playerY > ground-(SPIKE_SIZE*Math.sqrt(3))/2
            ) {
                // player has collided, reset game
                spikeX = 0;
                deathCount++;
            }
        });
        
        // stats
        p.fill('white');
        p.stroke('black');
        p.rect(0, 0, 100, 100);
        p.textSize(32);
        p.fill('black');
        p.text(deathCount, 10, 50);
    };
    
    
    
    p.keyPressed = () => {
        playerVelocity = -JUMP;
    };
};