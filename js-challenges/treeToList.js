/**
 * 树形结构转列表 - 递归版
 * @param {Array} tree - 树形数组
 * @returns {Array} 扁平列表
 */
/*function treeToList(tree) {
    const result = []

    const traverse = (nodes) => {
        nodes.forEach((node) => {
            const { children, ...rest } = node

            if (children) {
                traverse(children)
            }

            result.push(rest)
        })
    }
    traverse(tree)

    console.log(result)
}*/

function treeToList(tree) {
    const res = []

    const dfs = (nodes) => {
        for (const node of nodes) {
            const { children, ...rest } = node

            if (children) {
                dfs(children)
            }

            res.push(rest)
        }
    }
    dfs(tree)

    return res.reverse()
}

const data = [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                parentId: 1
            }
        ]
    }
]

const list = treeToList(data)
console.log(list)