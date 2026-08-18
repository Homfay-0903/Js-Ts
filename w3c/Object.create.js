function myCreate(obj) {
    function fn() { }
    fn.prototype = obj
    return new fn()
}

const animal = {
    name: 'jack',
    walk() {
        console.log('walking...')
    }
}

const dog = myCreate(animal)

dog.wolf = function () {
    console.log('woof')
}

console.log(dog.name)
dog.walk()
dog.wolf()