import { computed, ref } from "vue"
export function useFocus(props, previewRef, callBack) {
    // 记录哪些元素被选中了
    const focusData = computed(() => {
        let focus = []
        let unfocus = []
        props.modelValue.blocks.forEach(element => (element.focus ? focus : unfocus).push(element))
        return { focus, unfocus }
    })

    // 记录最后一个被选中组件的索引，-1表示没有任何一个被选中
    const selectIndex = ref(-1)

    // 最后选择的组件
    const lastSelectBlock = computed(() => props.modelValue.blocks[selectIndex.value])

    // 清空其他组件focus属性
    const clearBlockFocus = () => {
        props.modelValue.blocks.forEach(item => item.focus = false)
        selectIndex.value = -1
    }

    // 实现拖拽多个元素的功能
    const blockMousedown = (e, block, index) => {
        if (previewRef.value) return
        // 阻止默认事件
        e.preventDefault()
        // 阻止事件传播
        e.stopPropagation()
        if (e.shiftKey) {
            // 只有一个节点被选中时，按住shift键也不会切换focus状态
            if (focusData.value.focus.length > 1) {
                block.focus = !block.focus
            } else {
                block.focus = true
            }
        } else {
            // block上规定一个属性focus，获取焦点后focus将变为true
            if (!block.focus) {
                // 清空其他组件focus属性
                clearBlockFocus()
                block.focus = true
            }
        }

        // 记录最后一个被选中组件的索引
        selectIndex.value = index

        // 回调函数
        callBack(e)
    }
    return {
        clearBlockFocus,
        blockMousedown,
        focusData,
        lastSelectBlock
    }
}