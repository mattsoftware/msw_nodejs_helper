'use strict';
//@flow strict
/*:: import type { JestMockT } from 'jest' */
module.exports = (jest/*:JestMockT*/).fn((path) => Promise.reject(new Error('No mock setup')));

