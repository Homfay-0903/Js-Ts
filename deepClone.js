const deepClone = (obj) => {
    if (obj === null || typeof obj !== Object) {
        return
    }

    const res = Array.isArray(obj) ? [] : {}

    for (let key of obj) {
        res[key] = deepClone(obj[key])
    }

    return res
}