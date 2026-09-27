var obj = {
    say: function () {
        var f1 = () => {
            console.log("1111", this);
        }
        f1();
    },
    pro: {
        getPro: () => {
            console.log(this);
        }
    }
}
var o = obj.say;
o();
obj.say();
obj.pro.getPro();

/**
 * browser
 * 1111 window 对象
 * 1111 obj 对象
 * window 对象
 */

/**
 * node
 * 1111 global 对象
 * 1111 obj 对象
 * global 对象
 */