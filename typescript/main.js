// declare function require(name: string);
// const foo = require('./test.js');
import { Util } from './test.js';
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function (args) {
        console.log(Util.generateId());
        console.log('Hello, world!');
    };
    return Main;
}());
Main.main(['']);
//# sourceMappingURL=main.js.map