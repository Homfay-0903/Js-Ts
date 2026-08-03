/*function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('promises must be an Array'))
        }

        const results = []
        const promisesLength = promises.length

        if (!promisesLength) {
            return resolve(results)
        }

        let completedLength = 0

        for (let i = 0; i < promisesLength; i++) {
            Promise.resolve(promises[i])
                .then((res) => {
                    completedLength++
                    results[i] = res

                    if (completedLength === promisesLength) {
                        resolve(results)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        }

    })
}*/
/**实现Promise.all */
/**
 * 
 * @param {Array} promises 
 */
function myAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('promises must be an array'))
        }

        const res = []
        const n = promises.length

        let finishedCount = 0

        try {
            for (let i = 0; i < n; i++) {
                Promise.resolve(promises[i])
                    .then(
                        (val) => {
                            res[i] = val
                            finishedCount++

                            if (finishedCount === n) {
                                resolve(res)
                            }
                        },
                        (err) => reject(err)
                    )
            }
        } catch (error) {
            reject(error)
        }

    })
}

// 测试
const p1 = Promise.resolve(1)
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 2000))
const p3 = 3 // 普通值自动包装
//const p4 = Promise.reject('error here')

myAll([p1, p2, p3])
    .then(res => console.log('成功：', res)) // 应输出 [1, 2, 3]
    .catch(err => console.error('faild reason is:', err))