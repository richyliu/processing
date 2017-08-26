// height & width of the board, not the entire canvas
const BOARD_WIDTH = 600;
const BOARD_HEIGHT = 600;
// how far the board is from the upper left corner
const BOARD_OFFSET_X = 100;
const BOARD_OFFSET_Y = 100;
const GRID_SIZE = BOARD_WIDTH / 15;

// how far the player's grid of letters is from the upper left corner
const PLAYER_OFFSET_X = BOARD_OFFSET_X;
const PLAYER_OFFSET_Y = BOARD_OFFSET_Y + BOARD_HEIGHT + GRID_SIZE;

const specialGrids = {
    doubleLetter: [
        [3, 0],
        [11, 0],
        [6, 2],
        [8, 2],
        [0, 3],
        [7, 3],
        [14, 3],
        [2, 6],
        [6, 6],
        [8, 6],
        [12, 6],
        [3, 7],
        [11, 7],
        [2, 8],
        [6, 8],
        [8, 8],
        [12, 8],
        [0, 11],
        [7, 11],
        [14, 11],
        [6, 12],
        [8, 12],
        [3, 14],
        [11, 14]
    ],
    tripleLetter: [
        [5, 1],
        [9, 1],
        [1, 5],
        [5, 5],
        [9, 5],
        [13, 5],
        [1, 9],
        [5, 9],
        [9, 9],
        [13, 9],
        [5, 13],
        [9, 13]
    ],
    doubleWord: [
        [1, 1],
        [13, 1],
        [2, 2],
        [12, 2],
        [3, 3],
        [11, 3],
        [4, 4],
        [10, 4],
        [7, 7],
        [4, 10],
        [10, 10],
        [3, 11],
        [11, 11],
        [2, 12],
        [12, 12],
        [1, 13],
        [13, 13]
    ],
    tripleWord: [
        [0, 0],
        [7, 0],
        [14, 0],
        [0, 7],
        [14, 7],
        [0, 14],
        [7, 14],
        [14, 14]
    ]
};

// colors palette; have to be initialized in setup
let COLORS = {};


// grid of letters
let grid = [];
// fill grid with blanks
for (let i = 0; i < 15; i++) {
    grid[i] = Array(15).join('.').split('.');
}


let currentClickedLetter = {
    letter: '',
    position: -1
};

let playerLetters = [];
// contains remaining letters
let bag = [
    'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
    'B', 'B',
    'C', 'C',
    'D', 'D', 'D', 'D',
    'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
    'F', 'F',
    'G', 'G', 'G',
    'H', 'H',
    'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
    'J',
    'K',
    'L', 'L', 'L', 'L',
    'M', 'M',
    'N', 'N', 'N', 'N', 'N', 'N',
    'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
    'P', 'P',
    'Q',
    'R', 'R', 'R', 'R', 'R', 'R',
    'S', 'S', 'S', 'S',
    'T', 'T', 'T', 'T', 'T', 'T',
    'U', 'U', 'U', 'U',
    'V', 'V',
    'W', 'W',
    'X',
    'Y', 'Y',
    'Z',
    ' ', ' ' // blanks
];


function setup() {
    createCanvas(800, 800);
    noLoop(); // draw() is only called with redraw()
    
    COLORS = {
        background: color(205, 198, 170),
        doubleLetter: color(188, 207, 205),
        tripleLetter: color(61, 156, 178),
        doubleWord: color(255, 182, 165),
        tripleWord: color(255, 101, 87),
    };
    shuffle(bag, true);
    
    // generate player's letters from last 7 from the bag
    playerLetters = bag.splice(-7);
}



/**
 * Runs when the mouse is held down. Select letter being dragged, check if valid
 */
function mousePressed() {
    fill(COLORS.background);
    stroke(0);
    
    // check dragging letter from player's own set
    const index = Math.floor((mouseX-PLAYER_OFFSET_X) / GRID_SIZE);
    if (index < 0 || index > 6 || mouseY < PLAYER_OFFSET_Y || mouseY > PLAYER_OFFSET_Y+GRID_SIZE) return;
    
    currentClickedLetter = {
        letter: playerLetters[index],
        position: index
    };
    
    playerLetters[index] = undefined;
}



