/*
const obj1 = { a: 1, b: { c: 3 } }
const obj2 = { d: 4 }
//const target = { e: 5 }
const target = { ...obj1 }

//Object.assign(target, obj1)
console.log(target)
obj1.a = 7
obj1.b.c = 6
console.log(target)

const arr1 = [1, 2, 3, [4, 5]]
const arr2 = arr1.slice()
console.log(arr2)
arr1[3][0] = 6
console.log(arr2)
*/

/**
 * 
 * @param {Object} obj 
 * @returns 
 */
function shallowCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return
    }

    const newObj = Array.isArray(obj) ? [] : {}

    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    })

    return newObj
}

const obj1 = { a: 1, b: { c: 3 } }
const target = shallowCopy(obj1)
console.log(target)
obj1.a = 7
obj1.b.c = 6
console.log(target)