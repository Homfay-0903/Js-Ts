function red() {
    console.log('red')
}
function green() {
    console.log('green')
}
function yellow() {
    console.log('yellow')
}

function light(callback, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            callback && callback()
            resolve()
        }, time)
    })
}

async function lightStep() {
    await light(red, 3000)
    await light(yellow, 2000)
    await light(green, 1000)
    await lightStep()
}

lightStep()