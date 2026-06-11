function delayExecute(func, args, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const result = func(...args)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        }, timeout)
    })
}

function myRepeat(func, count, timeout) {
    return async function (...args) {
        const results = []
        for (let i = 0; i < count; i++) {
            const result = await delayExecute(func, args, timeout)
            results.push(result)
        }
        return results
    }
}

const repeatLog = myRepeat(console.log, 5, 1000)
repeatLog('hello', 'world', '!')