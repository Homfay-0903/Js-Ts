var length = 10;
function fn() {
    console.log(this.length);
}

var obj = {
    length: 5,
    method: function (fn) {
        fn();
        arguments[0]();
    }
};

obj.method(fn, 1);

/**
 * browser
 * 10
 * 2
 */

/**
 * node
 * undefined
 * 2
 */