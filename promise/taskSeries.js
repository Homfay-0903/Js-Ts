/** TODO: 返回一个 Promise，结果为 ['A', 'B', 'C'],期望输出 ['A', 'B', 'C']，且串行执行 */
/**
 * 
 * @param {Array} tasks 
 */
async function runTasksInSeries(tasks) {

    if (!Array.isArray(tasks)) {
        return new TypeError('tasks must be an array')
    }

    const res = []
    const n = tasks.length

    if (n === 0) {
        return new TypeError('tasks can not be null')
    }

    for (let i = 0; i < n; i++) {
        res[i] = await tasks[i]()

    }

    return res
}

// 提供的三个异步任务
function taskA() {
    return new Promise(resolve => setTimeout(() => resolve('A'), 1000));
}
function taskB() {
    return new Promise(resolve => setTimeout(() => resolve('B'), 1000));
}
function taskC() {
    return new Promise(resolve => setTimeout(() => resolve('C'), 1000));
}

runTasksInSeries([taskA, taskB, taskC]).then(console.log)