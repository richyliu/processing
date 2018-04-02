class Settings {
    public static debug: boolean = true;
}

class Exception {
    public static warn(message: string) {
        if (!Settings.debug)
            console.warn(message);
    }
}

class Util {
    public static generateId(): string {
        let text: string = "";
        const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
    }
}

class Object {
    private _id: string;

    constructor() {
        this._id = Util.generateId();
    }

    get id() {
        return this._id;
    }

    set id(newId: string) {
        if (Settings.debug) {
            this._id = newId;
        } else {
            Exception.warn('Cannot set id (maybe use debug mode?)');
        }
    }
}

class Bounds {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class PhysicalObject extends Object {
    public bounds: Bounds;
    public body: Matter.Body;

    constructor(x, y, width, height) {
        super();

        this.bounds = new Bounds(x, y, width, height);
    }
}


class RectObject extends PhysicalObject {

    constructor(x, y, width, height) {
        super(x, y, width, height);

    }
}


class EllipseObject {
    constructor() {

    }
}

export { Settings, Exception, Util, Object, Bounds };