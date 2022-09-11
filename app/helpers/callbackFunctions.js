exports.invokeCallback = function invokeCallback(cb) {
    cb();
    return 1;
}

exports.invokeCallbackWithArgs = function invokeCallbackWithArgs(arg, cb) {
    cb(arg);
    return 1;
}
