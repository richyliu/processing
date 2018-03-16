class CollisionEngine {
    /**
     * 
     * @param {!object} obj Options
     * @param {!number} obj.width Of the collision area
     * @param {!number} obj.height Of the collision area
     * @param {number} [obj.xOffset] From the origin (may be translated) NOT YET IMPLEMENTED!
     * @param {number} [obj.yOffset] From the origin (may be translated) NOT YET IMPLEMENTED!
     */
    constructor(obj) {
        if (!obj) {
            console.error('No options object');
            return;
        }

        this.width = obj.width;
        this.height = obj.height;

        // initially populate with 4 walls
        this.objects = [
            new Moveable({
                x: 0,
                y: -1,
                width: this.width,
                height: 1
            }), // top
            new Moveable({
                x: -1,
                y: 0,
                width: 1,
                height: this.height
            }), // left
            new Moveable({
                x: this.width,
                y: 0,
                width: 1,
                height: this.height
            }), // right
            new Moveable({
                x: 0,
                y: this.height,
                width: this.width,
                height: 1
            }), // right
        ];
    }


    /**
     * Adds a moveable object to a list of objects
     * @param {Moveable} moveable Object to add to list of objects
     * @param {function} onCollide Called when object collides with another object or a wall
     */
    add(moveable, onCollide) {
        this.objects.push({
            obj: moveable,
            handler: onCollide
        });
    }

    /**
     * Draws and moves objects and checks for collisions
     */
    draw() {
        for (const obj of this.objects) {
            obj.draw();
            obj.move();

            for (const obj2 of this.objects) {
                if (obj != obj2) {
                    if (
                        obj.getBoundsType() == BOUNDS_TYPES.RECT && obj2.getBoundsType() == BOUNDS_TYPES.CIRCLE ||
                        obj2.getBoundsType() == BOUNDS_TYPES.RECT && obj.getBoundsType() == BOUNDS_TYPES.CIRCLE
                    ) {
                        
                    }
                }
            }
        }
    }
}