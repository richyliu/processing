const BOARD_WIDTH = 600;
const BOARD_HEIGHT = 600;
const GRID_SIZE = BOARD_WIDTH / 3;
// 0 is playerO, 1 is playerX
let grid = [
    [-9, -8, -7],
    [-6, -5, -4],
    [-3, -2, -1]
];
let playerX = true;




function setup() {
    createCanvas(600, 700);
    background(255);
    textSize(16);
    
    fill(0);
    text("Current player: X", 100, 650);
    
    strokeWeight(4);
    
    // draw lines for tic tac toe board
    line(0, GRID_SIZE, BOARD_WIDTH, GRID_SIZE);
    line(0, GRID_SIZE*2, BOARD_WIDTH, GRID_SIZE*2);
    line(GRID_SIZE, 0, GRID_SIZE, BOARD_HEIGHT);
    line(GRID_SIZE*2, 0, GRID_SIZE*2, BOARD_HEIGHT);
    
    // clear text display area
    fill(255);
    rect(0, BOARD_HEIGHT, BOARD_WIDTH, BOARD_HEIGHT+100);
}



function draw() {
}



function mousePressed() {
    // clear text display area
    fill(255);
    rect(0, BOARD_HEIGHT, BOARD_WIDTH, BOARD_HEIGHT+100);
    
    // index of grid array
    const indexX = Math.floor(mouseX/GRID_SIZE);
    const indexY = Math.floor(mouseY/GRID_SIZE);
    
    // center of the grid mouse clicked on (in pixels)
    const gridX = indexX * GRID_SIZE + GRID_SIZE/2;
    const gridY = indexY * GRID_SIZE + GRID_SIZE/2;
    if (grid[indexX][indexY] > -1) return;
    
    // draw player X/O and set grid array
    if (playerX) {
        playerX = false;
        line(gridX - 50, gridY - 50, gridX + 50, gridY + 50);
        line(gridX - 50, gridY + 50, gridX + 50, gridY - 50);
        fill(0);
        text("Current player: O", 100, 650);
        grid[indexX][indexY] = 1;
    } else {
        playerX = true;
        fill(255);
        ellipse(gridX, gridY, 100, 100);
        fill(0);
        text("Current player: X", 100, 650);
        grid[indexX][indexY] = 0;
    }
    
    // check for three in a row 
    if (
            // vertical
            checkThreeEqual(grid[0][0], grid[0][1], grid[0][2]) ||
            checkThreeEqual(grid[1][0], grid[1][1], grid[1][2]) ||
            checkThreeEqual(grid[2][0], grid[2][1], grid[2][2]) ||
            // horizontal
            checkThreeEqual(grid[0][0], grid[1][0], grid[2][0]) ||
            checkThreeEqual(grid[0][1], grid[1][1], grid[2][1]) ||
            checkThreeEqual(grid[0][2], grid[1][2], grid[2][2]) ||
            // diagnal
            checkThreeEqual(grid[0][0], grid[1][1], grid[2][2]) ||
            checkThreeEqual(grid[0][2], grid[1][1], grid[2][0])
        ) {
        // clear text display area
        fill(255);
        rect(0, BOARD_HEIGHT, BOARD_WIDTH, BOARD_HEIGHT+100);
        fill(0);
        text("Player: " + (playerX ? "O" : "X") + " won!", 100, 650);
    }
}



function checkThreeEqual(a, b, c) {
  return (a == b) && (b == c);
}