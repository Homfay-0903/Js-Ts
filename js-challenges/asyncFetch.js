async function asyncFetch() {
    const api1 = new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve('api1')
            }, 1000)
        } catch (error) {
            reject(error)
        }
    })
    const api2 = new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve('api2')
            }, 4000)
        } catch (error) {
            reject(error)
        }
    })
    const api3 = new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve('api3')
            }, 3000)
        } catch (error) {
            reject(error)
        }
    })

    Promise.all([api1, api2, api3])
        .then((res) => {
            console.log(...res)
        })
        .catch((err) => {
            console.error(err)
        })
}

asyncFetch()