function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('params must be Array'))
        }

        let promisesLength = promises.length
        let completedLength = 0
        const result = []

        for (let i = 0; i < promisesLength; i++) {
            Promise.resolve(promises[i])
                .then(res => {
                    result[i] = res
                    completedLength++

                    if (completedLength === promisesLength) {
                        resolve(result)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        }

    })
}

// 测试
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
//const p2 = Promise.reject('error here')
const p3 = 3; // 普通值自动包装
myPromiseAll([p1, p2, p3]).then(res => console.log('成功：', res)).catch(console.error); // 应输出 [1, 2, 3]