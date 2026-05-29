const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let n = parseInt(await readline());
    let grid = [];

    for (let k = 0; k < n; k++) {
        let layer = [];
        for (let i = 0; i < n; i++) {
            let line = await readline();
            let row = line.split(' ').map(Number);
            layer.push(row);
        }
        grid.push(layer);
    }

    let maxSum = -Infinity;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;

                for (let x = 0; x < n; x++) {
                    for (let y = 0; y < n; y++) {
                        for (let z = 0; z < n; z++) {
                            let endX = x + (n - 1) * dx;
                            let endY = y + (n - 1) * dy;
                            let endZ = z + (n - 1) * dz;

                            if (endX < 0 || endX >= n || endY < 0 || endY >= n || endZ < 0 || endZ >= n) {
                                continue;
                            }

                            let sum = 0;
                            for (let k = 0; k < n; k++) {
                                let cx = x + k * dx;
                                let cy = y + k * dy;
                                let cz = z + k * dz;
                                sum += grid[cz][cy][cx];
                            }

                            if (sum > maxSum) {
                                maxSum = sum;
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(maxSum);
}()