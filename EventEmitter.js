class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(event, fn) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(fn)
        return this
    }

    emit(event, ...args) {
        if (!this.events[event]) {
            return
        }
        this.events[event].forEach(fn => {
            fn.apply(this, args)
        })
        return this
    }

    off(event, fn) {
        if (!this.events[event]) {
            return
        }
        this.events[event] = this.events[event].filter(callback => callback !== fn)
        return this
    }

    once(event, fn) {
        const onceFn = (...args) => {
            fn.apply(this, args)
            this.off(event, onceFn)
        }
        this.on(event, onceFn)
        return this
    }
}

console.log('=== EventEmitter 测试用例 ===\n')

const emitter = new EventEmitter()

console.log('1. 测试 on 和 emit - 基本事件订阅与发布')
let callCount = 0
emitter.on('test', () => {
    callCount++
    console.log('   test 事件被触发')
})
emitter.emit('test')
console.log(`   调用次数: ${callCount} (期望: 1)\n`)

console.log('2. 测试 emit 传递参数')
emitter.on('greet', (name, age) => {
    console.log(`   你好, ${name}, 今年 ${age} 岁`)
})
emitter.emit('greet', '张三', 25)
console.log()

console.log('3. 测试多个监听器')
let count1 = 0, count2 = 0
emitter.on('multi', () => { count1++ })
emitter.on('multi', () => { count2++ })
emitter.emit('multi')
console.log(`   监听器1调用: ${count1}, 监听器2调用: ${count2} (期望: 1, 1)\n`)

console.log('4. 测试 off - 取消订阅')
let offCount = 0
const handler = () => { offCount++ }
emitter.on('off-test', handler)
emitter.emit('off-test')
emitter.off('off-test', handler)
emitter.emit('off-test')
console.log(`   调用次数: ${offCount} (期望: 1)\n`)

console.log('5. 测试 once - 单次订阅')
let onceCount = 0
emitter.once('once-test', () => {
    onceCount++
    console.log('   once 事件被触发')
})
emitter.emit('once-test')
emitter.emit('once-test')
console.log(`   调用次数: ${onceCount} (期望: 1)\n`)

console.log('6. 测试链式调用')
const chainEmitter = new EventEmitter()
chainEmitter.on('chain', () => { })
    .on('chain2', () => { })
    .emit('chain')
    .off('chain', () => { })
console.log('   链式调用成功\n')

console.log('7. 测试不存在的事件')
emitter.emit('non-existent')
console.log('   不存在的事件不会报错\n')

console.log('8. 测试复杂场景 - 购物车示例')
const cart = new EventEmitter()
let cartItems = []

cart.on('add', (item) => {
    cartItems.push(item)
    console.log(`   添加商品: ${item}`)
})

cart.on('remove', (item) => {
    cartItems = cartItems.filter(i => i !== item)
    console.log(`   移除商品: ${item}`)
})

cart.once('checkout', () => {
    console.log(`   结账, 购物车商品: ${cartItems.join(', ')}`)
})

cart.emit('add', '苹果')
cart.emit('add', '香蕉')
cart.emit('remove', '苹果')
cart.emit('checkout')
cart.emit('checkout')
console.log()

console.log('=== 所有测试完成 ===')