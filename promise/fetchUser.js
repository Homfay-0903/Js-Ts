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