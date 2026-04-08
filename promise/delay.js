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