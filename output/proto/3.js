var F = function () { };
Object.prototype.a = function () {
    console.log('a');
};
Function.prototype.b = function () {
    console.log('b');
}
var f = new F();
f.a();
f.b();
F.a();
F.b()

/**
 * browser
 * a
 * TypeError: f.b is not a function
 * a
 * b
 */

/**
 * node
 * a
 * TypeError: f.b is not a function
 * a
 * b
 */