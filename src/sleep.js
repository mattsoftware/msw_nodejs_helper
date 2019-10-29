//@flow strict
//@format

module.exports = (ms /*: number */, value /*: any */) => {
    return new Promise(res => setTimeout(res, ms)).then(v => value);
};
