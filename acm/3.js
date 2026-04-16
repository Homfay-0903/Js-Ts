/**
 * 给定一个仅由数字1到9组成的字符串s。你可以在字符串s中任意两个相邻的数字符之间插入加号运算符'+'。
 * 每对相邻数字可选择插入一个加号或不插入加号。
 * 计算所有通过合法插入'+'构成的数学表达式中，有多少个表达式的计算结果是一个质数。
 * 输入格式：
 * 一行输入一个长度为1≤len(s)≤15的字符串s
 * 输出格式：
 * 输出一个整数，代表计算结果为质数的合法表达式的数量。
 * 输入样例：
 * 1234
 * 输出样例：
 * 3
 */

// ACM模式
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 质数判断函数
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

// 生成所有可能的表达式并计算结果
function countPrimeExpressions(s) {
    const n = s.length;
    let count = 0;

    // 生成所有可能的分割方式（2^(n-1)种）
    for (let mask = 0; mask < (1 << (n - 1)); mask++) {
        let sum = 0;
        let currentNumber = 0;

        for (let i = 0; i < n; i++) {
            // 构建当前数字
            currentNumber = currentNumber * 10 + parseInt(s[i]);

            // 检查是否需要在当前位置后插入加号
            if (i === n - 1 || (mask & (1 << i))) {
                sum += currentNumber;
                currentNumber = 0;
            }
        }

        // 检查和是否为质数
        if (isPrime(sum)) {
            count++;
        }
    }

    return count;
}

void async function () {
    const s = await readline();
    const result = countPrimeExpressions(s);
    console.log(result);
}()