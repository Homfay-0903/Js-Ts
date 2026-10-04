var A = { n: 4399 };
var B = function () { this.n = 9999 };
var C = function () { var n = 8888 };
B.prototype = A;
C.prototype = A;
var b = new B();
var c = new C();
A.n++
console.log(b.n);
console.log(c.n);

/**
 * browser
 * 9999
 * 4400
 */

/**
 * node
 * 9999
 * 4400
 */