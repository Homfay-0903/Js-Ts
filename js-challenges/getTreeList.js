let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 0 },
]

function getTreeList(rootList, parentId) {
    const result = []

    for (const node of rootList) {
        if (node.pid === parentId) {
            const newNode = { ...node }
            const children = getTreeList(rootList, newNode.id)

            if (children.length) {
                newNode.children = children
            }

            result.push(newNode)
        }
    }

    return result
}

const res = getTreeList(arr, 0)
console.log('res:', JSON.stringify(res, null, 2))
console.log('arr', arr)

/*function getTreeList(rootList, parentId) {
    const result = [];

    for (const node of rootList) {
        if (node.pid === parentId) {
            const newNode = { ...node };
            const children = getTreeList(rootList, node.id);

            if (children.length > 0) {
                newNode.children = children;
            }

            result.push(newNode);
        }
    }

    return result;
}

const res = getTreeList(arr, 0);
console.log("res", JSON.stringify(res, null, 2));*/