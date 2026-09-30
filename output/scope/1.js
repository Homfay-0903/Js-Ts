(function () {
    var x = y = 1;
})();
var z;

console.log(y);
console.log(z);
console.log(x);

/**
 * browser
 * 1
 * undefined
 * ReferenceError: x is not defined
 */

/**
 * node
 * 1
 * undefined
 * ReferenceError: x is not defined
 */