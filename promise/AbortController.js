/*
function cancellableDelay(ms) {
    // TODO: 返回 { promise, cancel }
    const controller = new AbortController()
    const signal = controller.signal

    const delayPromise = new Promise((resolve, reject) => {
        const timerId = setTimeout(() => {
            resolve('finish')
        }, ms)

        signal.addEventListener('abort', () => {
            if (timerId) {
                clearTimeout(timerId)
            }
        })
    })

    const cancelPromise = new Promise((_, reject) => {
        signal.addEventListener('abort', () => {
            reject('defeat')
        })
    })

    const racePromise = Promise.race([delayPromise, cancelPromise])

    return {
        promise: racePromise,
        cancel: () => controller.abort()
    }
}

const { promise, cancel } = cancellableDelay(1000);
promise
    .then(result => console.log(result))
    .catch(err => console.log(err)); 

setTimeout(() => cancel(), 500);
*/

function cancelFetch(delay) {
    const controller = new AbortController()
    const signal = controller.signal

    const promise1 = new Promise((reslove, reject) => {
        const timerId = setTimeout(() => {
            try {
                reslove('success')
            } catch (error) {
                reject(error)
            }
        }, delay)

        signal.addEventListener('abort', () => {
            if (timerId) {
                clearTimeout(timerId)
            }
        })
    })

    const promise2 = new Promise((_, reject) => {
        signal.addEventListener('abort', () => {
            reject('cancel')
        })
    })

    const race = Promise.race([promise1, promise2])

    return {
        promise: race,
        cancel: () => controller.abort()
    }
}

const { promise, cancel } = cancelFetch(1000)

promise
    .then(
        (res) => console.log(res),
        (err) => console.log(err)
    )

// all right
setTimeout(cancel, 2000)
setTimeout(() => cancel(), 2000)