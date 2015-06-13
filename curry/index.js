module.exports = function(fn) {

    function eat(args) {
        return function () {
            vargs = args.concat(Array.prototype.slice.call(arguments));
            if(vargs.length >= fn.length) {
                return fn.apply(null, vargs);
            } else {
                return eat(vargs);
            }
        }
    }

    return eat([]);
}