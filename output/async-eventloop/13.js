Promise.resolve('1')
    .then(res => {
        console.log(res)
    })
    .finally(() => {
        console.log('finally')
    })
Promise.resolve('2')
    .finally(() => {
        console.log('finally2')
        return '我是finally2返回的值'
    })
    .then(res => {
        console.log('finally2后面的then函数', res)
    })

/**
 * 1
 * finally2
 * finally
 * finally2后面的then函数 2
 */

Promise.resolve('1')
    .finally(() => {
        console.log('finally1')
        throw new Error('我是finally中抛出的异常')
    })
    .then(res => {
        console.log('finally后面的then函数', res)
    })
    .catch(err => {
        console.log('捕获错误', err)
    })

/**
 * finally1
 * 捕获错误 Error 我是finally中抛出的异常
 */