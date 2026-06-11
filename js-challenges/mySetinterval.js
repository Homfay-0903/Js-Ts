function mySetInterval(callback, delay) {
    const timerMarker = {
        id: null
    }

    function run() {
        callback()

        if (timerMarker.id !== null) {
            timerMarker.id = setTimeout(run, delay)
        }
    }

    timerMarker.id = setTimeout(run, delay)

    return function myClearInterval() {
        clearTimeout(timerMarker.id)
        timerMarker.id = null
    }
}

let count = 0

const clearIntervalFunc = mySetInterval(() => {
    count++
    console.log(`执行第 ${count} 次`)

    if (count === 5) {
        clearIntervalFunc() // 5次后停止
        console.log('定时器已停止')
    }
}, 1000)