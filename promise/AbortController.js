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
    .catch(err => console.log(err)); // 预期 'Cancelled'

// 1秒后调用 cancel，此时延迟任务还未完成
setTimeout(() => cancel(), 1000);