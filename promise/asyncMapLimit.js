// 模拟异步任务：每个任务耗时随机，打印执行时间
function asyncTask(item) {
    const delay = Math.random() * 10 * 1000;
    console.log(`need ${delay} ms`)
    return new Promise(resolve => setTimeout(() => {
        console.log(`${item} finish`)
        resolve(item)
    }, delay));
}

function asyncMapLimit(arr, limit, asyncFn) {
    // TODO
    return new Promise((resolve, reject) => {
        const results = new Array(arr.length)
        let curIndex = 0
        let activeIndex = 0

        function processNext() {
            if (curIndex >= arr.length) {
                if (activeIndex === 0) {
                    resolve(results)
                }

                return
            }

            let index = curIndex
            let item = arr[index]
            curIndex++
            activeIndex++

            asyncFn(item)
                .then((result) => {
                    results[index] = result
                    activeIndex--
                    processNext()
                })
                .catch((err) => {
                    reject(err)
                })
        }

        const initialCount = Math.min(arr.length, limit)

        for (let i = 0; i < initialCount; i++) {
            processNext()
        }
    })
}

// 测试：对 [1,2,3,4,5] 执行，限制并发数为2
asyncMapLimit([1, 2, 3, 4, 5], 2, asyncTask).then(console.log);
// 应该同时开始1和2，其中一个完成后才启动3，依此类推，最终输出 [1,2,3,4,5]