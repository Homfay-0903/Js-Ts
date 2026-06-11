## 代码执行顺序分析（基于事件循环）

### 整体执行流程图## 执行顺序详解

### 同步启动阶段（0ms）

`lightStep()` 被调用，进入调用栈。它执行第一个 `await lightSwitch(red, 3000)`。

`lightSwitch` 内部立即 `new Promise`，executor 函数**同步**运行，调用 `setTimeout`，把回调注册到 Web API 的计时器里。此时 executor 出栈，Promise 处于 pending 状态，`await` 遇到未 resolved 的 Promise，**将 `lightStep` 挂起**，把后续代码打包成一个回调等待恢复，控制权交还给事件循环。调用栈此刻清空。

### 宏任务阶段（3000ms 后）

计时器到期，Web API 将 `setTimeout` 的回调**推入宏任务队列**。事件循环发现调用栈为空，取出这个回调执行：

1. 调用 `red()`，打印 `now is red`
2. 调用 `resolve()`，Promise 状态变为 fulfilled
3. resolve 会将 `.then` 注册的恢复回调**推入微任务队列**

### 微任务阶段（紧接在宏任务之后）

宏任务执行完毕后，事件循环**优先清空微任务队列**：

- `await` 对应的恢复回调执行，`lightStep` 从挂起点继续往下走
- 遇到第二个 `await lightSwitch(green, 2000)`，重复上述流程

### 关键机制总结

| 概念                   | 在本代码中的体现                                |
| ---------------------- | ----------------------------------------------- |
| `async/await` 是语法糖 | 每个 `await` 本质是 `.then()` 注册微任务        |
| `setTimeout` 是宏任务  | 回调进入宏任务队列，不阻塞主线程                |
| 微任务优先于宏任务     | `resolve()` 后立即调度恢复，不等下一轮          |
| 顺序保证来自 `await`   | 没有 `await` 的话三个 setTimeout 会几乎同时触发 |

三个灯的总耗时 ≈ 3000 + 2000 + 1000 = **6000ms**，且严格保持红→绿→黄的顺序，正是 `async/await` + 事件循环协作的结果。
