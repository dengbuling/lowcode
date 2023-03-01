import { defineComponent } from "vue";
import { events } from "./event"

export default defineComponent({

    props: {
        block: { type: Object },
        component: { type: Object },
    },
    setup(props) {

        // console.log('拖拽的组件', props.block)

        let data = {}

        const onMousemove = (e) => {
            // console.log(e)
            let { clientX, clientY } = e
            let { startX, startY, startWidth, startHeight, startLeft, startTop, direction } = data

            // 如果拖拽的是横向中间的点，X轴不变
            if (direction.horizontal == 'center') {
                clientX = startX
            }
            // 如果拖拽的是纵向中间的点，Y轴不变
            if (direction.vertical == 'center') {
                clientY = startY
            }

            // 鼠标移动距离
            let durX = clientX - startX
            let durY = clientY - startY

            // 判断选中点为左侧起点
            if (direction.horizontal == 'start') {
                durX = -durX
                props.block.style.left = startLeft - durX
                // props.block.left = startLeft - durX
            }
            if (direction.vertical == 'start') {
                durY = -durY
                props.block.style.top = startTop - durY
                // props.block.top = startTop - durY
            }

            const width = durX + startWidth
            const height = durY + startHeight

            props.block.style.height = height
            props.block.style.width = width
            // props.block.height = height
            // props.block.width = width
            props.block.hasResize = true
        }

        const onMouseup = () => {
            document.body.removeEventListener('mousemove', onMousemove)
            document.body.removeEventListener('mouseup', onMouseup)
            // 鼠标抬起后记录元素位置
            events.emit('end')
        }

        const onmousedown = (e, direction) => {
            // console.log(e, direction)

            // 阻止事件冒泡，阻止元素被拖动
            e.stopPropagation()

            data = {
                startX: e.clientX,
                startY: e.clientY,
                startWidth: props.block.style.width,
                startHeight: props.block.style.height,
                startLeft: props.block.style.left,
                startTop: props.block.style.top,
                // startWidth: props.block.width,
                // startHeight: props.block.height,
                // startLeft: props.block.left,
                // startTop: props.block.top,
                direction
            }

            document.body.addEventListener('mousemove', onMousemove)
            document.body.addEventListener('mouseup', onMouseup)
        }

        return () => {
            const { width, height } = props.component.resize || {}
            // console.log(width, height)
            return <>
                {width && <>
                    <div class="block-resize block-resize-left" onMousedown={e => onmousedown(e, { horizontal: 'start', vertical: 'center' })}></div>
                    <div class="block-resize block-resize-right" onMousedown={e => onmousedown(e, { horizontal: 'end', vertical: 'center' })}></div>
                </>}
                {height && <>
                    <div class="block-resize block-resize-top" onMousedown={e => onmousedown(e, { horizontal: 'center', vertical: 'start' })}></div>
                    <div class="block-resize block-resize-bottom" onMousedown={e => onmousedown(e, { horizontal: 'center', vertical: 'end' })}></div>
                </>}
                {width && height && <>
                    <div class="block-resize block-resize-top-left" onMousedown={e => onmousedown(e, { horizontal: 'start', vertical: 'start' })}></div>
                    <div class="block-resize block-resize-top-right" onMousedown={e => onmousedown(e, { horizontal: 'end', vertical: 'start' })}></div>
                    <div class="block-resize block-resize-bottom-left" onMousedown={e => onmousedown(e, { horizontal: 'start', vertical: 'end' })}></div>
                    <div class="block-resize block-resize-bottom-right" onMousedown={e => onmousedown(e, { horizontal: 'end', vertical: 'end' })}></div>
                </>}
            </>
        }
    }
})