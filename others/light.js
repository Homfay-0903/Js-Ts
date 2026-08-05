function red() {
    console.log('red')
}
function green() {
    console.log('green')
}
function yellow() {
    console.log('yellow')
}

function lightContinue(fn, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                fn()
                resolve()
            } catch (error) {
                reject(error)
            }
        }, delay)
    })
}

async function lightSwitch() {
    await lightContinue(red, 1000)
    await lightContinue(green, 2000)
    await lightContinue(yellow, 3000)
}

lightSwitch()