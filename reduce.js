Array.prototype.myReduce = function (callback, initialValue) {
    if (this === null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }

    const arr = this
    const len = arr.length

    if (len === 0 && arguments.length < 2) {
        throw new TypeError('Reduce of empty array with no initial value')
    }

    let accumulator = null
    let startIndex = 0

    if (arguments.length >= 2) {
        accumulator = initialValue
        startIndex = 0
    } else {
        accumulator = arr[0]
        startIndex = 1
    }

    for (let i = startIndex; i < len; i++) {
        if (i in arr) {
            accumulator = callback(accumulator, arr[i], i, arr)
        }
    }

    return accumulator
}

const numbers = [1, 2, 3, 4, 5];

// 测试 1：带初始值的累加
const sum1 = numbers.myReduce((acc, cur) => acc + cur, 0);
console.log('测试1 - 累加(初始值0):', sum1); // 预期输出: 15

// 测试 2：不带初始值（应该拿数组第一个元素当初始值）
const sum2 = numbers.myReduce((acc, cur) => acc + cur);
console.log('测试2 - 累加(无初始值):', sum2); // 预期输出: 15

// 测试 3：处理复杂对象（比如数组转对象）
const users = [{ name: 'A', age: 20 }, { name: 'B', age: 25 }];
const userObj = users.myReduce((acc, cur) => {
    acc[cur.name] = cur.age;
    return acc;
}, {});
console.log('测试3 - 数组转对象:', userObj); // 预期输出: { A: 20, B: 25 }

// 测试 4：空数组且无初始值（预期报错）
try {
    [].myReduce((acc, cur) => acc + cur);
} catch (e) {
    console.log('测试4 - 空数组报错拦截:', e.message);
}