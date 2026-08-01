/*
function printf() {
    console.log('1 2 3 4 5')
}

function cycle(callback, delay) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                callback && callback()
                resolve()
            }, delay)
        } catch (error) {
            reject(error)
        }
    })
}

async function test() {
    await cycle(printf, 1000)
}

async function startLoop() {
    while (true) {
        await test() // 等待上一次定时器触发后，才会进入下一次 while 循环
    }
}

// 启动循环
startLoop()
*/


/**实现一个每隔 n 秒打印内容的函数 */
function printf() {
    console.log('hello, world')
}

function cycle(callback, delay) {
    return new Promise((resolve, reject) => {
        if (typeof delay !== "number" || delay < 0) {
            reject(new Error('invalid delay'))
            return
        }

        setTimeout(() => {
            try {
                if (typeof callback === "function") {
                    callback()
                }

                resolve()
            } catch (error) {
                reject(error)
            }
        }, delay)
    })
}

async function startLoop(params) {
    try {
        while (true) {
            await cycle(printf, 1000)
        }
    } catch (error) {
        console.log('error is:', error)
    }

}

startLoop()

