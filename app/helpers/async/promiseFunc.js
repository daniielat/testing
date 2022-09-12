module.exports = function promiseFunc(bool) {
    return new Promise((resolve, reject) => {
        if(bool) {
            resolve('Success.');
        }
        reject('Error.');
    });
}
