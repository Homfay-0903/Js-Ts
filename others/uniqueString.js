/*
function uniqueString(str) {
    const seen = new Set()
    let result = ''

    for (const char of str) {
        if (!seen.has(char)) {
            seen.add(char)
            result += char
        }
    }

    return result
}
*/
/**实现字符串去重 */
function uniqueString(str) {
    const seen = new Set()
    let res = ''

    for (const char of str) {
        if (!seen.has(char)) {
            seen.add(char)
            res += char
        }
    }

    return res
}

const seen = uniqueString('aaaabbbccd')
console.log(seen)