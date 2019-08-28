'use strict';
//@flow strict

const fs = require('fs');

const touch = (path/*:string*/)/*:Promise<boolean>*/ => {
    const time = new Date();
    return new Promise((res, rej) => {
        fs.utimes(path, time, time, err => {
            if (err) {
                fs.open(path, 'w', (err, fd) => {
                    if (err) {
                        rej(err);
                    } else {
                        fs.close(fd, err => {
                            if (err) {
                                rej(err);
                            } else {
                                res(true);
                            }
                        });
                    }
                });
            } else {
                res(true);
            }
        });
    });
};

module.exports = touch;

