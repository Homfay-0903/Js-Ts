function _get(obj, path, defaultValue = undefined) {
    const newPath = Array.isArray(path)
        ? path
        : path.replace(/\[/g, '.').replace(/\]/g, '').split('.')

    const result = newPath.reduce((curObj, key) => {
        return curObj == null ? undefined : curObj[key]
    }, obj)

    return result === undefined ? defaultValue : result
}

var object = { 'a': [{ 'b': { 'c': 3 } }] };

console.log(_get(object, 'a[0].b.c'));;
// => 3

console.log(_get(object, ['a', '0', 'b', 'c']));;
// => 3

console.log(_get(object, 'a.b.c', 'default'));;
// => 'default'