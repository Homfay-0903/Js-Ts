//实现一个函数a，使其奇数次调用时返回1，偶数次调用时返回2（不能使用全局变量）：
const a = (function () {
    let count = 0
    return function () {
        count++
        return count % 2 === 1 ? 1 : 2
    }
})()

// example
console.log(a()); // 1
console.log(a()); // 2
console.log(a()); // 1
console.log(a()); // 2