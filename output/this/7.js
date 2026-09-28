var myObject = {
    foo: "bar",
    func: function () {
        var self = this;
        console.log(this.foo);
        console.log(self.foo);
        (function () {
            console.log(this.foo);
            console.log(self.foo);
        }());
    }
};

//var foo = "something"
//global.foo = "something";

myObject.func();

/**
 * browser
 * bar
 * bar
 * undefined
 * bar
 */

/**
 * node
 * bar
 * bar
 * undefined
 * bar
 */