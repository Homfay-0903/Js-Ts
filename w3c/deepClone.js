/**
 * 
 * @param {Object} obj 
 * @returns 
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    const newObj = Array.isArray(obj) ? [] : {}

    Object.keys(obj).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
        }
    })

    return newObj
}

const obj1 = { a: 1, b: { c: 3 } }
const target = deepClone(obj1)
console.log(target)
obj1.a = 7
obj1.b.c = 6
console.log(target)