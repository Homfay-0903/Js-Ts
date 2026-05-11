const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            if (this.state !== PENDING) return
            queueMicrotask(() => {
                if (this.state !== PENDING) return
                this.state = FULFILLED
                this.value = value
                this.onFulfilledCallbacks.forEach(fn => fn())
            })
        }

        const reject = (reason) => {
            if (this.state !== PENDING) return
            queueMicrotask(() => {
                if (this.state !== PENDING) return
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            })
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

        const newPromise = new MyPromise((resolve, reject) => {
            const handleTask = (callback, data) => {
                queueMicrotask(() => {
                    try {
                        const x = callback(data)

                        if (x instanceof MyPromise) {
                            x.then(resolve, reject)
                        } else {
                            resolve(x)
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.state === FULFILLED) {
                handleTask(onFulfilled, this.value)
            } else if (this.state === REJECTED) {
                handleTask(onRejected, this.reason)
            } else if (this.state === PENDING) {
                this.onFulfilledCallbacks.push(() => handleTask(onFulfilled, this.value))
                this.onRejectedCallbacks.push(() => handleTask(onRejected, this.reason))
            }
        })

        return newPromise
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'))
            }

            const results = []
            const promisesLength = promises.length
            let count = 0

            if (promisesLength === 0) {
                resolve(results)
            }

            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    (val) => {
                        results[index] = val
                        count++

                        if (count === promisesLength) {
                            resolve(results)
                        }
                    },
                    err => {
                        reject(err)
                    }
                )
            })
        })
    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        }

        return new MyPromise(resolve => resolve(value))
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }
}

console.log('--- 测试 1：基本状态与异步执行 ---');
const p1 = new MyPromise((resolve, reject) => {
    console.log('执行器同步执行');
    setTimeout(() => {
        resolve('异步任务成功！');
    }, 1000);
});

p1.then(res => {
    console.log('1秒后收到结果:', res);
});

console.log('--- 测试 2：then 链式调用 ---');
new MyPromise((resolve) => resolve(1))
    .then(val => {
        console.log('链式调用第一层:', val); // 输出 1
        return val + 1; // 返回普通值
    })
    .then(val => {
        console.log('链式调用第二层:', val); // 输出 2
        return new MyPromise(resolve => resolve(val + 1)); // 返回 Promise
    })
    .then(val => {
        console.log('链式调用第三层:', val); // 输出 3
    });

console.log('--- 测试 3：Promise.all 并发控制 ---');
const pAll1 = new MyPromise(resolve => setTimeout(() => resolve('任务A'), 500));
const pAll2 = new MyPromise(resolve => setTimeout(() => resolve('任务B'), 200));

MyPromise.all([pAll1, pAll2, '普通值C']).then(results => {
    console.log('all 方法全部完成，结果按顺序输出:', results);
    // 输出: ['任务A', '任务B', '普通值C']
}).catch(err => {
    console.log('all 遇到错误:', err);
});