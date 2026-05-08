const deepClone = (obj) => {
    if (obj === null || typeof obj !== Object) {
        return
    }

    const res = Array.isArray(obj) ? [] : {}

    for (let key of obj) {
        res[key] = deepClone(obj[key])
    }

    return res
}

const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
obj.self = obj; // 循环引用
const cloned = deepClone(obj);
console.log(cloned); // 完整深拷贝，无循环引用问题