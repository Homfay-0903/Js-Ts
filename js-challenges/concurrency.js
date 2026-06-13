function concurrency(urlArray) {
    const requestArray = urlArray.map((url) => {
        fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            } else {
                return response
            }
        })
    })

    return Promise.any(requestArray)
}

const urls = [
    'https://baidu.com',
    'https://github.com',
    'https://github.com'
]

concurrency(urls)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))