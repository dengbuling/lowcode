import { ElButton, ElDrawer, ElNotification, ElTabPane, ElTabs } from "element-plus";
import { createVNode, defineComponent, onMounted, onUnmounted, reactive, ref, render } from "vue";
import Codemirror from '../components/Codemirror.vue'

let DrawerComponent = defineComponent({

    props: {
        option: { type: Object }
    },
    setup(props, { expose }) {

        onMounted(() => {
            // console.log('Drawer配置项', props.option)
            console.log("创建Drawer")
        })

        onUnmounted(() => {
            console.log("卸载Drawer")
        })

        const state = reactive({
            option: props.option,
            isShow: false,
            tabPaneName: null
        })

        // 向组件外面暴露方法
        expose({
            showDrawer(option) {
                // 显示最新的内容
                state.option = option
                state.isShow = true
                // console.log('Drawer配置项', state.option)
                // console.log('Drawer配置项的内容', state.option.content)
            }
        })

        const onCancel = () => {
            state.isShow = false
        }

        const onCopy = () => {
            let content
            if (state.tabPaneName == '0' || state.tabPaneName == undefined) {
                content = JSON.stringify(state.option.content, null, "\t")
            } else if (state.tabPaneName == '1') {
                content = localStorage.getItem('vue')
            }
            var input = document.createElement("input"); // 创建input对象
            input.value = content; // 设置复制内容
            document.body.appendChild(input); // 添加临时实例
            input.select(); // 选择实例内容
            document.execCommand("Copy"); // 执行复制
            document.body.removeChild(input); // 删除临时实例
            ElNotification({
                message: "复制成功",
                position: "bottom-right",
                type: "success",
            });
        };

        const onTabChange = (TabPaneName) => {
            state.tabPaneName = TabPaneName
        }

        return () => {
            return <ElDrawer v-model={state.isShow} size={'50%'} show-close={false} destroy-on-close={true}>{{
                default: () => <>
                    <ElTabs onTabChange={onTabChange}>
                        <ElTabPane label="JSON">
                            <Codemirror
                                code={state.option.content}
                                mode='application/json'
                            ></Codemirror>
                        </ElTabPane>
                        <ElTabPane label="vue">
                            <Codemirror
                                mode='text/javascript'
                            ></Codemirror>
                        </ElTabPane>
                    </ElTabs>
                </>,
                footer: () => <div style={{ "text-align": "left" }}>
                    {/* <ElButton type="primary" onClick={() => onConfirm()}>确定</ElButton> */}
                    <ElButton onClick={() => onCancel()}>关闭</ElButton>
                    <ElButton onClick={() => onCopy()}>复制</ElButton>
                </div>
            }}</ElDrawer>
        }
    }
})
let vm;
export function $drawer(option) {
    if (!vm) {
        // 手动挂载组件
        let el = document.createElement('div')

        // 将组件渲染成虚拟节点(对象形式传参)
        vm = createVNode(DrawerComponent, { option })

        //render通过patch 变成dom
        render(vm, el)

        document.body.appendChild(el)
    }

    // console.log('Dialog配置项',option)
    // console.log('虚拟dom',vm.component)

    // 将组件渲染到这个el元素上
    let { showDrawer } = vm.component.exposed
    showDrawer(option)
}
