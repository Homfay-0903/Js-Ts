function sleep(ms) {
    /* 实现延迟 */
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
// 期望输出：A (1秒后) B (1秒后) A (1秒后) B (1秒后) A