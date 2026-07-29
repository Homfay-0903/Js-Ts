/*
function flatToNested(flatObj, separator = '.') {
    const res = {}

    for (const key in flatObj) {
        const keys = key.split('.')
        let curRes = res

        for (let i = 0; i < keys.length; i++) {
            const curKey = keys[i]

            if (i !== keys.length - 1) {
                if (!curRes[curKey]) {
                    curRes[curKey] = {}
                }

                curRes = curRes[curKey]
            } else {
                curRes[curKey] = flatObj[key]
            }
        }
    }

    return res
}
*/

/** 
 * 扁平键对象转嵌套对象 
 * @param {Object} flatObj 扁平化对象 
 * @param {string} separator 分隔符，默认 "." 
 * @returns {Object} 嵌套对象 
 */

function flatToNested(flatObj, separator = '.') {
    const res = {}

    for (const key in flatObj) {
        const keys = key.split('.')
        const n = keys.length

        let curRes = res

        for (let i = 0; i < n; i++) {
            const curKey = keys[i]

            if (i !== n - 1) {
                if (!curRes[curKey]) {
                    curRes[curKey] = {}
                }

                curRes = curRes[curKey]
            } else {
                curRes[curKey] = flatObj[key]
            }
        }
    }

    return res
}

const flatObj = {
    'user.name': 'jack',
    'user.info.age': 20,
    'user.info.sex': 'male',
    'address.city': 'beijing'
}

const nested = flatToNested(flatObj)
console.log(nested)