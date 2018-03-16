class Moveable {
    /**
     * Makes a rectangular moveable object
     * 
     * @param {!object} obj Options
     * @param {!number} obj.x Top left x
     * @param {!number} obj.y Top left corner
     * @param {!number} obj.width Width
     * @param {!number} obj.height Height
     * @param {string} [obj.color=blue] Color to draw
     * @param {boolean} [obj.moves=false] Object moves according to physics rules. Makes direction and speed required
     * @param {number} [obj.direction] Direction of the object in radians
     * @param {number} [obj.speed] Speed of the object, >= 0
     *//**
     * Makes a circular moveable object
     * 
     * @param {!object} obj Options
     * @param {!number} obj.x Top left x
     * @param {!number} obj.y Top left corner
     * @param {!number} obj.radius Radius
     * @param {string} [obj.color=blue] Color to draw
     * @param {boolean} [obj.moves=false] Object moves according to physics rules. Makes direction and speed required
     * @param {number} [obj.direction=0] Direction of the object in radians
     * @param {number} [obj.speed=0] Speed of the object, >= 0
     */
    constructor(obj) {
        if (!obj) {
            console.error('No options object');
            return;
        }

        this.x = obj.x;
        this.y = obj.y;
        this.color = obj.color || 'blue';
        
        if (obj.moves) {
            this.moves = obj.moves;
            if (!obj.direction) {
                console.error('Object moves, so it must have a direction');
            }
            if (!obj.speed) {
                console.error('Object moves, so it must have a speed');
            }
            this.direction = obj.direction;
            this.speed = obj.speed;
        } else {
            this.moves = obj.moves;
        }
        
        if (obj.radius) {
            if (obj.radius <= 0) {
                console.error('Radius must be > 0!');
            }
            this.radius = obj.radius;
        } else {
            if (obj.width <= 0) {
                console.error('Width must be > 0!');
            }
            if (obj.height <= 0) {
                console.error('Height must be > 0!');
            }
            this.width = obj.width;
            this.height = obj.height;
        }
        
    }

    /**
     * Draws the object onscreen.
     */
    draw() {
        push();
        fill(this.color);
        if (this.radius)
            ellipse(this.x, this.y, this.radius);
        else
            rect(this.x, this.y, this.width, this.height);
        pop();
    }

    /**
     * Moves the object
     */
    move() {
        if (this.moves) {
            this.x += cos(this.direction) * this.speed;
            this.y += sin(this.direction) * this.speed;
        }
    }

    /**
     * Gets the bounds for this object
     *
     * @returns {number[]}
     */
    getBounds() {
        if (this.radius)
            return [this.x, this.y, this.radius];
        else
            return[this.x, this.y, this.width, this.height];
    }

    /**
     * Gets the type of bounds for this object 
     *
     * @returns {BOUNDS_TYPES}
     */
    getBoundsType() {
        if (this.radius)
            return BOUNDS_TYPES.CIRCLE;
        else
            return BOUNDS_TYPES.RECT;
    }
}

