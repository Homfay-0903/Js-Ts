const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

const MOD = 1000000007n;

function powMod(base, exponent, mod) {
    let result = 1n;
    base = base % mod;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % mod;
        }
        exponent = exponent >> 1n;
        base = (base * base) % mod;
    }
    return result;
}

void async function () {
    let T = parseInt(await readline());
    while (T--) {
        let n = BigInt(await readline());
        let total = powMod(3n, n, MOD);
        let bad = 7n;
        let ans = (total - bad + MOD) % MOD;
        console.log(ans.toString());
    }
}()