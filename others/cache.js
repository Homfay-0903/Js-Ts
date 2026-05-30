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