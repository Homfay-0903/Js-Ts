async function fetchSequentially() {
    try {
        const res = []
        let curFetchId = 1

        for (let i = 0; i < 3; i++) {
            const response = await fetch(`https://example.com{currentId}`)
            const data = await response.json()

            res.push(data)
            curFetchId = data.nextId
        }

        console.log("三次请求全部完成:", res)
        return res
    } catch (error) {
        console.error("请求过程中出错:", error)
    }
}

async function fetchInParallel() {
    try {
        // 构造3个独立的请求 Promise
        const request1 = fetch('https://example.com').then(res => res.json())
        const request2 = fetch('https://example.com').then(res => res.json())
        const request3 = fetch('https://example.com').then(res => res.json())

        // 同时发送，等待全部成功
        const [data1, data2, data3] = await Promise.all([request1, request2, request3])

        console.log("三次请求全部完成:", data1, data2, data3)
        return [data1, data2, data3]
    } catch (error) {
        console.error("其中任意一个请求失败:", error)
    }
}
