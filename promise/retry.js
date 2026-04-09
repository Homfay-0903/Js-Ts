// 示例：模拟一个可能失败的请求，成功率 30%
let attempt = 0;
function unstableRequest() {
    return new Promise((resolve, reject) => {
        attempt++;
        console.log(`尝试 ${attempt}`);
        Math.random() < 0.1 ? resolve('成功') : reject('失败');
    });
}

/*function retry(fn, retries) {
    // TODO
    return fn().catch((err) => {
        if (retries > 0) {
            retries--
            console.log(`defeat, have ${retries} times only`)
            return retry(fn, retries)
        } else {
            throw err
        }
    })
}*/

async function retry(fn, retries) {
    for (let i = 0; i < retries + 1; i++) {
        try {
            const result = await fn()
            return result
        } catch (err) {
            if (i === retries) {
                throw err
            }

            console.log(`defeat, have ${retries - i - 1} times only`)
        }
    }
}

retry(unstableRequest, 3).then(console.log).catch(console.error);