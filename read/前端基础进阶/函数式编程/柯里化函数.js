/**
 * Created by zdnexus on 17/8/9.
 */
'use strict';

// 返回一个函数，
// 该函数在调用时将参数的顺序颠倒过来。
function flip(fn) {
    return function () {
        var args = [].slice.call(arguments);
        return fn.apply(this, args.reverse());
    };
}

// 返回一个新函数，
// 从右到左柯里化原始函数的参数。
function rightCurry(fn, n) {
    var arity = n || fn.length,
        fn = flip(fn);
    return function curried() {
        var args = [].slice.call(arguments),
            context = this;
        return args.length >= arity ?
            fn.apply(context, args.slice(0, arity)) :
            function () {
                var rest = [].slice.call(arguments);
                return curried.apply(context, args.concat(rest));
            };
    };
}