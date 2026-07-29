/*
function myInstanceof(left, right) {
    if (!left) {
        return false
    }

    return (
        left.__proto__ === right.prototype || myInstanceof(left.__proto__, right)
    )
}
*/

/**实现 instanceof 方法 */
function myInstanceof(left, right) {
    if (!left) {
        return false
    }

    return left.__proto__ === right.prototype || myInstanceof(left.__proto__, right)
}


function Person() { }
function Apple() { }

const p = new Person()

console.log(myInstanceof(p, Apple))