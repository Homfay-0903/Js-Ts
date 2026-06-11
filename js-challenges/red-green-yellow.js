function red() {
    console.log('now is red')
}
function green() {
    console.log('now is green')
}
function yellow() {
    console.log('now is yellow')
}

function lightSwitch(lightFunc, ligntTime) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                lightFunc && lightFunc()
                resolve()
            }, ligntTime)
        } catch (error) {
            reject(error)
        }
    })
}

async function lightStep() {
    await lightSwitch(red, 3000)
    await lightSwitch(green, 2000)
    await lightSwitch(yellow, 1000)
}

lightStep()