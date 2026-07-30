/*
function outTime() {
    const p1 = new Promise((resolve, reject) => {
        try {
            setTimeout(() => resolve('success'), 4000)
        } catch (error) {
            reject(error)
        }
    })

    const p2 = new Promise((resolve, reject) => {
        try {
            setTimeout(() => reject('failed'), 3000)
        } catch (error) {
            reject(error)
        }
    })

    return Promise.race([p1, p2])
}

outTime()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
*/

/**实现一个返回最快响应结果的函数 */
function fastestRes(reqList) {
    return Promise.race(reqList)
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            resolve('p1')
        } catch (error) {
            reject(error)
        }
    }, 1000)
})
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            resolve('p2')
        } catch (error) {
            reject(error)
        }
    }, 2000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            reject('p3')
        } catch (error) {
            reject(error)
        }
    }, 500)
})

fastestRes([p1, p2, p3])
    .then(
        (res) => console.log(res),
        (err) => console.log(err)
    )