/*
const cacheMap = new Map()

const generateKey = (fnName, params) => {
    return `${fnName}::${params ? JSON.stringify(params) : ''}`
}

const useCache = (fn, ttl = 5 * 60 * 1000) => {
    return async (params, forceRefresh = false) => {
        const key = generateKey(fn.name, params)
        const cached = cacheMap.get(key)

        if (!forceRefresh && cached && Date.now() < cached.expireAt) {
            return cached.data
        }

        const data = await fn(params)
        cacheMap.set(key, { data, expireAt: ttl + Date.now() })

        return data
    }
}
*/

/**实现缓存函数(hook) */
function useCache(fn, ttl = 5 * 60 * 1000) {
    const cacheMap = new Map()

    function generateKey(fnName, params) {
        return `${fnName}::${params ? JSON.stringify(params) : ''}`
    }

    return async function (params, forceRefresh = false) {
        const key = generateKey(fn.name, params)
        const cached = cacheMap.get(key)

        if (!forceRefresh && cached && Date.now() < cached.expireAt) {
            return cached.data
        } else {
            const data = await fn(params)
            cacheMap.set(key, { data, expireAt: ttl + Date.now() })
            return data
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function testBasicCache() {
    console.log('=== 测试1: 基本缓存功能 ===')
    
    let callCount = 0
    async function fetchData(params) {
        callCount++
        console.log(`第${callCount}次调用 fetchData，参数: ${JSON.stringify(params)}`)
        return { data: `result-${params.id}`, timestamp: Date.now() }
    }
    
    const cachedFetch = useCache(fetchData, 10000)
    
    const result1 = await cachedFetch({ id: 1 })
    console.log('第一次调用结果:', result1)
    
    const result2 = await cachedFetch({ id: 1 })
    console.log('第二次调用结果:', result2)
    
    console.log('调用次数:', callCount)
    console.assert(callCount === 1, '应该只调用一次原始函数')
    console.log('✓ 测试通过: 缓存生效\n')
}

async function testCacheExpiration() {
    console.log('=== 测试2: 缓存过期机制 ===')
    
    let callCount = 0
    async function fetchData(params) {
        callCount++
        return { data: `result-${params.id}`, callCount }
    }
    
    const cachedFetch = useCache(fetchData, 100)
    
    const result1 = await cachedFetch({ id: 1 })
    console.log('第一次调用:', result1)
    
    await sleep(150)
    
    const result2 = await cachedFetch({ id: 1 })
    console.log('缓存过期后调用:', result2)
    
    console.assert(callCount === 2, '缓存过期后应该重新调用')
    console.log('✓ 测试通过: 缓存正确过期\n')
}

async function testForceRefresh() {
    console.log('=== 测试3: 强制刷新功能 ===')
    
    let callCount = 0
    async function fetchData(params) {
        callCount++
        return { data: `result-${params.id}`, callCount }
    }
    
    const cachedFetch = useCache(fetchData, 10000)
    
    const result1 = await cachedFetch({ id: 1 })
    console.log('第一次调用:', result1)
    
    const result2 = await cachedFetch({ id: 1 }, true)
    console.log('强制刷新后调用:', result2)
    
    console.assert(callCount === 2, '强制刷新应该重新调用')
    console.log('✓ 测试通过: 强制刷新功能正常\n')
}

async function testDifferentParams() {
    console.log('=== 测试4: 不同参数的缓存隔离 ===')
    
    let callCount = 0
    async function fetchData(params) {
        callCount++
        return { data: `result-${params.id}`, callCount }
    }
    
    const cachedFetch = useCache(fetchData, 10000)
    
    const result1 = await cachedFetch({ id: 1 })
    console.log('参数 {id:1} 结果:', result1)
    
    const result2 = await cachedFetch({ id: 2 })
    console.log('参数 {id:2} 结果:', result2)
    
    const result3 = await cachedFetch({ id: 1 })
    console.log('再次参数 {id:1} 结果:', result3)
    
    console.assert(callCount === 2, '不同参数应该分别缓存')
    console.log('✓ 测试通过: 参数隔离正确\n')
}

async function testCacheKeyGeneration() {
    console.log('=== 测试5: 缓存键生成 ===')
    
    async function myFunction(params) {
        return { data: 'test', params }
    }
    
    const cachedFn = useCache(myFunction, 10000)
    
    const result1 = await cachedFn({ a: 1, b: 2 })
    const result2 = await cachedFn({ b: 2, a: 1 })
    
    console.log('✓ 测试说明: 缓存键基于参数的JSON序列化\n')
}

async function testNoParams() {
    console.log('=== 测试6: 无参数调用 ===')
    
    let callCount = 0
    async function simpleFunction() {
        callCount++
        return { message: 'hello', callCount }
    }
    
    const cachedFn = useCache(simpleFunction, 10000)
    
    const result1 = await cachedFn()
    console.log('第一次无参数调用:', result1)
    
    const result2 = await cachedFn()
    console.log('第二次无参数调用:', result2)
    
    console.assert(callCount === 1, '无参数调用也应该缓存')
    console.log('✓ 测试通过: 无参数缓存正常\n')
}

async function runAllTests() {
    try {
        await testBasicCache()
        await testCacheExpiration()
        await testForceRefresh()
        await testDifferentParams()
        await testCacheKeyGeneration()
        await testNoParams()
        
        console.log('===================')
        console.log('所有测试通过! ✓')
        console.log('===================')
    } catch (error) {
        console.error('测试失败:', error)
    }
}

runAllTests()