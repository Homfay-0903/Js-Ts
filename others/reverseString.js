function reverseString(str) {
    return str.split('').reverse().join('')
}

/*
function reverseStringInPlace(str) {
    const arr = str.split('')
    let left = 0
    let right = arr.length - 1

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }

    return arr.join('')
}
*/
/**实现反转字符 */
/**
 * 
 * @param {string} str 
 */
function reverseStringInPlace(str) {
    let left = 0, right = str.length - 1
    const strArr = str.split('')

    while (left < right) {
        [strArr[left], strArr[right]] = [strArr[right], strArr[left]]
        left++
        right--
    }

    return strArr.join('')
}

const str = reverseStringInPlace('hello')
console.log(str)