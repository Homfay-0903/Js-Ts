/*
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
*/

/**实现循环亮灯 */
function red() {
    console.log('now is red')
}
function green() {
    console.log('now is green')
}
function yellow() {
    console.log('now is yellow')
}

function lightSwitch(callback, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                callback()
                resolve()
            } catch (error) {
                reject(error)
            }
        }, delay)
    })
}

async function lightStart() {
    await lightSwitch(red, 1000)
    await lightSwitch(green, 2000)
    await lightSwitch(yellow, 3000)
}

(async function() {
    while (true) {
        await lightStart()
    }
})()