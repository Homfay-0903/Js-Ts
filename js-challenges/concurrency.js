/*
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
*/

//函数介绍：并发请求多个url，返回第一个响应的url
//参数：urlArray - url数组
//返回值：Promise对象，resolve为第一个响应的url，reject为错误信息

/**
 * 
 * @param {Array} urlList 
 */
function concurrency(urlList) {
    const requestList = urlList.map((url) => {
        fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            } else {
                return response
            }
        })
    })

    return Promise.any(requestList)
}

const urls = [
    'https://baidu.com',
    'https://github.com',
    'https://github.com'
]

concurrency(urls)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))