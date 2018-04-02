var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.debug = true;
    return Settings;
}());
var Exception = /** @class */ (function () {
    function Exception() {
    }
    Exception.warn = function (message) {
        if (!Settings.debug)
            console.warn(message);
    };
    return Exception;
}());
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.generateId = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    return Util;
}());
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.Factory = function () {
        this._id = Util.generateId();
    };
    Object.defineProperty(Factory.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (newId) {
            if (Settings.debug) {
                this._id = newId;
            }
            else {
                Exception.warn('Cannot set id (maybe use debug mode?)');
            }
        },
        enumerable: true,
        configurable: true
    });
    Factory.prototype.generate = function () {
        return new Factory();
    };
    return Factory;
}());
var Bounds = /** @class */ (function () {
    function Bounds() {
    }
    Bounds.prototype.Bounds = function () {
    };
    return Bounds;
}());
var PhysicalFactory = /** @class */ (function () {
    function PhysicalFactory() {
    }
    PhysicalFactory.prototype.PhysicalFactory = function () {
    };
    return PhysicalFactory;
}());
var RectFactory = /** @class */ (function () {
    function RectFactory() {
    }
    RectFactory.prototype.RectFactory = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    return RectFactory;
}());
var EllipseFactory = /** @class */ (function () {
    function EllipseFactory() {
    }
    EllipseFactory.prototype.CircleFactory = function () {
    };
    return EllipseFactory;
}());
export { Settings, Exception, Util, Factory, Bounds };
//# sourceMappingURL=test.js.map