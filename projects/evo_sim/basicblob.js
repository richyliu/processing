/**
 * Like a blob, but cannot move and lacks a network
 */
window.BasicBlob = class {
    /**
     * Makes a basic blob.
     * @param  {Number} x        X position of blob
     * @param  {Number} y        Y position of blob
     * @param  {Number} size     Diameter of food in pixels
     */
    constructor(x, y, size) {
        /**
         * X position of blob
         * @type {Number}
         */
        this.x = x;
        /**
         * Y position of blob
         * @type {Number}
         */
        this.y = y;
        /**
         * Diameter of blob in pixels
         * @type {Number}
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
     * @param  {Number} x Offset to draw from
     * @param  {Number} y Offset to draw from
     */
    draw(x, y) {
        p.fill(this.color);
        p.noStroke();
        p.ellipse(this.x + x, this.y + x, this.size, this.size);
    }
};