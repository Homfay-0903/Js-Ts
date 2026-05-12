function myRace(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            return
        }

        for (const promise of promises) {
            Promise.resolve(promise).then(resolve, reject)
        }
    })
}

const p1 = new Promise((resolve) => setTimeout(() => resolve('p1 finish'), 1000))
const p2 = new Promise((resolve) => setTimeout(() => resolve('p2 finish'), 500))
const p3 = new Promise((resolve) => setTimeout(() => resolve('p3 finish'), 3000))

myRace([p1, p2, p3]).then(console.log)