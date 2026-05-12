// 原对象
const target = { name: "小明", age: 18 };

// 创建代理：给对象装"保安"
const proxy = new Proxy(target, {
    // 拦截 读取属性
    get(target, key) {
        console.log(`拦截读取：${key}`)
        return target[key]
    },

    // 拦截 修改/新增属性
    set(target, key, value) {
        if (target[key]) {
            console.log(`拦截修改, ${key} = ${value}`)
        } else {
            console.log(`拦截增加, ${key}, and add is ${key} = ${value}`)
        }

        target[key] = value
        return true
    },

    // 拦截 删除属性
    defineProperty(target, key) {
        console.log(`拦截删除：${key}`)
        delete target[key]
        return true
    }

});

// 测试：所有操作都被拦截
proxy.name;        // 读拦截
proxy.age = 20;    // 改拦截
console.log(proxy.age)
proxy.gender = "男";// 新增属性拦截
delete proxy.age;  // 删除拦截
