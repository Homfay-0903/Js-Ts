/*
function fetchWithTimeout(url, timeoutMs) {
    // TODO: 使用 fetch(url) 和 Promise.race 实现超时
    const timeoutPromise = new Promise((_resolved, reject) => {
        setTimeout(() => {
            reject(new Error('error here'))
        }, timeoutMs)
    })

    return Promise.race([
        fetch(url),
        timeoutPromise
    ])
}

// 测试（用真实 URL 或 mock）
fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 5000)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error('错误:', err.message));
*/

/**实现请求函数，超时则终止 */
function fetchWithTimeout(yourFetch, timeout) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject('timeout fetch')
        }, timeout)
    })

    return Promise.race([yourFetch, timeoutPromise])
}

function mockFetch() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve('success')
            } catch (error) {
                reject(error)
            }
        }, 500)
    })
}

fetchWithTimeout(mockFetch(), 1000)
    .then(
        (res) => console.log(res),
        (err) => console.log(err)
    )