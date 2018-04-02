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

class Factory {
    private _id: string;

    public Factory() {
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

    public generate(): Factory {
        
        return new Factory();
    }
}

class Bounds {
    public Bounds() {
        
    }
}

class PhysicalFactory {
    
    public PhysicalFactory() {
        
    }
}


class RectFactory {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public RectFactory(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}


class EllipseFactory {
    public CircleFactory() {

    }
}
