import { events } from './event.js'

export function useMenuDragger(data, containerRef, targetNameActive) {
    // 记录拖拽前组件
    let currentComponent = null

    // dragenter 进入元素中，添加一个移动的标识
    function dragenter(e) {
        // H5拖动的图标
        e.dataTransfer.dropEffect = 'move'
    }

    // dragover 在目标元素经过，必须要阻止默认行为，否则不能触发drop
    function dragover(e) {
        e.preventDefault()
    }

    // dragleave 离开元素的时候，需要增加一个禁用标识
    function dragleave(e) {
        e.dataTransfer.dropEffect = 'none'
    }

    // drop 松手的时候，根据拖拽的组件，添加一个组件
    function drop(e) {
        // console.log('当前移动的组件', currentComponent)
        // console.log('当前移动事件', e)
        // console.log('当前tab页面标识',targetNameActive.value)
        data.value = {
            ...data.value,
            blocks: [
                ...data.value.blocks,
                {
                    top: e.offsetY,
                    left: e.offsetX,
                    zIndex: 1,
                    key: currentComponent.key,
                    // 松开鼠标时居中
                    alignCenter: true,
                    props: {},
                    // 判断是否首次拖拽组件
                    isFirst: true,
                    style: {
                        top: e.offsetY,
                        left: e.offsetX,
                        // width: 100,
                        // height: 100
                    },
                    // 当前tab页面标识
                    activeTab: targetNameActive.value,
                    events: [],
                    components: []
                }]
        }

        // console.log('当前数据', data.value)
        currentComponent = null
    }
    // 添加绑定事件
    function dragstart(e, component) {
        // console.log(containerRef.value)
        // console.log('e', e)
        // console.log('component', component)
        containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value.addEventListener('dragover', dragover)
        containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value.addEventListener('drop', drop)
        currentComponent = component

        // 发布start
        events.emit('start')
    }
    // 清除绑定事件 
    const dragend = () => {
        containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value.removeEventListener('drop', drop)

        // 发布end
        events.emit('end')
    }
    return {
        dragstart,
        dragend
    }
}