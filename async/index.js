
exports.sequence = function(tasks) {
    return function(cb) {
        if (!tasks.length) {
            cb();
        }

        var index = 0;

        function next(data) {
            if (index < tasks.length) {
                tasks[index++](function(err, result) {
                    if (err) {
                        cb(err);
                    } else {
                        next(result);
                    }
                }, data);
            } else {
                cb(null, data);
            }
        }

        next();
    };
}

exports.parallel = function(tasks) {
    return function(cb) {
        var result = [],
            finished = 0,
            errors = [];

        tasks.forEach(function(task, idx) {
            task(function(err, data) {
                if (err) {
                    errors[idx] = err;
                } else {
                    result[idx] = data;
                }

                if(++finished == tasks.length) {
                    cb(errors.length ? errors : null, result);
                }
            });
        });
    }
}

exports.race = function(tasks) {
    return function(cb) {
        var returned = false;
        tasks.forEach(function(task) {
            task(function(err, data) {
                if(!returned) {
                    cb(err, data);
                    returned = true;
                }
            });
        });
    }
}