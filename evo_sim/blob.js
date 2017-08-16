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
         * @type {Network}
         */
        this.network = network;
        
        /**
         * How many frames in a row this blob has stayed on an edge
         * @type {number}
         */
        this.edgeFrame = 0;
        
        /**
         * The diameter of the circle the blob can see in pixels
         * @type {number}
         */
        this.viewRange = (opt.viewRange || 5) * size;
    }
    
    
    
    /**
     * Draws the blob and the view range.
     * @override
     */
    draw() {
        super.draw();
        noFill();
        stroke(0);
        
        ellipse(this.x, this.y, this.viewRange, this.viewRange);
    }
    
    
    
    /**
     * Moves the blob
     * @param  {number} angle     Direction to move in radians
     * @param  {number} magnitude How far to move in pixels
     */
    move(angle, magnitude) {
        let prevX = this.x;
        let prevY = this.y;
        
        this.x += cos(angle) * magnitude;
        this.y += sin(angle) * magnitude;
        
        
        // check coords are within bounds
        if (this.x > SCREEN_WIDTH) {
            this.x = SCREEN_WIDTH;
        } else if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > SCREEN_HEIGHT) {
            this.y = SCREEN_HEIGHT;
        } else if (this.y < 0) {
            this.y = 0;
        }
        
        // add to edgeFrame if on an edge
        if (this.x === 0 || this.y === 0 || this.x == SCREEN_WIDTH || this.y == SCREEN_HEIGHT) {
            this.edgeFrame++;
        }
    }
    
    
    
    /**
     * Looks at blobs in view range.
     * @param  {Quadtree} quadtree Quadtree to look at
     * @return {Blob[]}            Blobs this blob can see
     */
    see(quadtree) {
        return quadtree.retrieve({
            x: this.x,
            y: this.y,
            radius: this.viewRange/2
        });
    }
    
    
    
    /**
     * Check if this blob was eaten by another blob. Only eats when half of
     * smaller blob is within bigger blob.
     * @param  {Quadtree} quadtree Quadtree to check for collisions
     * @return {Blob}               The blobs that ate this blob. Null if no eating
     */
    checkCollision(quadtree) {
        // blobs that might be able to eat this blob
        quadtree.retrieve({
            x: this.x,
            y: this.y,
            radius: 1 // smallest circle possible
        }).forEach(blob => {
            // only return if blob is bigger
            if (blob.size > this.size) {
                return blob;
            }
        });
        
        // null if no blob
        return null;
    }
}