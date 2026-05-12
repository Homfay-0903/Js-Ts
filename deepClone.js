function deepClone(obj, map = new WeakMap()) {
    if (obj === null) {
        return null
    }
    if (typeof obj !== 'function' && typeof obj !== 'object') {
        return obj
    }

    if (map.has(obj)) {
        return map.get(obj)
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime())
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    if (obj instanceof Map) {
        const cloneMap = new Map()
        map.set(obj, cloneMap)
        obj.forEach((value, key) => cloneMap.set(key, deepClone(value, map)))
        return cloneMap
    }
    if (obj instanceof Set) {
        const cloneSet = new Set()
        map.set(obj, cloneSet)
        obj.forEach(value => cloneSet.add(deepClone(value, map)))
        return cloneSet
    }

    const cloneObj = Array.isArray(obj) ? [] : {}
    map.set(obj, cloneObj)
    Reflect.ownKeys(obj).forEach(key => {
        cloneObj[key] = deepClone(obj[key], map)
    })

    return cloneObj
}

console.log('========== 深度克隆测试 ==========\n')

// 测试1：基础类型
console.log('测试1：基础类型')
const primitiveTests = [
    { name: '字符串', input: 'hello' },
    { name: '数字', input: 123 },
    { name: '布尔值', input: true },
    { name: 'null', input: null },
    { name: 'undefined', input: undefined }
]

primitiveTests.forEach(test => {
    const cloned = deepClone(test.input)
    const passed = cloned === test.input && cloned !== test.input
    console.log(`  ${test.name}: ${cloned === test.input ? '✓ 通过' : '✗ 失败'}`)
})

// 测试2：普通对象
console.log('\n测试2：普通对象')
const obj = { name: 'Alice', age: 25, city: 'Beijing' }
const clonedObj = deepClone(obj)
clonedObj.name = 'Bob'
console.log(`  原对象: ${JSON.stringify(obj)}`)
console.log(`  克隆对象: ${JSON.stringify(clonedObj)}`)
console.log(`  互不影响: ${obj.name !== clonedObj.name ? '✓ 通过' : '✗ 失败'}`)

// 测试3：数组
console.log('\n测试3：数组')
const arr = [1, 2, 3, { a: 4 }]
const clonedArr = deepClone(arr)
clonedArr[3].a = 999
console.log(`  原数组: ${JSON.stringify(arr)}`)
console.log(`  克隆数组: ${JSON.stringify(clonedArr)}`)
console.log(`  深度克隆: ${arr[3].a !== clonedArr[3].a ? '✓ 通过' : '✗ 失败'}`)

// 测试4：嵌套对象
console.log('\n测试4：嵌套对象')
const nested = {
    level1: {
        level2: {
            level3: {
                value: 'deep'
            }
        }
    }
}
const clonedNested = deepClone(nested)
clonedNested.level1.level2.level3.value = 'modified'
console.log(`  原对象: ${nested.level1.level2.level3.value}`)
console.log(`  克隆对象: ${clonedNested.level1.level2.level3.value}`)
console.log(`  深度克隆: ${nested.level1.level2.level3.value !== clonedNested.level1.level2.level3.value ? '✓ 通过' : '✗ 失败'}`)

// 测试5：循环引用
console.log('\n测试5：循环引用')
const circular = { name: 'circular' }
circular.self = circular
try {
    const clonedCircular = deepClone(circular)
    console.log(`  循环引用检测: ${clonedCircular.self === clonedCircular ? '✓ 通过' : '✗ 失败'}`)
    console.log(`  不等于原对象: ${clonedCircular !== circular ? '✓ 通过' : '✗ 失败'}`)
} catch (error) {
    console.log(`  ✗ 失败: ${error.message}`)
}

// 测试6：Date 对象
console.log('\n测试6：Date 对象')
const date = new Date('2024-01-01')
const clonedDate = deepClone(date)
console.log(`  原日期: ${date.toISOString()}`)
console.log(`  克隆日期: ${clonedDate.toISOString()}`)
console.log(`  类型正确: ${clonedDate instanceof Date ? '✓ 通过' : '✗ 失败'}`)
console.log(`  值相等: ${date.getTime() === clonedDate.getTime() ? '✓ 通过' : '✗ 失败'}`)
console.log(`  不是同一引用: ${date !== clonedDate ? '✓ 通过' : '✗ 失败'}`)

