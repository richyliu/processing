/**
 * Like a blob, but cannot move and lacks a network
 */
let BasicBlob = class {
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
        this.color = p.color(p.random(255), p.random(255), p.random(255));
    }
    
    
    /**
     * Draws the blob onto the screen.
     * @param  {number} x Offset to draw from
     * @param  {number} y Offset to draw from
     */
    draw(x, y) {
        p.fill(this.color);
        p.noStroke();
        p.ellipse(this.x + x, this.y + x, this.size, this.size);
    }
};