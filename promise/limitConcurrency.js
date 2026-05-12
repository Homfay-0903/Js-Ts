function limitConcurrency(urls, maxLimit, fetchFn) {
    return new Promise((resolve) => {
        const result = []
        let index = 0
        let finishedCount = 0

        const next = () => {
            if (index > urls.length) {
                return
            }

            const currentIndex = index++
            const url = urls[currentIndex]

            fetchFn(url).then((res) => {
                result[currentIndex] = res
            }).catch((err) => {
                result[currentIndex] = err
            }).finally(() => {
                finishedCount++

                if (finishedCount === urls.length) {
                    resolve(result)
                }
                next()
            })
        }

        const startCount = Math.min(urls.length, maxLimit)
        for (let i = 0; i < startCount; i++) {
            next()
        }
    })
}

const mockFetch = (url) => {
    console.log(`start fetch, ${url}`)
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`finish fetch, ${url}`)
            resolve(`result for ${url}`)
        }, Math.random() * 2000)
    })
}
limitConcurrency(['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8'], 3, mockFetch).then(console.log)
'🚀✅'