function outTime() {
    const p1 = new Promise((resolve, reject) => {
        try {
            setTimeout(() => resolve('success'), 4000)
        } catch (error) {
            reject(error)
        }
    })

    const p2 = new Promise((resolve, reject) => {
        try {
            setTimeout(() => reject('failed'), 3000)
        } catch (error) {
            reject(error)
        }
    })

    return Promise.race([p1, p2])
}

outTime()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))