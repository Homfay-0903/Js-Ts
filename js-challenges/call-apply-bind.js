Function.prototype.myCall = function (obj, ...args) {
    obj = (obj === undefined || obj === null) ? window : obj
    obj.fn = this

    const res = obj.fn(...args)
    delete obj.fn

    return res
}

Function.prototype.myApply = function (obj, args) {
    obj = (obj === undefined || obj === null) ? window : obj
    obj.fn = this

    const res = obj.fn(...args)
    delete obj.fn

    return res
}

Function.prototype.myBind = function (obj, ...args1) {
    obj = (obj === undefined || obj === null) ? window : obj
    const cacheThis = this

    return function (...args2) {
        obj.fn = cacheThis

        const res = obj.fn(...[...args1, ...args2])
        delete obj.fn

        return res
    }
}

function introduce(age, city) {
    console.log(`我是${this.name}，今年${age}岁，来自${city}`)
}

const person = {
    name: 'jack'
}

// myCall
introduce.myCall(person, 25, '北京')
// 输出：我是王五，今年25岁，来自北京

// myApply
introduce.myApply(person, [25, '北京'])
// 输出：我是王五，今年25岁，来自北京

// myBind
const boundFunc = introduce.myBind(person, 25)
boundFunc('北京')
// 输出：我是王五，今年25岁，来自北京

/*
Function.prototype.myCall = function (context, ...args) {
    context = (context === undefined || context === null) ? window : context
    context.__fn = this
    let result = context.__fn(...args)
    delete context.__fn
    return result
}
Function.prototype.myApply = function (context, args) {
    context = (context === undefined || context === null) ? window : context
    context.__fn = this
    let result = context.__fn(...args)
    delete context.__fn
    return result
}
Function.prototype.myBind = function (context, ...args1) {
    context = (context === undefined || context === null) ? window : context
    let _this = this
    return function (...args2) {
        context.__fn = _this
        let result = context.__fn(...[...args1, ...args2])
        delete context.__fn
        return result
    }
}
*/