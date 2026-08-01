/*
// 你的代码
function fetchUser(id) {
    // TODO
    return new Promise((resloved, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resloved({
                    id,
                    name: 'alice'
                })
            } else {
                reject('user not found')
            }
        }, 2000);
    })
}

fetchUser(1)
    .then(user => console.log(user))
    .catch(err => console.error(err));
fetchUser(2)
    .then(user => console.log(user))
    .catch(err => console.error(err));
*/

/**实现获取特定用户信息的函数 */
function getUniqueUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (userId === 1) {
                    resolve({
                        id: userId,
                        name: 'jack'
                    })
                } else {
                    reject('can get this user')
                }
            } catch (error) {
                reject(error)
            }
        }, 1000)
    })
}

getUniqueUser(1)
    .then(
        (res) => console.log(res),
        (err) => console.log(err)
    )
getUniqueUser(2)
    .then(
        (res) => console.log(res),
        (err) => console.log(err)
    )