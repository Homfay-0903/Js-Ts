var a = 10
var obj = {
    a: 20,
    say: () => {
        console.log(this.a)
    }
}
obj.say()

var anotherObj = { a: 30 }
obj.say.apply(anotherObj)

/**
 * browser
 * 10
 * 10
 */

/**
 * node
 * undefined
 * undefined
 */