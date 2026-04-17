var delay = 1000; // 定义一个外部变量
for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
        console.log('i 的值:', i);
    }, delay);

    delay += 1000; // 每次循环让延迟时间也增加
}