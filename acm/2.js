/**
 * 蛇鸟是一种类似于蛇和鸟的可爱生物。蛇鸟的主要食物是水果，每吃一个水果，它的长度就会增加1。
 * 水果离地面具有一定的高度，第i(1 ≤ i ≤ N)个果实的高度为hi。蛇鸟可以吃到小于等于其长度的水果。
 * 当蛇鸟的初始长度为L时，求它吃水果能达到的最大长度。
 * 输入格式：
 * 第一行给出水果的数量N，和蛇鸟初始长度的整数L。
 * 第二行给出整数h1,h2,…,hN
 * 输出格式：
 * 输出蛇鸟的最大长度。
 * 输入样例：
 * 3 10
 * 10 11 13
 * 输出样例：
 * 12
 */

// ACM模式
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 读取输入
    const firstLine = await readline();
    const [N, L] = firstLine.split(' ').map(Number);
    const secondLine = await readline();
    const heights = secondLine.split(' ').map(Number);

    // 对水果高度排序
    heights.sort((a, b) => a - b);

    let currentLength = L;

    for (const h of heights) {
        if (h <= currentLength) {
            currentLength++;
        } else {
            break;
        }
    }

    console.log(currentLength);
}()