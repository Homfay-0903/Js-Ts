function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('promises must be an Array'))
        }

        const results = []
        const promisesLength = promises.length
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
}

// 测试
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
//const p2 = Promise.reject('error here')
const p3 = 3; // 普通值自动包装
//const p4 = Promise.reject('error here')
myPromiseAll([p1, p2, p3]).then(res => console.log('成功：', res)).catch(console.error); // 应输出 [1, 2, 3]