/**
 * Runs when mouse is moved. Moves the letter with the mouse
 */
function mouseDragged() {
    if (!currentClickedLetter) return;
    redraw();
    
    noStroke();
    fill(0);
    drawLetter(mouseX, mouseY, currentClickedLetter.letter, true);
}




/**
 * Runs when mouse is released. Puts letter on valid square or returns it to
 * its original position.
 */
function mouseReleased() {
    if (currentClickedLetter === null) return;
    
    const indexX = Math.floor((mouseX-BOARD_OFFSET_X) / GRID_SIZE);
    const indexY = Math.floor((mouseY-BOARD_OFFSET_Y) / GRID_SIZE);
    
    // check that dropping letter over board
    if (indexX >= 0 && indexX < 15 && indexY >= 0 && indexY < 15 && grid[indexX][indexY] === '') {
        grid[indexX][indexY] = currentClickedLetter.letter;
    // dropping letter over own letters to switch positions
    } else if (indexY === 16 && indexX >= 0 && indexX < 7 && indexX != currentClickedLetter.position) {
        let temp = playerLetters[indexX];
        playerLetters[indexX] = currentClickedLetter.letter;
        playerLetters[currentClickedLetter.position] = temp;
    // return letter to original position
    } else {
        playerLetters[currentClickedLetter.position] = currentClickedLetter.letter;
    }
    currentClickedLetter = null;
    
    redraw();
}



/**
 * Called every time screen needs to be redrawn. Draws the board, background,
 * and the player's letters.
 */
