//@flow strict

const sleep = require('./sleep');
/*:: type AFP = {
    sequence: () => Promise<Array<any>>,
    delay: (ms: number) => Promise<Array<any>>,
    //throttle: () => Promise<Array<any>>,
    all: () => Promise<Array<any>>,
}; */

const sequence = (functions /*: Array<() => Promise<any>> */) /*: Promise<Array<any>> */ => {
    return new Promise((res, rej) => {
        const ret = [];

        return [...functions, () => res(ret.slice(1))].reduce(
            (p, fn) => p.then(v => ret.push(v)).then(fn),
            Promise.resolve(),
        );
    });
};
const afp = (functions /*: Array<() => Promise<any>> */) /*: Promise<AFP> */ => {
    return Promise.resolve({
        sequence: () => sequence(functions),
        delay: ms => sequence(functions.map(fn => () => fn().then(v => sleep(ms, v)))),
        //throttle: () => {},
        all: () => {
            return Promise.all(functions.map(v => v()));
        },
    });
};

module.exports = afp;
