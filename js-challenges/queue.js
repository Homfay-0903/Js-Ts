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