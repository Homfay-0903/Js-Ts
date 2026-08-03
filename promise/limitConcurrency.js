/*
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
*/

/**实现一个限制请求数量的函数 */
/**
 * 
 * @param {String[]} reqList 
 * @param {number} limit 
 * @param {Function} reqFn 
 * @returns 
 */
function limitConcurrency(reqList, limit, reqFn) {
    return new Promise((resolve, reject) => {
        const res = new Array(reqList.length)

        let curIdx = 0, activeIdx = 0

        function process() {
            if (curIdx >= reqList.length) {
                if (activeIdx === 0) {
                    resolve(res)
                }

                return
            }

            let index = curIdx
            let url = reqList[curIdx]
            curIdx++, activeIdx++

            reqFn(url)
                .then(
                    (val) => {
                        res[index] = val
                        activeIdx--
                        process()
                    },
                    (err) => console.log(err)
                )
        }

        const initialCount = Math.min(reqList.length, limit)

        for (let i = 0; i < initialCount; i++) {
            process()
        }
    })
}

function asyncTask(item) {
    const delay = Math.random() * 10 * 1000
    console.log(`need ${delay} ms`)
    return new Promise(resolve => setTimeout(() => {
        console.log(`${item} finish`)
        resolve(item)
    }, delay))
}

limitConcurrency([1, 2, 3], 2, asyncTask).then(console.log)