const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => {
    const result = await iter.next();
    return result.value;
};

void async function () {
    let TLine = await readline();
    while (!TLine || TLine.trim() === '') {
        TLine = await readline();
    }
    let T = parseInt(TLine.trim());

    for (let t = 0; t < T; t++) {
        let line = await readline();
        while (!line || line.trim() === '') {
            line = await readline();
        }
        let tokens = line.trim().split(' ').filter(t => t);
        let n = parseInt(tokens[0]);
        let k = parseInt(tokens[1]);

        let aLine = await readline();
        while (!aLine || aLine.trim() === '') {
            aLine = await readline();
        }
        let a = aLine.trim().split(' ').filter(t => t).map(Number);

        let result = 0n;
        let countMap = new Map();

        for (let p = 0; p < n; p++) {
            for (let q = p + 1; q < n; q++) {
                let val = a[p] ^ a[q];
                let target = val ^ k;
                if (countMap.has(target)) {
                    result += BigInt(countMap.get(target));
                }
            }

            for (let i = 0; i < p; i++) {
                let val = a[i] ^ a[p];
                countMap.set(val, (countMap.get(val) || 0) + 1);
            }
        }

        console.log(result.toString());
    }
}()