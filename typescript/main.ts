// declare function require(name: string);
// const foo = require('./test.js');

import * as Lib from './test.js';

console.log(Lib.Util.generateId());
console.log('Hello, world!');

let obj = new Lib.PhysicalObject(0, 0, 100, 100);
console.log(obj);