/*
class Queue {
    constructor() {
        this.queue = []
    }

    task(time, callback) {
        this.queue.push({
            time,
            callback
        })

        return this
    }

    async start() {
        for (const item of this.queue) {
            await new Promise((resolve) => setTimeout(resolve, item.time))
            item.callback()
        }
    }
}

new Queue()
    .task(1000, () => console.log(1))
    .task(2000, () => console.log(2))
    .task(1000, () => console.log(3))
    .start();
*/

/**实现一个队列，并按入队顺序执行任务 */
class Queue {
    constructor() {
        this.queue = []
    }

    addTask(callback, delay) {
        this.queue.push({
            callback, delay
        })

        return this
    }

    async executor() {
        while (this.queue.length > 0) {
            const { callback, delay } = this.queue.shift()
            await new Promise((resolve) => {
                setTimeout(() => {
                    callback(), resolve()
                }, delay)
            })
        }
    }
}

(async function () {
    const queue = new Queue()
        .addTask(() => console.log(1), 1000)
        .addTask(() => console.log(2), 2000)
        .addTask(() => console.log(3), 3000)

    await queue.executor()

    console.log('all resolve')
})()