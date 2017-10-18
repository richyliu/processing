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
const PLAYER_SIZE = 30;
/**
 * Width of the spike (height is (side*sqrt(3))/2)
 * @const {Number}
 */
const BLOCK_SIZE = PLAYER_SIZE;
/**
 * How far to move blocks each frame
 * @const {Number}
 */
const BLOCK_SPEED = 16;
/**
 * This is added to velocity every frame
 * @type {Number}
 */
const GRAVITY = 4;
/**
 * Velocity of jumping
 * @type {Number}
 */
const JUMP = 20;

/**
 * Y position of the player
 * @type {Number}
 */
let playerY = 400;
/**
 * Block x starting number
 * @type {Number}
 */
let BLOCK_X_START = 800;
/**
 * X position of the blocks
 * @type {Number}
 */
let blockX = BLOCK_X_START;
/**
 * Speed of player. Negative is up, positive is down
 * @type {Number}
 */
let playerVelocity = 0;
/**
 * Types of blocks each grid can be.
 * @const {Object}
 */
const BLOCKS = {
    SPIKE: '.',
    BLOCK: '=',
    HALF_BLOCK: '-'
};
/**
 * 2D grid array of the type of the spike/block. Each element is a row, and
 * each element in that row is a column of that row.
 * @type {Number[][]}
 */
let blocks = window.geodash_data.level1.reverse();
// let blocks = [
//     '      ..',
//     '       .'
// ];
/**
 * Y position of the ground
 * @type {Number}
 */
let ground = 400;
/**
 * Y position which the player jumps to
 * @type {Number}
 */
let playerGround = ground;
/**
 * Number of deaths
 * @type {Number}
 */
let deathCount = 0;


p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.rectMode(p.CORNER);
    p.frameRate(60);
    // p.noLoop();
};



p.draw = () => {
    // draw sky
    p.background('darkblue');
    // draw the ground
    p.fill('black');
    p.rect(0, ground, WIDTH, HEIGHT);
    
    // move player
    if (playerY <= playerGround) {
        playerY += playerVelocity;
        playerVelocity += GRAVITY;
        
        // player hit ground
        if (playerY > playerGround) {
            playerY = playerGround;
            playerVelocity = 0;
        }
    }
    // draw player
    p.fill('red');
    p.rect(PLAYER_X, playerY-PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
    
    // move and draw blocks
    blockX -= BLOCK_SPEED;
    blocks.forEach((row, rowNum) => {
        Array.from(row).forEach((block, column) => {
            if (block == BLOCKS.SPIKE) {
                p.fill('grey');
                // draw spike
                p.triangle(
                    // left corner
                    blockX + column*BLOCK_SIZE, ground - rowNum*BLOCK_SIZE,
                    // top corner
                    blockX + column*BLOCK_SIZE + BLOCK_SIZE/2, ground-BLOCK_SIZE - rowNum*BLOCK_SIZE,
                    // right corner
                    blockX + (column+1)*BLOCK_SIZE, ground - rowNum*BLOCK_SIZE
                );
                
                // collision detection with spike
                if (
                    // if playerX lines up width spike's x
                    (blockX + column*BLOCK_SIZE < PLAYER_X+PLAYER_SIZE && blockX+(column+1)*BLOCK_SIZE > PLAYER_X) &&
                    // and playerY below spike's top
                    playerY > ground-BLOCK_SIZE - rowNum*BLOCK_SIZE
                ) {
                    // player has collided, reset game
                    blockX = BLOCK_X_START;
                    deathCount++;
                }
            } else if (block == BLOCKS.BLOCK) {
                // p.fill('grey');
                p.rect(
                    // top left
                    blockX + column*BLOCK_SIZE, ground - (rowNum+1)*BLOCK_SIZE,
                    // size of block
                    BLOCK_SIZE, BLOCK_SIZE
                );
                
                // collision detection with the block
                if (
                    // if playerX lines up width block's x
                    (blockX + column*BLOCK_SIZE < PLAYER_X+PLAYER_SIZE && blockX+(column+1)*BLOCK_SIZE > PLAYER_X) &&
                    // and playerY below spike's top
                    playerY > ground-BLOCK_SIZE - rowNum*BLOCK_SIZE
                ) {
                    // player has collided, set playerGround to block level
                    playerGround = ground - rowNum*BLOCK_SIZE;
                }
            }
        });
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
    jump();
};



function jump() {
    if (playerY == playerGround) playerVelocity = -JUMP;
}