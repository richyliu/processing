// declare function require(name: string);
// const foo = require('./test.js');

import { Util } from './test.js';

class Main {
    public static main(args: string[]): void {
        console.log(Util.generateId());
        console.log('Hello, world!');
    }
}

Main.main(['']);