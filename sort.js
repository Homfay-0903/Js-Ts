function bubbleSort(arr) {
    const len = arr.length
    for (let i = 0; i < len - 1; i++) {
        let flag = false
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                flag = true
            }
        }

        if (!flag) {
            break
        }
    }
    return arr
}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }

    const left = [], equal = [], right = []
    const pivot = arr[Math.floor(arr.length / 2)]

    for (const num of arr) {
        if (num < pivot) {
            left.push(num)
        } else if (num === pivot) {
            equal.push(num)
        } else {
            right.push(num)
        }
    }

    return [...quickSort(left), ...equal, ...quickSort(right)]
}

// 测试
const testArr = [3, 6, 8, 10, 1, 2, 1];
console.log(bubbleSort([...testArr]))
console.log(quickSort([...testArr])); // [1, 1, 2, 3, 6, 8, 10]