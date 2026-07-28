/*
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
*/

async function asyncFetch(params) {
    const api1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve('api1')
            } catch (error) {
                reject(error)
            }
        }, 3000);
    })

    const api2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                
                resolve('api2')
            } catch (error) {
                reject(error)
            }
        }, 3000);
    })

    const api3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve('api3')
            } catch (error) {
                reject(error)
            }
        }, 3000)
    })

    return Promise.all([api1, api2, api3])
        .then(
            (res) => {
                console.log(...res)
            },
            (err) => {
                console.log(err)
            }
        )
}

asyncFetch()