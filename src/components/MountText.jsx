import { ElDialog, ElInput, ElButton } from "element-plus";
import { createVNode, defineComponent, onMounted, onUnmounted, reactive, render } from "vue";

let DialogComponent = defineComponent({

    props: {
        option: { type: Object }
    },
    setup(props, { expose }) {

        onMounted(() => {
            console.log('Dialog配置项', props.option)
            console.log("创建Dialog")
        })

        onUnmounted(() => {
            console.log("卸载Dialog")
        })

        const state = reactive({
            option: props.option,
            isShow: false
        })

        // 向组件外面暴露方法
        expose({
            showDialog(option) {
                // 显示最新的内容
                state.option = option
                state.isShow = true
                console.log(state.option)
                console.log(state.option.content)
            }
        })

        const onCancel = () => {
            state.isShow = false
        }

        const onConfirm = () => {
            state.isShow = false
            state.option.onConfirm && state.option.onConfirm(state.option.content)
        }

        return () => {
            return <span style={{ 
                color: item.props.color, 
                fontSize: item.props.size+"px", 
                fontWeight: item.props.FontWeight ,
                top:item.style.top+"px",
                left:item.style.left+"px",
                height:item.style.height+"px",
                width:item.style.width+"px",
            }} ></span>
        }
    }
})
let vm;
export function $dialog(option) {
    if (!vm) {
        // 手动挂载组件
        let el = document.createElement('div')

        // 将组件渲染成虚拟节点(对象形式传参)
        vm = createVNode(DialogComponent, { option })

        //render通过patch 变成dom
        render(vm, el)

        document.body.appendChild(el)
    }

    // console.log('Dialog配置项',option)
    // console.log('虚拟dom',vm.component)

    // 将组件渲染到这个el元素上
    // let { showDialog } = vm.component.exposed
    // showDialog(option)
}
