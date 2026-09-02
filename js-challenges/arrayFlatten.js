/*
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
*/

/**实现数字扁平化 */
/**
 * 
 * @param {Array} arr 
 * @returns 
 */
function arrayFlatten(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('arr is not an array')
    }

    const res = []

    for (const item of arr) {
        if (!Array.isArray(item)) {
            res.push(item)
        } else {
            res.push(...arrayFlatten(item))
        }
    }

    return res
}

const arr = [1, [2, 3, [4, 5]], 1, 2, [6, 7]]
console.log('res:', arrayFlatten(arr))