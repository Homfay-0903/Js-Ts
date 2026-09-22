const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})
const promise2 = promise1.then((val) => {
    //ver-1
    //throw new Error('error!!!')

    //ver-2
    console.log(val)
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
    console.log('promise1', promise1)
    console.log('promise2', promise2)
}, 2000)

/**
 * promise1 Promise {<pending>}
 * promise2 Promise {<pending>}
 * throw new Error('error!!!')
 */

/**
 * promise1 Promise {<pending>}
 * promise2 Promise {<pending>}
 * success
 * promise1 Promise {'success'}
 * promise2 Promise {undefined}
 */