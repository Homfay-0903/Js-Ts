/*
function debounce(fn, delay = 500) {
    let timer = null;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// 1. 你要防抖的函数
function search(keyword) {
    console.log("发送搜索请求：", keyword);
}

// 2. 用 debounce 包裹一下，变成防抖版
const debounceSearch = debounce(search, 500);

// 3. 使用：连续调用只会执行最后一次
debounceSearch("a");
debounceSearch("ap");
debounceSearch("app");
debounceSearch("apple");
debounceSearch("apple123");

// 结果：只打印一次 → 发送搜索请求：apple
*/

/**实现防抖函数 */
function debounce(func, wait, immediate = false) {
    let timer = null

    function debounced(...args) {
        const context = this

        if (timer) {
            clearTimeout(timer)
        }

        if (immediate) {
            const callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)

            if (callNow) {
                func.apply(context, args)
            }
        } else {
            timer = setTimeout(() => {
                func.apply(context, args)
                timer = null
            }, wait)
        }
    }

    debounced.cancel = function () {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    }

    return debounced
}

// ==================== 测试代码 ====================

// 测试1: 基本防抖功能
console.log('=== 测试1: 基本防抖功能 ===')
let count = 0
const increment = debounce(() => {
    count++
    console.log('计数器:', count)
}, 300)

increment()
increment()
increment()
console.log('立即调用3次后，count:', count) // 应该是 0

setTimeout(() => {
    console.log('300ms后，count:', count) // 应该是 1
}, 400)

// 测试2: 参数传递
console.log('\n=== 测试2: 参数传递 ===')
const logArgs = debounce((...args) => {
    console.log('接收到的参数:', args)
}, 200)

logArgs('a', 1)
logArgs('b', 2)
logArgs('c', 3)

setTimeout(() => {
    console.log('参数测试完成')
}, 500)

// 测试3: 立即执行模式
console.log('\n=== 测试3: 立即执行模式 ===')
let immediateCount = 0
const immediateFn = debounce(() => {
    immediateCount++
    console.log('立即执行计数:', immediateCount)
}, 500, true) // immediate = true

immediateFn() // 应该立即执行
console.log('立即执行后，immediateCount:', immediateCount) // 应该是 1

immediateFn() // 在500ms内再次调用，不会执行
immediateFn()
console.log('再次调用后，immediateCount:', immediateCount) // 应该还是 1

setTimeout(() => {
    console.log('500ms后，immediateCount:', immediateCount) // 应该还是 1
    immediateFn() // 现在可以再次立即执行
    console.log('延迟后再次调用，immediateCount:', immediateCount) // 应该是 2
}, 600)

// 测试4: cancel 方法
console.log('\n=== 测试4: cancel 方法 ===')
let cancelCount = 0
const cancelFn = debounce(() => {
    cancelCount++
    console.log('cancel测试:', cancelCount)
}, 300)

cancelFn()
cancelFn.cancel() // 取消定时器

setTimeout(() => {
    console.log('取消后300ms，cancelCount:', cancelCount) // 应该是 0
}, 400)

// 测试5: this 上下文
console.log('\n=== 测试5: this 上下文 ===')
const obj = {
    name: '测试对象',
    greet: debounce(function () {
        console.log('Hello, 我是', this.name)
    }, 200)
}

obj.greet()
setTimeout(() => {
    obj.greet()
}, 500)

// 测试6: 连续调用场景（模拟搜索输入）
console.log('\n=== 测试6: 模拟搜索输入 ===')
const search = debounce((keyword) => {
    console.log('搜索关键词:', keyword)
}, 500)

// 模拟用户快速输入
search('a')
setTimeout(() => search('ap'), 100)
setTimeout(() => search('app'), 200)
setTimeout(() => search('apple'), 300)

setTimeout(() => {
    console.log('\n=== 所有测试完成 ===')
}, 2000)