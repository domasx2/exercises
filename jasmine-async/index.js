module.exports = function(fn){
    var okay = fn();
    it(okay.desc, function () {
        var done = false;
        runs(function() {
            okay.setup(function () {
                done = true;
            });
        });

        waitsFor(function() {
            return done == true;
        });

        runs(okay.test);
    });
};