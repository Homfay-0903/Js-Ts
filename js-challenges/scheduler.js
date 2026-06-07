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
                    const result = await fn()
                    resolve(result)
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

const delay = (time) => new Promise(resolve => setTimeout(resolve, time))

const testfn = async (time, val) => {
    await scheduler.addTask(async () => {
        await delay(time)
        console.log(val)
    })
}

testfn(1000, '1')
testfn(500, '2')
testfn(300, '3')
testfn(400, '4')