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

const seen = uniqueString('aaaabbbccd')
console.log(seen)