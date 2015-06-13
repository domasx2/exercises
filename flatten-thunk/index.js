module.exports = function(thunk) {
    return function (cb) {
        function  flatten(thunk) {
            thunk(function(err, result) {
                if(err || typeof result !== 'function') {
                    cb(err, result);
                } else {
                    flatten(result);
                }
            });
        }
        flatten(thunk);
    }
}