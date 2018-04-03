import * as Matter from 'matter'

export class Settings {
    public static debug: boolean = true;
}

export class Exception {
    public static warn(message: string) {
        if (!Settings.debug)
            console.warn(message);
    }
}

export class Util {
    public static generateId(): string {
        let text: string = "";
        const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
    }
}

export class BaseObject {
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

export class Bounds {
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

export class PhysicalObject extends BaseObject {
    public bounds: Bounds;
    public body: Matter.Body;

    constructor(x, y, width, height) {
        super();

        this.bounds = new Bounds(x, y, width, height);
    }
}


export class RectObject extends PhysicalObject {

    constructor(x, y, width, height) {
        super(x, y, width, height);

    }
}


export class EllipseObject {
    constructor() {

    }
}