// 测试7：RegExp 对象
console.log('\n测试7：RegExp 对象')
const regex = /test/gi
const clonedRegex = deepClone(regex)
console.log(`  原正则: ${regex}`)
console.log(`  克隆正则: ${clonedRegex}`)
console.log(`  类型正确: ${clonedRegex instanceof RegExp ? '✓ 通过' : '✗ 失败'}`)
console.log(`  不是同一引用: ${regex !== clonedRegex ? '✓ 通过' : '✗ 失败'}`)

// 测试8：Map 对象
console.log('\n测试8：Map 对象')
const map = new Map([
    ['key1', { value: 1 }],
    ['key2', { value: 2 }]
])
const clonedMap = deepClone(map)
clonedMap.get('key1').value = 999
console.log(`  原Map值: ${map.get('key1').value}`)
console.log(`  克隆Map值: ${clonedMap.get('key1').value}`)
console.log(`  深度克隆: ${map.get('key1').value !== clonedMap.get('key1').value ? '✓ 通过' : '✗ 失败'}`)

// 测试9：Set 对象
console.log('\n测试9：Set 对象')
const set = new Set([{ id: 1 }, { id: 2 }])
const clonedSet = deepClone(set)
const setArray = Array.from(set)
const clonedSetArray = Array.from(clonedSet)
clonedSetArray[0].id = 999
console.log(`  原Set值: ${setArray[0].id}`)
console.log(`  克隆Set值: ${clonedSetArray[0].id}`)
console.log(`  深度克隆: ${setArray[0].id !== clonedSetArray[0].id ? '✓ 通过' : '✗ 失败'}`)

// 测试10：Symbol 属性
console.log('\n测试10：Symbol 属性')
const sym = Symbol('secret')
const objWithSymbol = { [sym]: 'hidden', visible: 'shown' }
const clonedWithSymbol = deepClone(objWithSymbol)
console.log(`  Symbol属性存在: ${clonedWithSymbol[sym] === 'hidden' ? '✓ 通过' : '✗ 失败'}`)
console.log(`  普通属性存在: ${clonedWithSymbol.visible === 'shown' ? '✓ 通过' : '✗ 失败'}`)

// 测试11：不可枚举属性
console.log('\n测试11：不可枚举属性')
const objWithNonEnum = { visible: 'value' }
Object.defineProperty(objWithNonEnum, 'hidden', {
    value: 'secret',
    enumerable: false,
    writable: true
})
const clonedWithNonEnum = deepClone(objWithNonEnum)
console.log(`  不可枚举属性: ${clonedWithNonEnum.hidden === 'secret' ? '✓ 通过' : '✗ 失败'}`)
console.log(`  可枚举属性: ${clonedWithNonEnum.visible === 'value' ? '✓ 通过' : '✗ 失败'}`)

// 测试12：混合复杂对象
console.log('\n测试12：混合复杂对象')
const complex = {
    string: 'text',
    number: 42,
    boolean: true,
    null: null,
    array: [1, 2, { nested: 'value' }],
    object: { a: 1, b: 2 },
    date: new Date('2024-01-01'),
    regex: /pattern/g,
    map: new Map([['key', 'value']]),
    set: new Set([1, 2, 3]),
    [Symbol('sym')]: 'symbol value'
}
const clonedComplex = deepClone(complex)
console.log(`  对象克隆: ${JSON.stringify(clonedComplex) !== JSON.stringify(complex) ? '✓ 通过' : '✗ 失败'}`)
console.log(`  深度独立: ${clonedComplex.array[2].nested = 'changed', complex.array[2].nested !== clonedComplex.array[2].nested ? '✓ 通过' : '✗ 失败'}`)

// 测试13：空对象和空数组
console.log('\n测试13：空对象和空数组')
const emptyObj = {}
const emptyArr = []
const clonedEmptyObj = deepClone(emptyObj)
const clonedEmptyArr = deepClone(emptyArr)
console.log(`  空对象: ${JSON.stringify(clonedEmptyObj) === '{}' ? '✓ 通过' : '✗ 失败'}`)
console.log(`  空数组: ${JSON.stringify(clonedEmptyArr) === '[]' ? '✓ 通过' : '✗ 失败'}`)
console.log(`  不是同一引用: ${emptyObj !== clonedEmptyObj && emptyArr !== clonedEmptyArr ? '✓ 通过' : '✗ 失败'}`)

console.log('\n========== 测试完成 ==========')