'use strict';
//@flow strict
const {spawn} = require('child_process');

const run = (cmd/*:string*/, args/*:Array<string>*/, options/*:?child_process$spawnOpts*/)/*:Promise<{stdout: string, stderr: string, code: number}>*/ => {
    return new Promise((res, rej) => {
        //$FlowFixMe
        const c = spawn(cmd, args, options);
        let stdout = '';
        let stderr = '';
        c.stdout.on('data', d => (stdout += d));
        c.stderr.on('data', d => (stderr += d));
        c.on('close', code => res({stdout, stderr, code}));
        c.on('error', err => rej(err));
    });
};

module.exports = run;

