/*
function myInterrupt(callbackFn, timeout = 5000) {
    const waitFn = new Promise((_, reject) => {
        setTimeout(() => {
            reject('timeout!')
        }, timeout);
    })

    return Promise.race([callbackFn(), waitFn])
}

const test1 = () => new Promise(resolve => setTimeout(() => resolve('success1'), 4000))
const test2 = () => new Promise(resolve => setTimeout(() => resolve('success2'), 6000))

myInterrupt(test1)
    .then((res) => console.log('res:', res))
    .catch((err) => console.error('error:', err))

myInterrupt(test2)
    .then((res) => console.log('res:', res))
    .catch((err) => console.error('error:', err))
*/

/**实现函数， 若超时则终止 */

function myInterrupt(promise, timeout = 5000) {
    const waitPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject('timeout!')
        }, timeout)
    })

    return Promise.race([promise, waitPromise])
}

const p1 = new Promise(resolve => setTimeout(() => resolve('success1'), 4000))
const p2 = new Promise(resolve => setTimeout(() => resolve('success2'), 6000))

myInterrupt(p2)
    .then(
        (res) => console.log(res),
        (err) => console.log(err)
    )