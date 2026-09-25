async function async1() {
    //await async2()
    await async2().catch((err) => console.log(err));
    console.log('async1');
    return 'async1 success'
}
async function async2() {
    return new Promise((resolve, reject) => {
        console.log('async2')
        reject('error')
    })
}
async1().then(res => console.log(res))
//console.log(1)

//!!
/**
 * async2
 * error
 * async1
 * async1 success
 */