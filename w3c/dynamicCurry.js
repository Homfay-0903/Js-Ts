function dynamicCurry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...nextArgs) {
                return curried.apply(this, args.concat(nextArgs))
            }
        }
    }
}

const totalVolume = (l, w, h) => l * w * h
const curriedVolume = dynamicCurry(totalVolume)

console.log(curriedVolume(2)(3)(4)) // 24
console.log(curriedVolume(2, 3)(4))   // 24 (Flexible syntax)