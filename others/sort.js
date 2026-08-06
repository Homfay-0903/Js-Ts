function bubbleSort(arr) {
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    return arr
}

function quickSortBase(arr) {
    if (arr.length <= 1) {
        return arr
    }

    let left = [], equal = [], right = []
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

    return [...quickSortBase(left), ...equal, ...quickSortBase(right)]
}

function quickSortHigh(arr, low = 0, high = arr.length - 1) {
    if (low >= high) {
        return arr
    }

    let leftEnd = low, rightStart = high
    let pointer = leftEnd

    const pivotNum = arr[Math.floor((low + high) / 2)]

    while (pointer <= rightStart) {
        const curNum = arr[pointer]

        if (curNum < pivotNum) {
            [arr[leftEnd], arr[pointer]] = [arr[pointer], arr[leftEnd]]
            leftEnd++
            pointer++
        } else if (curNum > pivotNum) {
            [arr[rightStart], arr[pointer]] = [arr[pointer], arr[rightStart]]
            rightStart--
        } else {
            pointer++
        }
    }

    quickSortHigh(arr, low, leftEnd - 1)
    quickSortHigh(arr, rightStart + 1, high)

    return arr
}

// 测试
const testArr = [3, 6, 8, 10, 1, 2, 1];
console.log(bubbleSort([...testArr]))
console.log(quickSortBase([...testArr])); // [1, 1, 2, 3, 6, 8, 10]
console.log(quickSortHigh([...testArr]));