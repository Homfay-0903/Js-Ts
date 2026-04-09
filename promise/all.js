function myPromiseAll(promises) {
    // TODO
    return new Promise((resolve, reject) => {
        const results = []
        let completedCount = 0
        let promiseLength = promises.length

        if (promiseLength === 0) {
            resolve([])
            return
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = value
                    completedCount++

                    if (completedCount === promiseLength) {
                        resolve(results)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    })

}

// 测试
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const p3 = 3; // 普通值自动包装
myPromiseAll([p1, p2, p3]).then(console.log).catch(console.error); // 应输出 [1, 2, 3]