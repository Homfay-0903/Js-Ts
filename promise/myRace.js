/**
 * 
 * @param {Array} promises 
 * @returns 
 */
/*function myRace(promises) {
    return new Promise((resolve, reject) => {
        if (promises == null) {
            return reject(new TypeError('promises must be an iterable'))
        }

        const iterable = Array.from(promises)
        if (iterable.length === 0) {
            return // 空 iterable 返回永远 pending 的 Promise
        }

        for (const promise of iterable) {
            Promise.resolve(promise).then(resolve, reject)
        }
    })
}*/

function myRace(promises) {
    return new Promise((reslove, reject) => {
        try {
            if (promises === null) {
                return reject(new TypeError('promises can not be null'))
            }

            if (!promises.length) {
                return
            }

            for (const promise of promises) {
                Promise.resolve(promise)
                    .then(
                        (res) => {
                            reslove(res)
                        },
                        (reason) => {
                            reject(reason)
                        }
                    )
            }
        } catch (error) {
            reject(error)
        }
    })
}

const p1 = new Promise((resolve) => setTimeout(() => resolve('p1 finish'), 1000))
const p2 = new Promise((resolve) => setTimeout(() => resolve('p2 finish'), 500))
const p3 = new Promise((resolve) => setTimeout(() => resolve('p3 finish'), 3000))

myRace([p1, p2, p3]).then(console.log)