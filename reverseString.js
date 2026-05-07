function reverseString(str) {
    return str.split('').reverse().join('')
}

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

const str = reverseStringInPlace('hello')
console.log(str)