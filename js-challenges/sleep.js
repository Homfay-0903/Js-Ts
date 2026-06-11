function sleep(timeout) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, timeout)
        } catch (error) {
            reject(error)
        }
    })
}

async function test(timeout) {
    console.log('1')
    await sleep(timeout)
    console.log('2')
}

test(2000)