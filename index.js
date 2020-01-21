//@flow strict
//@format

const afp = require('./src/afp');
const exists = require('./src/exists');
const fetch = require('./src/fetch');
const read = require('./src/read');
const rm = require('./src/rm');
const run = require('./src/run');
const sleep = require('./src/sleep');
const touch = require('./src/touch');
const write = require('./src/write');

module.exports = {
    afp,
    exists,
    fetch,
    read,
    rm,
    run,
    sleep,
    touch,
    write,
};
