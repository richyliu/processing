/**
 * A blob controlled by a network
 * @extends BasicBlob
 */
class Blob extends BasicBlob {
    /**
     * Creates a blob.
     * @param  {number} x        X position of blob
     * @param  {number} y        Y position of blob
     * @param  {number} size     Diameter of blob in pixels
     * @param  {Network} network Neural network that controls blob
     * @param  {Object} [opt]      Other options. See Members for documentation
     * @param  {number} [opt.viewRange=5]
     */
    constructor(x, y, size, network, opt={}) {
        super(x, y, size);
        
        /**
         * Neural network that controls the blob
         * @constant {Network}
         */
        this.network = network;
        
        /**
         * How many frames in a row this blob has stayed "still" (not moving 100px)
         * @type {number}
         */
        this.stillFrame = 0;
        /**
         * X coord of the still position
         * @type {number}
         */
        this.stillX = -1;
        /**
         * Y coord of the still position
         * @type {number}
         */
        this.stillY = -1;
        
        /**
         * The diameter of the circle the blob can see as a multiplier of the size
         * @constant {number}
         */
        this.viewRange = opt.viewRange || 5;
    }
    
    
    
    /**
     * Draws the blob and the view range.
     * @param  {number} x Offset to draw from
     * @param  {number} y Offset to draw from
     * @override
     */
    draw(x, y) {
        super.draw(x, y);
        
        // draw view range
        p.noFill();
        p.stroke(0);
        p.ellipse(this.x + x, this.y + y, this.viewRange * this.size, this.viewRange * this.size);
        
        // draw stillFrame
        p.fill(255);
        p.noStroke();
        p.ellipse(this.x + x, this.y + y, this.stillFrame/500 * this.size);
    }
    
    
    
    /**
     * Moves the blob
     * @param  {number} angle     Direction to move in radians
     * @param  {number} magnitude How far to move in pixels
     * @param  {number} width     Width of the screen
     * @param  {number} height    Height of the screen
     */
    move(angle, magnitude, width, height) {
        let prevX = this.x;
        let prevY = this.y;
        
        this.x += Math.cos(angle) * magnitude;
        this.y += Math.sin(angle) * magnitude;
        
        
        // check coords are within bounds
        if (this.x > width) {
            this.x = width;
        } else if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > height) {
            this.y = height;
        } else if (this.y < 0) {
            this.y = 0;
        }
        
        // add to stillFrame if staying still
        let dis = this.rms(this.x-this.stillX, this.y-this.stillY);
        if (dis > 100) {
            this.stillFrame = 0;
            this.stillX = this.x;
            this.stillY = this.y;
        } else if (dis < 100) {
            this.stillFrame++;
        }
    }
    
    
    
    /**
     * Looks at blobs in view range.
     * @param  {Quadtree} quadtree Quadtree to look at
     * @return {number[]}          Angle to blob, distance, and bigger than this
     *                             (0.99 for true, 0.01 for false)
     */
    see(quadtree) {
        let closestBlob = null;
        let closestBlobDistance = 1000000;
        
        // possible collisions
        quadtree.retrieve({
            x: this.x,
            y: this.y,
            size: this.viewRange*this.size
        }).forEach(blob => {
            let dis = this.rms(blob.x-this.x, blob.y-this.y);
            // only check for live blobs, not food
            if (blob instanceof Blob && dis < closestBlobDistance && dis < (blob.viewRange+this.size)/2 && blob != this) {
                closestBlobDistance = dis;
                closestBlob = blob;
            }
        });
        
        if (closestBlob) {
            let arr = new Array(3);
            arr[0] = Math.atan2(closestBlob.x-this.x, closestBlob.y-this.y) / Math.PI*2;
            arr[1] = closestBlobDistance;
            arr[2] = closestBlob.size > this.size ? 0.99 : 0.01;
            
            return arr;
        } else {
            return [0.01, 0.01, 0.01];
        }
    }
    
    
    
    /**
     * Check if this blob was eaten by another blob. Only eats when half of
     * smaller blob is within bigger blob.
     * @param  {Quadtree} quadtree Quadtree to check for collisions
     * @param  {Blob[]}   dead     List of dead blobs to check to make sure no
     *                             duplicate kills.
     * @return {Blob}              The blobs that ate this blob. Null if no eating
     */
    checkCollision(quadtree, dead) {
        let closestBlob = null;
        let closestBlobDistance = 100000;
        
        // blobs that might be able to eat this blob
        quadtree.retrieve(this).forEach(blob => {
            let dis = this.rms(blob.x-this.x, blob.y-this.y);
            if (dis < closestBlobDistance && dis < (blob.size+this.size)/2 && !dead.includes(blob) && blob != this) {
                closestBlobDistance = dis;
                closestBlob = blob;
            }
        });
        
        return closestBlob;
    }
    
    
    
    /**
     * Root mean squared. Useful for Pythagorean's theorm and other calculations.
     * Formula: sqrt(a^2 + b^2)
     * @param  {number} a First number
     * @param  {number} b Second number
     * @return {number}   Root mean squared
     */
    rms(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
}