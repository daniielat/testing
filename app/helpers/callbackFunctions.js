exports.invokeCallback = function invokeCallback(cb) {
    cb();
    return 1;
}

exports.invokeCallbackWithArgs = function invokeCallbackWithArgs(arg, cb) {
    cb(arg);
    return 1;
}

exports.forEach = function forEach(array, cb) {
    for(let i = 0; i < array.length; i++) {
        cb(array[i]);
    }
}