function draw() {
    clear();
    background(COLORS.background);
    
    strokeWeight(4);
    stroke(0);
    // vertical lines
    for (let i = 0; i < 16; i++) {
        line(BOARD_OFFSET_X+GRID_SIZE*i, BOARD_OFFSET_Y, BOARD_OFFSET_X+GRID_SIZE*i, BOARD_OFFSET_Y+BOARD_HEIGHT);
    }
    // horizontal lines
    for (let i = 0; i < 16; i++) {
        line(BOARD_OFFSET_X, BOARD_OFFSET_Y+GRID_SIZE*i, BOARD_OFFSET_X+BOARD_HEIGHT, BOARD_OFFSET_Y+GRID_SIZE*i);
    }
    
    // color the special grids
    specialGrids.doubleLetter.forEach(coords => {
        fill(COLORS.doubleLetter);
        rect(BOARD_OFFSET_X+coords[0]*GRID_SIZE, BOARD_OFFSET_Y+coords[1]*GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
    specialGrids.tripleLetter.forEach(coords => {
        fill(COLORS.tripleLetter);
        rect(BOARD_OFFSET_X+coords[0]*GRID_SIZE, BOARD_OFFSET_Y+coords[1]*GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
    specialGrids.doubleWord.forEach(coords => {
        fill(COLORS.doubleWord);
        rect(BOARD_OFFSET_X+coords[0]*GRID_SIZE, BOARD_OFFSET_Y+coords[1]*GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
    specialGrids.tripleWord.forEach(coords => {
        fill(COLORS.tripleWord);
        rect(BOARD_OFFSET_X+coords[0]*GRID_SIZE, BOARD_OFFSET_Y+coords[1]*GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
    
    // draw letters on the board
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            if (grid[x][y] !== '') {
                drawLetter(x, y, grid[x][y]);
            }
        }
    }
    
    // draw player's letters at bottom
    for (let i = 0; i < 7; i++) {
        stroke(0);
        noFill();
        rect(PLAYER_OFFSET_X+GRID_SIZE*i, PLAYER_OFFSET_Y, GRID_SIZE, GRID_SIZE);
    }
    
    
    for (let i = 0; i < 7; i++) {
        // player's grid is at y=16
        drawLetter(i, 16, (playerLetters[i] || ''));
    }
}



/**
 * Draws a letter on the scrabble board
 * @param  {Number} x       X coordinate of the scrabble board
 * @param  {Number} y       Y coordinate of the scrabble board
 * @param  {String} letter  Letter to place on the board
 * @param  {Boolean} coords Use screen coordinates instead of board coords
 */
function drawLetter(x, y, letter, coords) {
    let score = checkScoreOfLetter(letter);
    
    textSize(35);
    textAlign(CENTER, CENTER);
    
    noStroke();
    fill(0);
    if (coords) {
        text(letter, x, y);
    } else {
        text(letter, BOARD_OFFSET_X+x*GRID_SIZE+GRID_SIZE/2, BOARD_OFFSET_Y+y*GRID_SIZE+GRID_SIZE/2);
    }
    
    
    // draw smaller number
    textSize(14);
    textAlign(RIGHT, BOTTOM);
    
    noStroke();
    fill(0);
    if (coords) {
        text(score, x+GRID_SIZE*0.45, y+GRID_SIZE/2);
    } else {
        text(score, BOARD_OFFSET_X+x*GRID_SIZE+GRID_SIZE*0.95, BOARD_OFFSET_Y+y*GRID_SIZE+GRID_SIZE);
    }
}



/**
 * Make a move. We want to maxamize points
 */
function play() {
    
}



/**
 * Check how many points would be scored if letters were placed in positions
 * @param  {String[][]} letters The board with the letters intended to be placed
 * @param  {Boolean} column     Letters are orientated column wise. If false
 *                              letters are orientated row wise
 */
function checkScore(letters, column) {
    // seperate letters into words (may be 1 or more). Letters all have to be in one row or column
    
    let score = 0;
    let words = []; // keep track of words for bonus word score
    // rotate grid if letters are column wise
    if (column) letters[0].map((x,i) => letters.map(x => x[i]));
    
    letters.forEach(row => { // or column, depending on what we're looking for
        // if row is empty
        if (row == Array(15).fill('')) return;
        
        // this is the row we're looking for
        for (let i = 0; i < row.length; i++) {
            // start counting letter scores and bonus scores with just the new letters
            if (row[i] === '') {
                // check for grid letters LEFT of new word that can be counted (not the bonuses)
                if (row[i+1] !== '' && i < row.length-1) {
                    
                // check for grid letters RIGHT of new word that can be counted (not the bonuses)
                } else if (row[i-1] !== '' && i > 0) {
                    
                } else {
                    continue;
                }
            }
            
            score += checkScoreOfLetter(row[i]); // only checks letter bonuses; need to check word bonuses
        }
    });
}



/**
 * Returns the score of any letter, including letter bonuses. Only checks for
 * bonuses if x and y are not undefined. Returns a blank string if letter is
 * invalid.
 * @param  {String} letter Letter to check. Has to be uppercase
 * @param  {Number} [x]    X coordinate on the board the letter is.
 * @param  {Number} [y]    Y coordinate on the board the letter is.
 * @return {Number}        Score of the letter
 */
function checkScoreOfLetter(letter, x, y) {
    let score = '';
    if (['E', 'A', 'I', 'O', 'N', 'R', 'T', 'L', 'S', 'U'].includes(letter)) {
        score = 1;
    } else if (['D', 'G'].includes(letter)) {
        score = 2;
    } else if (['B', 'C', 'M', 'P'].includes(letter)) {
        score = 3;
    } else if (['F', 'H', 'V', 'W', 'Y'].includes(letter)) {
        score = 4;
    } else if (['K'].includes(letter)) {
        score = 5;
    } else if (['J', 'X'].includes(letter)) {
        score = 8;
    } else if (['Q', 'Z'].includes(letter)) {
        score = 10;
    // blank letter
    } else if (' ' === letter) {
        score = 0;
    }
    
    // add bonuses
    let coords = [x, y];
    if (specialGrids.doubleLetter.includes(coords)) {
        score *= 2;
    } else if (specialGrids.tripleLetter.includes(coords)) {
        score *= 3;
    }
    
    return score;
}