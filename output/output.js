//6
/*Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)
*/

//7
/*const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})
const promise2 = promise1.then(() => {
    throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
    console.log('promise1', promise1)
    console.log('promise2', promise2)
}, 2000)*/

//9
/*Promise.resolve().then(() => {
    return new Error('error!!!')
}).then(res => {
    console.log("then: ", res)
}).catch(err => {
    console.log("catch: ", err)
})*/

//12
Promise.resolve()
    .then(function success(res) {
        throw new Error('error!!!')
    }, function fail1(err) {
        console.log('fail1', err)
    }).catch(function fail2(err) {
        console.log('fail2', err)
    })

//13
/*Promise.resolve('1')
    .then(res => {
        console.log(res)
    })
    .finally(() => {
        console.log('finally')
    })
Promise.resolve('2')
    .finally(() => {
        console.log('finally2')
        return '我是finally2返回的值'
    })
    .then(res => {
        console.log('finally2后面的then函数', res)
    })*/
