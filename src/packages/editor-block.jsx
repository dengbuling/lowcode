import { computed, defineComponent, inject, onMounted, onUnmounted, ref, watch } from "vue";
import BlockResize from './block-resize'
import { BlockConfig } from '../utils/block-config'

export default defineComponent({
    props: {
        block: { type: Object },
        allBlocks: { type: Object },
        container: { type: Object },
        preview: { type: Boolean },
    },
    setup(props) {

        // props可以拿到父组件传来的blocks
        const block = computed(() => props.block)
        // console.log('父组件传来的block',props.block)

        const blockStyle = computed(() => ({
            top: `${block.value.style.top}px`,
            left: `${block.value.style.left}px`,
            zIndex: `${block.value.zIndex}`
        }))

        // 获取data配置数据
        const config = inject('config')

        // 获取拖拽元素DOM
        const blockRef = ref(null)

        // 设置拖拽松开鼠标后居中效果
        onMounted(() => {

            if (block.value.isFirst == true) {

                let { offsetWidth, offsetHeight } = blockRef.value
                // console.log('松开鼠标组件挂载后组件宽度',offsetWidth)
                // console.log('松开鼠标组件挂载后组件高度',offsetHeight)
                // console.log('松开鼠标组件挂载后组件数据',blockRef.value)

                // 获取第一次拖拽组件的配置信息
                BlockConfig(block, props.container)

                // 从菜单拖拽到内容区防止溢出
                if (block.value.style.left + block.value.style.width >= props.container.width) {
                    block.value.style.left = props.container.width - block.value.style.width
                }
                if (block.value.style.top + block.value.style.height >= props.container.height) {
                    block.value.style.top = props.container.height - block.value.style.height
                }

                if (block.value.alignCenter) {
                    // console.log('组件移动前位置', block.value)

                    if (offsetWidth && offsetHeight) {
                        block.value.style.top = block.value.style.top - offsetHeight / 2
                        block.value.style.left = block.value.style.left - offsetWidth / 2
                    }

                    // 让渲染后的结果才能去居中
                    block.value.alignCenter = false
                    // console.log('组件移动后位置', block.value)
                }
            }

            // 通过反射删除属性
            Reflect.deleteProperty(block.value, 'isFirst')
            // console.log('修改后组件', block.value)
        })

        return () => {
            // 通过block的key属性直接获取对应的组件
            const component = config.componentMap[block.value.key]
            // 获取render函数
            // console.log('传递给内容区域组件的数据', block.value)
            // console.log('传递给内容区域组件的预览状态', props.preview)

            const Rendercomponent = component.render({

                // 元素宽度、高度
                // size: { width: block.value.width, height: block.value.height },
                size: block.value.hasResize ? { width: block.value.width, height: block.value.height } : {},
                props: block.value.props,
                // 元素数据
                block: block.value,
                // 与当前组件联动的组建索引值
                component: block.value.props.linkage ? props.allBlocks[block.value.props.linkage] : '',
                allBlocks: props.allBlocks,
                container: props.container,
                preview: props.preview
            })

            const { width, height } = component.resize || {}

            // console.log('画布中所有元素数据',props.allBlocks)

            return <div class="editor-block" style={blockStyle.value} ref={blockRef}>
                {Rendercomponent}
                {/* 传递block的目的是为了修改当前block的宽高，component中存放了是修改高度还是宽度 */}
                {props.block.focus && (width || height) && <BlockResize block={props.block} component={component}>
                </BlockResize>}
            </div>
        }
    }
})