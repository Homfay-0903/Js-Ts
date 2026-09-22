const promise = Promise.resolve().then(() => {
    return promise;
})
promise.catch(console.err)

/**
 * [TypeError: Chaining cycle detected for promise #<Promise>]
 */