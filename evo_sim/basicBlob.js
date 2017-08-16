/**
 * Like a blob, but cannot move and lacks a network
 */
class BasicBlob {
    /**
     * Makes a basic blob.
     * @param  {number} x        X position of blob
     * @param  {number} y        Y position of blob
     * @param  {number} size     Diameter of food in pixels
     */
    constructor(x, y, size) {
        /**
         * X position of blob
         * @type {number}
         */
        this.x = x;
        /**
         * Y position of blob
         * @type {number}
         */
        this.y = y;
        /**
         * Diameter of blob in pixels
         * @type {number}
         */
        this.size = size;
        /**
         * Color of the blob
         * @type {Color}
         */
        this.color = color(random(255), random(255), random(255));
    }
    
    
    /**
     * Draws the blob onto the screen.
     */
    draw() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }
}