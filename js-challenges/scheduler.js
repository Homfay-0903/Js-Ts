class Scheduler {
    constructor(maxTasksCount) {
        this.maxTasksCount = maxTasksCount
        this.curTasksCount = 0
        this.waitQueue = []
    }

    addTask(fn) {
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

/*class Scheduler {
    constructor(maxTaskCount) {
        this.maxTaskCount = maxTaskCount
        this.curTaskCount = 0
        this.waitQueue = []
    }

    addTask(fn) {
        return new Promise((resolve, reject) => {
            const task = { fn, resolve, reject }

            if (this.curTaskCount < this.maxTaskCount) {
                this.run(task)
            } else {
                this.waitQueue.push(task)
            }
        })
    }

    async run(task) {
        const { fn, resolve, reject } = task

        this.curTaskCount++

        try {
            const res = await fn()
            resolve(res)
        } catch (error) {
            reject(error)
        } finally {
            this.curTaskCount--

            if (this.waitQueue.length) {
                const next = this.waitQueue.shift()
                this.run(next)
            }
        }
    }
}*/

const scheduler = new Scheduler(2)

const delay = (time) => new Promise(resolve => setTimeout(resolve, time))

const testfn = async (time, val) => {
    await scheduler.addTask(async () => {
        await delay(time)
        console.log(val)
    })
}

console.log('=== 正常测试 ===')
testfn(3000, '1')
testfn(4000, '2')
testfn(300, '3')
testfn(400, '4')

setTimeout(() => {
    console.log('\n=== 错误测试 ===')

    const testError = async (time, val, shouldFail = false) => {
        try {
            await scheduler.addTask(async () => {
                await delay(time)
                if (shouldFail) {
                    throw new Error(`任务 ${val} 失败了！`)
                }
                console.log(`✓ 任务 ${val} 完成`)
            })
        } catch (error) {
            console.log(`✗ 捕获错误: ${error.message}`)
        }
    }

    testError(100, 'A', false)
    testError(200, 'B', true)
    testError(300, 'C', false)
    testError(400, 'D', true)
}, 5000)