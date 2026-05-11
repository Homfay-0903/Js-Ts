function limitConcurrency(urls, maxLimit, fetchFn) {
    return new Promise((resolve) => {
        const result = []
        let index = 0
        let finishedCount = 0

        const next = () => {
            if (index >= urls.length) {
                return
            }

            const currentIndex = index++
            const url = urls[currentIndex]

            fetchFn(url).then(res => {
                result[currentIndex] = res
            }).catch(err => {
                result[currentIndex] = err
            }).finally(() => {
                finishedCount++
                if (finishedCount === urls.length) {
                    resolve(result)
                } else {
                    next()
                }
            })
        }

        const startCount = Math.min(urls.length, maxLimit)
        for (let i = 0; i < startCount; i++) {
            next()
        }
    })
}

const mockFetch = (url) => {
    console.log(`🚀 开始请求: ${url}`)
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`✅ 完成请求: ${url}`)
            resolve(`result for ${url}`)
        }, Math.random() * 3000)
    })
}
limitConcurrency(['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8'], 3, mockFetch).then(console.log)