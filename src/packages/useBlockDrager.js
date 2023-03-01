import { reactive } from "vue"
import { events } from "./event"
// 实现组件拖拽
export function useBlockDrager(focusData, lastSelectBlock, data) {

    let dragState = {
        startX: 0,
        startY: 0,
        // 默认不是正在拖拽
        dragging: false
    }

    // 辅助线位置
    let markLine = reactive({
        x: null,
        y: null
    })

    const mousedown = (e) => {
        // console.log('最后选中的组件', lastSelectBlock.value)

        const { width: BWidth, height: BHeight } = lastSelectBlock.value.style

        // const { width: BWidth, height: BHeight } = lastSelectBlock.value

        // 记录鼠标开始点击的位置
        dragState = {
            startX: e.clientX,
            startY: e.clientY,
            // 元素拖拽前的位置
            // startLeft: lastSelectBlock.value.left,
            // startTop: lastSelectBlock.value.top,
            startLeft: lastSelectBlock.value.style.left,
            startTop: lastSelectBlock.value.style.top,
            dragging: false,
            // 映射生成数组
            startPosition: focusData.value.focus.map(({ style }) => ({ top: style.top, left: style.left })),
            // startPosition: focusData.value.focus.map(({ top, left }) => ({ top, left })),
            lines: (() => {
                let lines = { x: [], y: [] }
                let allPosition = [
                    ...focusData.value.unfocus,
                    {
                        style: {
                            top: 0,
                            left: 0,
                            width: data.value.container.width,
                            height: data.value.container.height
                        }
                        // top: 0,
                        // left: 0,
                        // width: data.value.container.width,
                        // height: data.value.container.height
                    }
                ]
                allPosition.forEach(element => {
                    const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = element.style
                    // const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = element

                    // showTop 表示未选中组件显示辅助线位置，top 表示拖动组件距离顶部高度
                    // 当B元素top拖拽到和A元素top一致的时候，要显示这根辅助线，辅助线的位置就是ATop
                    lines.y.push({ showTop: ATop, top: ATop })
                    // 当B元素top拖拽到和A元素bottom一致的时候，要显示这根辅助线，辅助线的位置就是ATop
                    lines.y.push({ showTop: ATop, top: ATop - BHeight })
                    // 当B元素中间拖拽到和A元素中间一致的时候，要显示这根辅助线，辅助线的位置就是ATop+AHeight/2
                    lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2 })
                    // 当B元素bottom拖拽到和A元素top一致的时候，要显示这根辅助线，辅助线的位置就是ATop+AHeight
                    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight })
                    // 当B元素bottom拖拽到和A元素bottom一致的时候，要显示这根辅助线，辅助线的位置就是ATop+AHeight
                    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight })
                    // 当B元素left拖拽到和A元素left一致的时候
                    lines.x.push({ showLeft: ALeft, left: ALeft })
                    // 当B元素right拖拽到和A元素left一致的时候
                    lines.x.push({ showLeft: ALeft, left: ALeft - BWidth })
                    // 当B元素中间拖拽到和A元素中间一致的时候
                    lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - BWidth / 2 })
                    // 当B元素left拖拽到和A元素right一致的时候
                    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth })
                    // 当B元素right拖拽到和A元素right一致的时候
                    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth })

                });
                // console.log('辅助线出现的位置', lines)
                return lines
            })()
        }
        // console.log('未被选中的组件', focusData.value.unfocus)
        // console.log('鼠标点击初始位置', dragState)
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)

        if (!dragState.dragging) {
            dragState.dragging = true
            // 触发事件就会记录拖拽前的位置
            events.emit('start')
        }
    }
    const mousemove = (e) => {
        // console.log("选中组件正在移动")
        let { clientX: moveX, clientY: moveY } = e

        // if (!dragState.dragging) {
        //     dragState.dragging = true
        //     // 触发事件就会记录拖拽前的位置
        //     events.emit('start')
        // }

        // 计算当前元素最新的left和top
        let moveingLeft = moveX - dragState.startX + dragState.startLeft
        let moveingTop = moveY - dragState.startY + dragState.startTop


        const { width: BlockWidth, height: BlockHeight } = lastSelectBlock.value.style
        if (moveingLeft <= 0) {
            moveingLeft = 0
        }
        if (moveingTop <= 0) {
            moveingTop = 0
        }
        if (moveingLeft >= data.value.container.width - BlockWidth) {
            moveingLeft = data.value.container.width - BlockWidth
        }
        if (moveingTop >= data.value.container.height - BlockHeight) {
            moveingTop = data.value.container.height - BlockHeight
        }
        // console.log('鼠标X轴位置',moveX)
        // console.log('鼠标Y轴位置',moveY)
        // console.log('拖拽内容区内最新的left',moveingLeft)
        // console.log('拖拽内容区内最新的top',moveingTop)

        let movingX = null
        let movingY = null

        dragState.lines.y.some((item) => {
            // 如果小于5说明元素接近辅助线了
            if (Math.abs(item.top - moveingTop) < 5) {
                // console.log('moveingTop')
                movingY = item.showTop
                // 实现快速和辅助线元素贴在一起
                // 鼠标到屏幕顶部距离-元素到容器顶部距离+辅助线元素到容器顶部距离
                moveY = dragState.startY - dragState.startTop + item.top
                return true
            }
        })
        // 如果小于5说明元素接近辅助线了
        dragState.lines.x.some((item) => {
            if (Math.abs(item.left - moveingLeft) < 5) {
                // console.log('moveingLeft')
                movingX = item.showLeft
                // 实现快速和辅助线元素贴在一起
                // 鼠标到屏幕左侧距离-元素到容器左侧距离+辅助线元素到容器左侧距离
                moveX = dragState.startX - dragState.startLeft + item.left
                return true
            }
        })

        markLine.x = movingX
        markLine.y = movingY

        // 移动后的距离-移动前的距离
        let durX = moveX - dragState.startX
        let durY = moveY - dragState.startY

        // 鼠标移动修改组件位置
        focusData.value.focus.forEach((block, index) => {
            block.top = dragState.startPosition[index].top + durY
            block.left = dragState.startPosition[index].left + durX
            // 样式写在style里
            block["style"]["top"] = dragState.startPosition[index].top + durY
            block["style"]["left"] = dragState.startPosition[index].left + durX
        })

    }
    // 鼠标离开时清空事件
    const mouseup = (e) => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        markLine.x = null
        markLine.y = null

        if (dragState.dragging) {
            // debugger
            // 触发事件就会记录拖拽后的位置
            events.emit('end')
            // 触发事件更新Tab
            events.emit("refreshTab")
        }
    }

    return {
        mousedown,
        markLine
    }
}