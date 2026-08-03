
/*async function runTasksInSeries(tasks) {
    // TODO: 返回一个 Promise，结果为 ['A', 'B', 'C']
    const results = []

    for (const task of tasks) {
        const res = await task()
        results.push(res)
    }

    return results
}*/

/** TODO: 返回一个 Promise，结果为 ['A', 'B', 'C'],期望输出 ['A', 'B', 'C']，且顺序执行 */
/**
 * 
 * @param {Array} tasks 
 */
function runTasksInParallel(tasks) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(tasks)) {
            return reject(new TypeError('tasks must be an array'))
        }

        const res = []
        const n = tasks.length

        if (n === 0) {
            return reject(new TypeError('tasks can not be null'))
        }

        let finishedCount = 0

        for (let i = 0; i < n; i++) {
            Promise.resolve(tasks[i]())
                .then(
                    (val) => res[i] = val,
                    (err) => reject(err)
                )
                .finally(() => {
                    finishedCount++

                    if (finishedCount === n) {
                        resolve(res)
                    }
                })
        }
    })
}

// 提供的三个异步任务
function taskA() {
    return Promise.resolve('A');
}
function taskB() {
    return new Promise(resolve => setTimeout(() => resolve('B'), 100));
}
function taskC() {
    return Promise.resolve('C');
}

runTasksInParallel([taskA, taskB, taskC]).then(console.log)