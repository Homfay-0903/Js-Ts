/*
function sleep(ms) {
    /* 实现延迟 
    return new Promise(reslove => setTimeout(reslove, ms))
}

async function alternateLogs(a, b) {
    // TODO
    for (let i = 0; i < 5; i++) {
        await sleep(1000)

        if (i % 2 === 0) {
            console.log(a)
        } else {
            console.log(b)
        }
    }
}

alternateLogs('A', 'B');
*/

/**实现函数：期望输出：A (1秒后) B (1秒后) A (1秒后) B (1秒后) A */ 
function abort(delay) {
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

let flag = 0
async function alternateLogs() {
    await abort(1500)

    if (flag % 2 === 0) {
        console.log('a')
    } else {
        console.log('b')
    }

    flag++
}

async function loop () {
    while(true) {
       await alternateLogs()
    }
}

loop()
