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

/*async function runTasksInSeries(tasks) {
    // TODO: 返回一个 Promise，结果为 ['A', 'B', 'C']
    const results = []

    for (const task of tasks) {
        const res = await task()
        results.push(res)
    }

    return results
}*/

function runTasksInSeries(tasks) {
    // TODO: 返回一个 Promise，结果为 ['A', 'B', 'C']
    const results = []
    let promiseChain = Promise.resolve()

    tasks.map(task => {
        promiseChain = promiseChain
            .then(() => task())
            .then(result => results.push(result))
    })

    return promiseChain.then(() => results)
}

runTasksInSeries([taskA, taskB, taskC]).then(console.log); // 期望输出 ['A', 'B', 'C']，且顺序执行