function myInstanceof(left, right) {
    if (!left) {
        return false
    }

    return (
        left.__proto__ === right.prototype || myInstanceof(left.__proto__, right)
    )
}

function Person() { }
function Apple() { }

const p = new Person()

console.log(myInstanceof(p, Person))