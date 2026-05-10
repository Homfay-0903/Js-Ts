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
