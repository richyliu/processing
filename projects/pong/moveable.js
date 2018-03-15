class Moveable {
    /**
     * Makes a new Moveable object
     *
     * @param {!number} x Top left corner
     * @param {!number} y Top left corner
     * @param {!number} width Width
     * @param {number} height Height
     * @param {string} [color=blue] Color to draw
     * @param {boolean} [moves=false] Object moves according to physics rules. Makes direction and speed required
     * @param {number} direction Direction of the object in radians
     * @param {number} speed Speed of the object, >= 0
     */
    constructor(x, y, width, height, color, moves, direction, speed) {
        this.x = x;
        this.y = y;

        if (typeof height == 'number') {
            this.width = width;
            this.height = height;
            this.color = color || 'blue';
            this.moves = moves || false;
            this.direction = direction;
            this.speed = speed;
        } else {
            this.radius = width;
            this.color = height;
            this.moves = color || 'blue';
            this.direction = moves || false;
            this.speed = direction;
        }
    }

    /**
     * Draws the object onscreen. Recommend override
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

