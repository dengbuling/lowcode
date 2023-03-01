export function handleTabs(editableTabs, editableTabsValue, targetNameActive) {

    // editableTabs TabPane页面循环列表
    // editableTabsValue v-model绑定的正在编辑的内容区TabPane.name
    // targetNameActive 当前选中的TabPane页面

    let tabIndex = 1

    function handleTabsEdit(targetName, action) {
        if (action === 'add') {
            const newTabName = `${++tabIndex}`
            editableTabs.value.push({
                title: `index ${newTabName}`,
                name: Number(newTabName),
                // content: 'New Tab content',
            })
            editableTabsValue.value = Number(newTabName)
            // console.log('新增加的页面',newTabName)
        } else if (action === 'remove') {
            if (targetName == 0) {
                // console.log('只有一个tab页时无法删除')
                return
            } else {
                const tabs = editableTabs.value
                let activeName = editableTabsValue.value
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1]
                            // console.log('下一页', nextTab.name)
                            if (nextTab) {
                                activeName = nextTab.name
                            }
                        }
                    })
                }
                editableTabsValue.value = activeName
                editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
            }
        }
    }

    function handleTabChange(pane) {
        targetNameActive.value = Number(pane)
    }

    return {
        handleTabsEdit,
        handleTabChange
    }
}