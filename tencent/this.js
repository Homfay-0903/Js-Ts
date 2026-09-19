var a = 10;
let b = 20;
const obj = {
    a: 1,
    b: 2,
    foo: function () {
        console.log(this.a, this.b); // 情况一
    },
    bar: () => {
        console.log(this.a, this.b); // 情况二
    }
};
obj.foo();
obj.bar();
const { foo, bar } = obj;
foo();
bar();

/**
 * node
 * 1 2
 * unde unde 
 * unde unde 
 * unde unde 
 */

/**
 * browser
 * 1 2
 * 10 unde
 * 10 unde
 * 10 unde
 */