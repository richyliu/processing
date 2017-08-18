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
         * How many frames in a row this blob has stayed on an edge
         * @type {number}
         */
        this.edgeFrame = 0;
        
        /**
         * The diameter of the circle the blob can see as a multiplier of the size
         * @constant {number}
         */
        this.viewRange = opt.viewRange || 5;
    }
    
    
    
    /**
     * Draws the blob and the view range.
     * @override
     */
    draw() {
        super.draw();
        noFill();
        stroke(0);
        
        ellipse(this.x, this.y, this.viewRange * this.size, this.viewRange * this.size);
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
            let dis = Math.sqrt(Math.pow(blob.x-this.x, 2) + Math.pow(blob.y-this.y, 2));
            if (dis < closestBlobDistance && dis < (blob.viewRange+this.size)/2 && blob != this) {
                closestBlobDistance = dis;
                closestBlob = blob;
            }
        });
        
        if (closestBlob) {
            let arr = new Array(3);
            arr[0] = Math.atan2(closestBlob.x-this.x, closestBlob.y-this.y) / TWO_PI;
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
     * @return {Blob}              The blobs that ate this blob. Null if no eating
     */
    checkCollision(quadtree) {
        let closestBlob = null;
        let closestBlobDistance = 100000;
        
        // blobs that might be able to eat this blob
        quadtree.retrieve(this).forEach(blob => {
            let dis = Math.sqrt(Math.pow(blob.x-this.x, 2) + Math.pow(blob.y-this.y, 2));
            if (dis < closestBlobDistance && dis < (blob.size+this.size)/2 && blob != this) {
                closestBlobDistance = dis;
                closestBlob = blob;
            }
        });
        
        return closestBlob;
    }
}