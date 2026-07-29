/*
function _get(obj, path, defaultValue = undefined) {
    const newPath = Array.isArray(path)
        ? path
        : path.replace(/\[/g, '.').replace(/\]/g, '').split('.')

    const result = newPath.reduce((curObj, key) => {
        return curObj == null ? undefined : curObj[key]
    }, obj)

    return result === undefined ? defaultValue : result
}
*/

/**根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。 */

/**
 * 
 * @param {Object} obj 
 * @param {Array|string} path 
 * @param {*} defaultValue 
 */
function _get(obj, path, defaultValue = undefined) {
    const newPath = Array.isArray(path)
        ? path
        : path.replace(/\[/g, '.').replace(/\]/g, '').split('.')

    const res = newPath.reduce((curObj, key) => {
        return curObj == null ? undefined : curObj[key]
    }, obj)

    return res === undefined ? defaultValue : res
}

var object = { 'a': [{ 'b': { 'c': 3 } }] };

console.log(_get(object, 'a[0].b.c'));;
// => 3

console.log(_get(object, ['a', '0', 'b', 'c']));;
// => 3

console.log(_get(object, 'a.b.c', 'default'));;
// => 'default'