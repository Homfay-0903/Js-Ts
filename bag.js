/**
 * 完全背包：最少砝码组合
 * @param {number[]} weights - 可用砝码重量数组
 * @param {number} target - 目标重量
 * @return {number} - 最少砝码数，无法组成返回 -1
 * 
 * 思路：dp[i] = 组成重量 i 所需的最少砝码数
 *       dp[i] = min(dp[i], dp[i - weight] + 1) 对于每个 weight
 */

function minWeights(weights, target) {
    const dp = new Array(target + 1).fill(Infinity)
    dp[0] = 0

    for (let i = 1; i <= target; i++) {
        for (const weight of weights) {
            if (weight <= i && dp[i - weight] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - weight] + 1)
            }
        }
    }

    return dp[target] === Infinity ? -1 : dp[target]
}

console.log(minWeights([1, 3, 4], 6)); // 2 (3+3 或 4+1+1 中最少是 2)
console.log(minWeights([2, 5], 3)); // -1 (无法组成)