/**
 * 手写实现 Promise.any
 * @param {Iterable} promiseList - 可迭代对象（如数组）
 * @returns {Promise}
 */
Promise.myAny = function (promiseList) {
    return new Promise((reslove, reject) => {
        try {
            const promises = Array.from(promiseList)
            const errors = []
            const len = promises.length

            if (!len) {
                return reject(new AggregateError([], 'All promises were rejected'))
            }

            promises.forEach((promise, index) => {
                Promise.resolve(promise).then(
                    (res) => {
                        reslove(res)
                    },
                    (reason) => {
                        errors[index] = reason

                        if (errors.length === len) {
                            reject(new AggregateError(errors, 'All promises were rejected'))
                        }
                    }
                )
            })
        } catch (error) {
            reject(error)
        }
    })
}

/*
const p1 = new Promise((resolve) => setTimeout(() => resolve('p1 finish'), 1000))
const p2 = new Promise((_, reject) => setTimeout(() => reject('p2 fail'), 500))
const p3 = new Promise((resolve) => setTimeout(() => resolve('p3 finish'), 3000))

Promise.myAny([p1, p2, p3])
    .then(res => console.log('成功结果:', res)) // 预期输出: 成功结果: p1 finish
    .catch(err => console.error('错误结果:', err));
*/

const pErr1 = Promise.reject('错误A');
const pErr2 = Promise.reject('错误B');

Promise.myAny([pErr1, pErr2])
    .then(res => console.log(res))
    .catch(err => {
        console.error('全失败触发:', err.message); // 预期输出: All promises were rejected
        console.log('详细错误列表:', err.errors);   // 预期输出: ['错误A', '错误B']
    });