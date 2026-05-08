// ========== 第3题：最大连续子数组和 (maxSubArray) ==========
// 使用 Kadane 算法实现
// 时间复杂度：O(n) - 只需遍历数组一次
// 空间复杂度：O(1) - 只使用常数额外空间

function maxSubArray(nums: number[]): number {
    if (nums.length === 0) return 0;

    let currentMax = nums[0];
    let globalMax = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // 当前元素要么加入前面的子数组，要么自己开始一个新子数组
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        // 更新全局最大值
        globalMax = Math.max(globalMax, currentMax);
    }

    return globalMax;
}

// 第3题测试用例
console.log("=== 第3题测试 ===");
console.log("maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) =", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log("maxSubArray([1]) =", maxSubArray([1])); // 1
console.log("maxSubArray([5, 4, -1, 7, 8]) =", maxSubArray([5, 4, -1, 7, 8])); // 23
console.log("maxSubArray([-3, -2, -1]) =", maxSubArray([-3, -2, -1])); // -1


// ========== 第5题：请求节流 + 重试工具 (createRequestThrottler) ==========
// 实现一个请求节流工具，控制异步请求的发出频率与失败重试策略

function createRequestThrottler(n: number) {
    let queue: Array<() => void> = [];
    let currentCount = 0;
    let lastResetTime = Date.now();

    // 每秒重置计数
    const resetCounter = () => {
        const now = Date.now();
        if (now - lastResetTime >= 1000) {
            currentCount = 0;
            lastResetTime = now;
        }
    };

    // 尝试处理队列中的请求
    const processQueue = () => {
        resetCounter();

        while (queue.length > 0 && currentCount < n) {
            const task = queue.shift();
            if (task) {
                currentCount++;
                task();
            }
        }
    };

    // 延迟后重新尝试处理队列
    const scheduleProcess = () => {
        setTimeout(() => {
            processQueue();
        }, 100); // 每100ms检查一次
    };

    return {
        request: <T>(fn: () => Promise<T>): Promise<T> => {
            return new Promise((resolve, reject) => {
                const MAX_RETRIES = 3;
                let retryCount = 0;

                // 执行请求（包含重试逻辑）
                const execute = () => {
                    fn()
                        .then(resolve)
                        .catch((error) => {
                            if (retryCount < MAX_RETRIES) {
                                retryCount++;
                                // 重试也需要加入队列，遵守节流规则
                                queue.push(execute);
                                scheduleProcess();
                            } else {
                                // 最终失败，返回最后一次错误
                                reject(error);
                            }
                        });
                };

                // 将执行函数加入队列
                queue.push(execute);
                scheduleProcess();
            });
        }
    };
}

// 第5题测试用例
console.log("\n=== 第5题测试 ===");
async function testThrottler() {
    const throttler = createRequestThrottler(2); // 每秒最多2个请求

    const startTime = Date.now();
    const tasks = Array.from({ length: 5 }, (_, i) =>
        throttler.request(async () => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            console.log(`Task ${i + 1} executed at ${elapsed}s`);
            // 模拟50%失败率用于测试重试
            if (Math.random() > 0.5) {
                throw new Error(`Task ${i + 1} failed`);
            }
            return `Task ${i + 1} success`;
        })
    );

    try {
        const results = await Promise.all(tasks);
        console.log("All tasks completed:", results);
    } catch (error) {
        console.log("Some task failed:", error);
    }
}


// ========== 第2题：Slider 滑动输入条组件 (HTML + CSS + JavaScript) ==========
// 以下是完整的 Slider 组件实现，包含HTML结构、CSS样式和JavaScript交互

const sliderHTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slider 滑动输入条组件</title>
    <style>
        .slider-container {
            width: 400px;
            margin: 50px auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .slider-track {
            position: relative;
            height: 6px;
            background-color: #e0e0e0;
            border-radius: 3px;
            cursor: pointer;
        }
        
        .slider-highlight {
            position: absolute;
            height: 100%;
            background-color: #2196f3;
            border-radius: 3px;
            left: 0;
            top: 0;
        }
        
        .slider-thumb {
            position: absolute;
            width: 24px;
            height: 24px;
            background-color: white;
            border: 2px solid #2196f3;
            border-radius: 50%;
            cursor: grab;
            top: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            transition: box-shadow 0.2s;
        }
        
        .slider-thumb:hover {
            box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
        }
        
        .slider-thumb:active {
            cursor: grabbing;
            box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
        }
        
        .slider-value {
            margin-top: 12px;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="slider-container">
        <div class="slider-track" id="sliderTrack">
            <div class="slider-highlight" id="sliderHighlight"></div>
            <div class="slider-thumb" id="sliderThumb"></div>
        </div>
        <div class="slider-value" id="sliderValue">当前值: 50%</div>
    </div>

    <script>
        class Slider {
            private track: HTMLElement;
            private highlight: HTMLElement;
            private thumb: HTMLElement;
            private valueDisplay: HTMLElement;
            private isDragging: boolean = false;
            private value: number = 50; // 0-100
            
            constructor(trackId: string, highlightId: string, thumbId: string, valueId: string) {
                this.track = document.getElementById(trackId)!;
                this.highlight = document.getElementById(highlightId)!;
                this.thumb = document.getElementById(thumbId)!;
                this.valueDisplay = document.getElementById(valueId)!;
                
                this.initEvents();
                this.updateUI();
            }
            
            private initEvents(): void {
                // 鼠标按下事件
                this.thumb.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    this.isDragging = true;
                    document.addEventListener('mousemove', this.onMouseMove);
                    document.addEventListener('mouseup', this.onMouseUp);
                });
                
                // 点击轨道事件
                this.track.addEventListener('click', (e) => {
                    if (!this.isDragging) {
                        const rect = this.track.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        this.setValueFromPosition(x);
                    }
                });
                
                // 触摸事件支持
                this.thumb.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.isDragging = true;
                    document.addEventListener('touchmove', this.onTouchMove);
                    document.addEventListener('touchend', this.onTouchEnd);
                });
            }
            
            private onMouseMove = (e: MouseEvent): void => {
                if (!this.isDragging) return;
                const rect = this.track.getBoundingClientRect();
                const x = e.clientX - rect.left;
                this.setValueFromPosition(x);
            };
            
            private onMouseUp = (): void => {
                this.isDragging = false;
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);
            };
            
            private onTouchMove = (e: TouchEvent): void => {
                if (!this.isDragging || !e.touches[0]) return;
                const rect = this.track.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                this.setValueFromPosition(x);
            };
            
            private onTouchEnd = (): void => {
                this.isDragging = false;
                document.removeEventListener('touchmove', this.onTouchMove);
                document.removeEventListener('touchend', this.onTouchEnd);
            };
            
            private setValueFromPosition(x: number): void {
                const trackWidth = this.track.offsetWidth;
                let newValue = (x / trackWidth) * 100;
                
                // 限制在 0-100 范围内
                newValue = Math.max(0, Math.min(100, newValue));
                this.value = Math.round(newValue);
                this.updateUI();
            }
            
            private updateUI(): void {
                // 更新高亮区域宽度
                this.highlight.style.width = `${ this.value }% `;
                
                // 更新滑块位置
                this.thumb.style.left = `${ this.value }% `;
                
                // 更新数值显示
                this.valueDisplay.textContent = `当前值: ${ this.value }% `;
            }
            
            public getValue(): number {
                return this.value;
            }
            
            public setValue(value: number): void {
                this.value = Math.max(0, Math.min(100, value));
                this.updateUI();
            }
        }
        
        // 初始化 Slider 组件
        const slider = new Slider('sliderTrack', 'sliderHighlight', 'sliderThumb', 'sliderValue');
    </script>
</body>
</html>
`;

// 输出 HTML 内容（用于复制）
console.log("\n=== 第2题 Slider 组件 HTML ===");
console.log(sliderHTML);

// 运行节流测试
// testThrottler();
