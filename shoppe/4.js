// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，
// 使得以下程序能正确输出

/*class Scheduler {
    constructor() {
        this.queue = []
        this.count = 0
        this.maxCount = 2
    }

    add(task) {
        return new Promise((reslove) => {
            const wrappedTask = () => {
                return task().then(() => {
                    this.count--
                    this.run()
                    reslove()
                })
            }

            this.queue.push(wrappedTask)
            this.run()
        })
    }

    run() {
        while (this.count < this.maxCount && this.queue.length > 0) {
            this.count++
            const task = this.queue.shift()
            task()
        }
    }
}*/

class Scheduler {
    constructor(maxTasksCount) {
        this.maxTasksCount = maxTasksCount
        this.curTasksCount = 0
        this.waitQueue = []
    }

    add(fn) {
        return new Promise((resolve, reject) => {
            const run = async () => {
                this.curTasksCount++

                try {
                    const res = await fn()
                    resolve(res)
                } catch (error) {
                    reject(error)
                } finally {
                    this.curTasksCount--

                    if (this.waitQueue.length) {
                        const next = this.waitQueue.shift()
                        next()
                    }
                }
            }

            if (this.curTasksCount >= this.maxTasksCount) {
                this.waitQueue.push(run)
            } else {
                run()
            }
        })
    }
}

const scheduler = new Scheduler(2)

const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})

const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}

// 执行
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')


// output: 2 3 1 4