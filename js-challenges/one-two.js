/*function printf() {
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
startLoop()*/

for (let i = 1; i < 6; i++) {
    setTimeout(() => {
        console.log(i)
    }, i * 1000)
}