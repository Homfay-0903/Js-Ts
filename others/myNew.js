function myNew(constructor, ...args) {
    //const obj = Object.create(constructor.prototype)
    //const result = constructor.apply(obj, args)
    const instance = {}
    instance.__proto__ = constructor.prototype
    const result = constructor.apply(instance, args)

    return (result !== null && (typeof result === 'function' || typeof result === 'object')
        ? result
        : instance)
}

function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype.sayHi = function () {
    return `hi, ${this.name}`
}

const p = myNew(Person, 'alice', 20)
console.log(p.name)
console.log(p.sayHi())