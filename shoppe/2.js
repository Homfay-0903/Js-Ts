function Foo() {
    log = function () {
        console.log(1);
    };
    return this;
}
Foo.log = function () {
    console.log(2);
};
Foo.prototype.log = function () {
    console.log(3);
};
var log = function () {
    console.log(4);
};
function log() {
    console.log(5);
};

Foo.log();
log();
Foo().log();
log();
new Foo.log();
new Foo().log();

/**
 * 2
 * 4
 * 1
 * 1
 * 2
 * 3
 */