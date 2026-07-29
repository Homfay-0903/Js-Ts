/*
Array.prototype.mymap = function (callback) {
    const res = []

    for (let i = 0; i < this.length; i++) {
        res.push(callback(this[i], i, this))
    }

    return res
}
*/

/**实现数组的map方法 */
Array.prototype.mymap = function (callback) {
    const res = []

    for (let i = 0; i < this.length; i++) {
        res.push(callback(this[i], i, this))
    }

    return res
}


const arr = [1, 2, 3]
const res = arr.mymap((element, index) => element = element * 2)
console.log(res)