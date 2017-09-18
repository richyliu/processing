/**
 * Quadtree for collision detection
 */
class Quadtree {
    /**
     * Makes a quadtree
     * @param  {Number} numBoxes  How many boxes wide the quadtree is
     * @param  {Number} width     Width of the screen
     * @param  {Number} height    Height of the screen
     */
    constructor(numBoxes, width, height) {
        /**
         * Each boxes contains some blobs to detect collisions. A blob may
         * belong to multiple boxes if it doesn't fit entirely in one box.
         * @type {Blob[][]}
         */
        this.boxes = Array(Math.pow(numBoxes, 2)).fill([]);
        
        /**
         * Width of the screen
         * @constant {Number}
         */
        this.width = width;
        /**
         * Height of the screen
         * @constant {Number}
         */
        this.height = height;
        /**
         * Width of the box
         * @constant {Number}
         */
        this.boxWidth = width / numBoxes;
        /**
         * Height of the box
         * @constant {Number}
         */
        this.boxHeight = height / numBoxes;
        /**
         * How many boxes wide the quadtree is
         * @type {Number}
         */
        this.numBoxes = numBoxes;
    }
    
    
    /**
     * Adds a blob to the quadtree
     * @param {Blob} blob Blob to add
     */
    add(blob) {
        // x and y index of the box
        let boxX = Math.floor(blob.x / this.boxWidth);
        let boxY = Math.floor(blob.y / this.boxHeight);
        // pixel coords within the box
        let pixelX = blob.x % this.boxWidth;
        let pixelY = blob.y % this.boxHeight;
        
        this.boxes[this.numBoxes*boxY + boxX].push(blob);
        
        // add to multiple boxes if necessary
        if (pixelX < blob.size/2 && boxX > 0) {
            this.boxes[this.numBoxes*boxY + boxX - 1].push(blob);
        } else if (pixelX > this.boxWidth-blob.size/2 && boxX < this.numBoxes-1) {
            this.boxes[this.numBoxes*boxY + boxX + 1].push(blob);
        }
        if (pixelY < blob.size/2 && boxY > 0) {
            this.boxes[this.numBoxes*(boxY-1) + boxX].push(blob);
        } else if (pixelY > this.boxHeight-blob.size/2 && boxY < this.numBoxes-1) {
            this.boxes[this.numBoxes*(boxY+1) + boxX].push(blob);
        }
    }
    
    
    /**
     * Check for collisions with this circle
     * @param  {Number} x      X coord of the circle
     * @param  {Number} y      Y coord of the circle
     * @param  {Number} radius Radius of the circle
     * @return {Blob[]}        Blobs that collided with circle. Array many be empty
     */
    checkCollision(x, y, radius) {
        
    }
}