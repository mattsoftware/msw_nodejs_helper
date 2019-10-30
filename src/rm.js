//@flow strict
//@format

const {promisify} = require('util');
const fs = require('fs');

const rm = (path /*: string */) /*: Promise<boolean> */ => {
    return promisify(fs.unlink)(path)
        .then(r => true)
        .catch(err => false);
};

module.exports = rm;
