/*
function sleep(timeout) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, timeout)
        } catch (error) {
            reject(error)
        }
    })
}

async function test(timeout) {
    console.log('1')
    await sleep(timeout)
    console.log('2')
}
*/

/**实现休眠函数 */
function sleep(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve()
            } catch (error) {
                reject(error)                
            }
        }, delay)
    })
}

async function test(delay) {
    console.log('1')
    await sleep(delay)
    console.log('2')
}

test(2000)