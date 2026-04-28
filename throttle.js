function throttle(fn, delay = 500) {
    let lastTime = 0

    return (...args) => {
        const now = Date.now()

        if (now - lastTime < delay) {
            return
        }

        lastTime = now
        fn(...args)
    }
}

function search(keyword) {
    console.log('sueecss', keyword)
}

const throttleSearch = throttle(search, 5000)

while (true) {
    throttleSearch('this content')
}