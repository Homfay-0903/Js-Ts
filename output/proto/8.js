function Parent() {
    this.a = 1;
    this.b = [1, 2, this.a];
    this.c = { demo: 5 };
    this.show = function () {
        console.log(this.a, this.b, this.c.demo);
    }
}

function Child() {
    this.a = 2;
    this.change = function () {
        this.b.push(this.a);
        this.a = this.b.length;
        this.c.demo = this.a++;
    }
}

Child.prototype = new Parent();
var parent = new Parent();
var child1 = new Child();
var child2 = new Child();
child1.a = 11;
child2.a = 12;
parent.show();
child1.show();
child2.show();
child1.change();
child2.change();
parent.show();
child1.show();
child2.show();

/**
 * brower
 * 1 [1 2 1] 5
 * 11 [1 2 1] 5
 * 12 [1 2 1] 5
 * 1 [1 2 1] 5
 * 5 [1 2 1 11 12] 5
 * 6 [1 2 1 12 12] 5
 */

/**
 * node
 * 1 [1 2 1] 5
 * 11 [1 2 1] 5
 * 12 [1 2 1] 5
 * 1 [1 2 1] 5
 * 5 [1 2 1 11 12] 5
 * 6 [1 2 1 12 12] 5
 */