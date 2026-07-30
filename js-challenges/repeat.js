/*
function delayExecute(func, args, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const result = func(...args)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        }, timeout)
    })
}

function myRepeat(func, count, timeout) {
    return async function (...args) {
        const results = []
        for (let i = 0; i < count; i++) {
            const result = await delayExecute(func, args, timeout)
            results.push(result)
        }
        return results
    }
}


const repeatLog = myRepeat(console.log, 5, 1000)
repeatLog('hello', 'world', '!')
*/

/**实现一个每 n 秒执行一次的函数，执行 m 次后终止 */
function executor(callback, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            callback()
            resolve()
        }, delay)
    })
}

function printf() {
    console.log('hello, world')
}

async function repeat(n, delay) {
    for (let i = 0; i < n; i++) {
        await executor(printf, delay)
    }
}

repeat(5, 1000)