/*
// 你的代码
function delay(ms) {
    // TODO
    return new Promise(resloved => setTimeout(resloved, ms))
}

// 使用示例
//delay(5000).then(() => console.log("Done"));

async function run(params) {
    console.log('start')
    await delay(params)
    console.log('end')
}

run(3000)
*/

/**实现一个暂停函数 */
function abort(delay) {
    return new Promise(resolve => setTimeout(resolve, delay))
}

async function run(delay) {
    console.log('start')
    await abort(delay)
    console.log('end')
}

run(1000)