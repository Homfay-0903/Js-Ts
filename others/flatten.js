function flatten(arr) {
    if (!Array.isArray(arr)) {
        throw TypeError('arr is not a array')
    }
    return arr.reduce((acc, val) =>
        Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val),
        [])
}

function flattenIterative(arr) {
    if (!Array.isArray(arr)) {
        throw TypeError('arr is not a array')
    }

    const stack = [...arr]
    const result = []

    while (stack.length) {
        const next = stack.pop()

        if (Array.isArray(next)) {
            stack.push(...next)
        } else {
            result.push(next)
        }
    }

    return result.reverse()
}

function flattenDepth(arr, depth = 1) {
    if (!Array.isArray(arr)) {
        throw TypeError('arr is not a array')
    }

    return depth > 0
        ? arr.reduce((acc, val) =>
            Array.isArray(val) ? acc.concat(flattenDepth(val, depth - 1)) : acc.concat(val), [])
        : arr.slice()
}

const flattened = flattenIterative([1, [2, [3, [4]]]])
const flattendepth = flattenDepth([1, [2, [3, [4]]]], 2)
console.log(flattened)
console.log(flattendepth)