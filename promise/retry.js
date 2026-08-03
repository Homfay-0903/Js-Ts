/*
// 示例：模拟一个可能失败的请求，成功率 30%
let attempt = 0;
function unstableRequest() {
    return new Promise((resolve, reject) => {
        attempt++;
        console.log(`尝试 ${attempt}`);
        Math.random() < 0.1 ? resolve('成功') : reject('失败');
    });
}

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
*/

/**实现一个重复请求的函数，成功为止 */
function unstableRequest(retryIdx) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`尝试 ${retryIdx}`)
            Math.random() < 0.1 ? resolve('成功') : reject('失败')
        }, 1000)

    })
}

async function retry(reqFn, retryCount) {
    for (let i = 0; i < retryCount; i++) {
        try {
            const res = await reqFn(i)
            return res
        } catch (error) {
            console.log(error)
        } finally {
             console.log(`defeat, have ${retryCount - i - 1} times only`)

            if (i === retryCount) {
                return 'no retry count'
            }
        }
    }
}

retry(unstableRequest, 3).then(console.log).catch(console.error)