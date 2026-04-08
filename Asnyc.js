var delay = 1000; // 定义一个外部变量
for (var i = 1; i <= 5; i++) {
    // 注意：这里传入的是变量 delay，而不是 i * 1000
    setTimeout(function () {
        console.log('i 的值:', i);
    }, delay);

    delay += 1000; // 每次循环让延迟时间也增加
}