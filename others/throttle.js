/*
function throttle(fn, delay = 500) {
    let lastTime = 0

    return (...args) => {
        const now = Date.now()

        if (now - lastTime < delay) {
            return
        }

        lastTime = now
        fn(...args)
    }
}

function search(keyword) {
    console.log('sueecss', keyword)
}

const throttleSearch = throttle(search, 5000)

while (true) {
    throttleSearch('this content')
}
*/

/**实现节流函数 */
function throttle(func, wait) {
    let timer = null
    let previous = 0
    let lastArgs = null
    let lastContext = null

    function throttled(...args) {
        const context = this
        const now = Date.now()
        const remaining = wait - (now - previous)

        if (remaining <= 0 || remaining > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }

            previous = now
            func.apply(context, args)
            lastArgs = null
            lastContext = null
        } else if (!timer) {
            lastArgs = args
            lastContext = context
            timer = setTimeout(() => {
                previous = Date.now()
                timer = null
                if (lastArgs) {
                    func.apply(lastContext, lastArgs)
                    lastArgs = null
                    lastContext = null
                }
            }, remaining)
        } else {
            lastArgs = args
            lastContext = context
        }
    }

    throttled.cancel = function () {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        previous = 0
        lastArgs = null
        lastContext = null
    }

    return throttled
}

// ==================== 测试代码 ====================

// 测试1: 基本节流功能
console.log('=== 测试1: 基本节流功能 ===')
let count = 0
const increment = throttle(() => {
    count++
    console.log('计数器:', count)
}, 300)

// 快速连续调用
increment()
increment()
increment()
console.log('立即调用3次后，count:', count) // 应该是 1（立即执行第一次）

setTimeout(() => {
    console.log('100ms后，count:', count)
}, 100)

setTimeout(() => {
    console.log('400ms后，count:', count) // 可能是 2（trailing 执行）
}, 400)

// 测试2: 参数传递
console.log('\n=== 测试2: 参数传递 ===')
const logArgs = throttle((...args) => {
    console.log('接收到的参数:', args)
}, 200)

logArgs('a', 1)
logArgs('b', 2)
logArgs('c', 3)

setTimeout(() => {
    logArgs('d', 4)
}, 300)

// 测试3: 时间间隔控制
console.log('\n=== 测试3: 时间间隔控制 ===')
let timeCount = 0
const timeFn = throttle(() => {
    timeCount++
    console.log(`第${timeCount}次执行，时间: ${Date.now()}`)
}, 500)

const startTime = Date.now()
timeFn() // 立即执行

setTimeout(() => {
    timeFn() // 200ms时调用，应该被节流
    console.log(`200ms时调用，timeCount: ${timeCount}`)
}, 200)

setTimeout(() => {
    timeFn() // 600ms时调用，应该执行
    console.log(`600ms时调用，timeCount: ${timeCount}`)
}, 600)

setTimeout(() => {
    timeFn() // 1200ms时调用，应该执行
    console.log(`1200ms时调用，timeCount: ${timeCount}`)
}, 1200)

// 测试4: cancel 方法
console.log('\n=== 测试4: cancel 方法 ===')
let cancelCount = 0
const cancelFn = throttle(() => {
    cancelCount++
    console.log('cancel测试:', cancelCount)
}, 300)

cancelFn() // 立即执行
console.log('第一次调用后，cancelCount:', cancelCount) // 应该是 1

cancelFn() // 被节流，但会设置定时器
cancelFn.cancel() // 取消定时器

setTimeout(() => {
    console.log('取消后300ms，cancelCount:', cancelCount) // 应该还是 1
}, 400)

// 测试5: this 上下文
console.log('\n=== 测试5: this 上下文 ===')
const obj = {
    name: '测试对象',
    greet: throttle(function () {
        console.log('Hello, 我是', this.name)
    }, 200)
}

obj.greet()
setTimeout(() => {
    obj.greet()
}, 500)

// 测试6: 连续调用场景（模拟滚动事件）
console.log('\n=== 测试6: 模拟滚动事件 ===')
const handleScroll = throttle((position) => {
    console.log('滚动位置:', position)
}, 300)

// 模拟快速滚动
let scrollCount = 0
const scrollInterval = setInterval(() => {
    scrollCount++
    handleScroll(scrollCount * 100)

    if (scrollCount >= 10) {
        clearInterval(scrollInterval)
        console.log('滚动模拟结束')
    }
}, 100)

// 测试7: leading 和 trailing 行为
console.log('\n=== 测试7: leading 和 trailing 行为 ===')
let ltCount = 0
const ltFn = throttle(() => {
    ltCount++
    console.log(`lt执行次数: ${ltCount}, 时间: ${Date.now()}`)
}, 400)

// 第一次调用（leading）
ltFn()
console.log('第一次调用（leading）')

// 在冷却期内多次调用（trailing）
setTimeout(() => ltFn(), 100)
setTimeout(() => ltFn(), 200)
setTimeout(() => ltFn(), 300)

// 冷却期结束后调用
setTimeout(() => {
    ltFn()
    console.log('冷却期后调用')
}, 500)

setTimeout(() => {
    console.log('\n=== 所有测试完成 ===')
    console.log(`最终计数: count=${count}, timeCount=${timeCount}, cancelCount=${cancelCount}, ltCount=${ltCount}`)
}, 3000)