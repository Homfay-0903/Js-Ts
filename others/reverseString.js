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
    const chars = str.split('')

    while (left < right) {
        [chars[left], chars[right]] = [chars[right], chars[left]]
        left++, right--
    }

    return chars.join('')
}

const str = reverseStringInPlace('hello')
console.log(str)