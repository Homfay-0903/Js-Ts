function debounce(fn, delay = 500) {
    let timer = null;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// 1. 你要防抖的函数
function search(keyword) {
    console.log("发送搜索请求：", keyword);
}

// 2. 用 debounce 包裹一下，变成防抖版
const debounceSearch = debounce(search, 500);

// 3. 使用：连续调用只会执行最后一次
debounceSearch("a");
debounceSearch("ap");
debounceSearch("app");
debounceSearch("apple");
debounceSearch("apple123");

// 结果：只打印一次 → 发送搜索请求：apple