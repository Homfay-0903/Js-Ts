/**
 * 
 * @param {Array} promises 
 * @returns 
 */
/*function myAllsettled(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('promises must be an Array'))
        }

        const res = []
        const promisesLength = promises.length

        if (promisesLength === 0) {
            return resolve(res)
        }

        let completedLength = 0

        for (let i = 0; i < promisesLength; i++) {
            Promise.resolve(promises[i])
                .then(
                    (val) => {
                        res[i] = { status: 'fulfilled', value: val }
                    },
                    (reason) => {
                        res[i] = { status: 'rejected', reason: reason }
                    }
                )
                .finally(() => {
                    completedLength++
                    if (completedLength === promisesLength) {
                        resolve(res)
                    }
                })
        }
    })
}*/

function myAllsettled(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('promises must be an Array'))
        }

        const res = []
        const len = promises.length

        let finishedCount = 0

        if (!len) {
            return reject(new TypeError('promises can not be null'))
        }

        try {
            for (let i = 0; i < len; i++) {
                Promise.resolve(promises[i])
                    .then(
                        (val) => {
                            res[i] = { status: 'fulfilled', value: val }
                        },
                        (reason) => {
                            res[i] = { status: 'rejected', reason: reason }
                        }
                    )
                    .finally(
                        () => {
                            finishedCount++

                            if (finishedCount === len) {
                                resolve(res)
                            }
                        }
                    )
            }
        } catch (error) {

        }
    })
}

// 测试
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100))
const p3 = 3; // 普通值自动包装
const p4 = Promise.reject('error here')

myAllsettled([p1, p2, p3, p4])
    .then(res => console.log('成功：', res)) // 应输出 [1, 2, 3]
    .catch(err => console.error('faild reason is:', err))