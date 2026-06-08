function promiseUtil(promise) {
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => {
                reject('timeout')
            }, 1000)
        })
    ])
}

const promise = new Promise(reslove => setTimeout(() => reslove('success'), 500))
promiseUtil(promise)
    .then((res) => console.log('res:', res))
    .catch((err) => console.error('error:', err))