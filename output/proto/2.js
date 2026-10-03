// a
function Foo() {
    getName = function () {
        console.log(1);
    }
    return this;
}
// b
Foo.getName = function () {
    console.log(2);
}
// c
Foo.prototype.getName = function () {
    console.log(3);
}
// d
var getName = function () {
    console.log(4);
}
// e
function getName() {
    console.log(5);
}

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

/**
 * browser
 * 2
 * 4
 * 1
 * 1
 * 2
 * 3
 * 3
 */

/**
 * node
 * 2
 * 4
 * TypeError: global.getName is not a function
 */