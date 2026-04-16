/**
 * 小红定义一个正整数x为完美偶数，当且仅当：
 * 1. x是偶数
 * 2. l ≤ x ≤ r
 * 小红拿到了一个长度为n的数组{a1,a2,⋯,an}，她想知道该数组中有多少个完美偶数。
 * 输入格式：
 * 第一行输入三个整数n,l,r(1≤n≤100;1≤l≤r≤100)
 * 第二行输入n个整数a1,a2,⋯,an(1≤ai≤100)
 * 输出格式：
 * 输出一个整数，表示数组中完美偶数的数量。
 * 输入样例：
 * 5 3 8
 * 1 2 6 8 7
 * 输出样例：
 * 2
 */

// ACM模式
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 读取输入
    const firstLine = await readline();
    const [n, l, r] = firstLine.split(' ').map(Number);
    const secondLine = await readline();
    const array = secondLine.split(' ').map(Number);

    let count = 0;

    for (const num of array) {
        if (num % 2 === 0 && num >= l && num <= r) {
            count++;
        }
    }

    console.log(count);
}()