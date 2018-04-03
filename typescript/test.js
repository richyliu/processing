var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.debug = true;
    return Settings;
}());
export { Settings };
var Exception = /** @class */ (function () {
    function Exception() {
    }
    Exception.warn = function (message) {
        if (!Settings.debug)
            console.warn(message);
    };
    return Exception;
}());
export { Exception };
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
export { Util };
var BaseObject = /** @class */ (function () {
    function BaseObject() {
        this._id = Util.generateId();
    }
    Object.defineProperty(BaseObject.prototype, "id", {
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
    return BaseObject;
}());
export { BaseObject };
var Bounds = /** @class */ (function () {
    function Bounds(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Bounds;
}());
export { Bounds };
var PhysicalObject = /** @class */ (function (_super) {
    __extends(PhysicalObject, _super);
    function PhysicalObject(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.bounds = new Bounds(x, y, width, height);
        return _this;
    }
    return PhysicalObject;
}(BaseObject));
export { PhysicalObject };
var RectObject = /** @class */ (function (_super) {
    __extends(RectObject, _super);
    function RectObject(x, y, width, height) {
        return _super.call(this, x, y, width, height) || this;
    }
    return RectObject;
}(PhysicalObject));
export { RectObject };
var EllipseObject = /** @class */ (function () {
    function EllipseObject() {
    }
    return EllipseObject;
}());
export { EllipseObject };
//# sourceMappingURL=test.js.map