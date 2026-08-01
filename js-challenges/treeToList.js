/*
function treeToList(tree) {
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
}
treeToList(data)
*/

/**实现将 树形结构 转换为 数组（list）结构 */

function treeToList(tree) {
    const res = []
    const visited = new Set()

    function traverse(nodes) {
        for (const node of nodes) {
            if (visited.has(node)) {
                continue
            }

            visited.add(node)
            const { children, ...rest } = node
            res.push(rest)

            if (Array.isArray(children) && children.length) {
                traverse(children)
            }
        }
    }

    traverse(tree)

    return res
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

console.log(treeToList(data))