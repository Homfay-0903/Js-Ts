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