// 原对象
const target = { name: "小明", age: 18 };

// 创建代理：给对象装"保安"
const proxy = new Proxy(target, {
    // 拦截 读取属性
    get(target, prop) {
        console.log(`拦截读取：${prop}`);
        return target[prop];
    },

    // 拦截 修改/新增属性
    set(target, prop, value) {
        console.log(`拦截修改：${prop} = ${value}`);
        target[prop] = value;
        return true;
    },

    // 拦截 删除属性
    deleteProperty(target, prop) {
        console.log(`拦截删除：${prop}`);
        delete target[prop];
        return true;
    }
});

// 测试：所有操作都被拦截
proxy.name;        // 读拦截
proxy.age = 20;    // 改拦截
console.log(proxy.age)
proxy.gender = "男";// 新增属性拦截
delete proxy.age;  // 删除拦截