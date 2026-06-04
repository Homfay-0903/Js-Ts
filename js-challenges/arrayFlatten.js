const arr = [1, [2, 3, [4, 5]], 1, 2, [6, 7]]

function arrayFlatten(arr) {
    if (!Array.isArray(arr)) {
        throw TypeError('arr is not array!')
    }

    return arr.reduce((res, curVal) =>
        Array.isArray(curVal) ? res.concat(arrayFlatten(curVal)) : res.concat(curVal)
        , [])
}

const res = arrayFlatten(arr)
console.log("res:", res)