import { computed, createVNode, defineComponent, inject, onBeforeUnmount, onMounted, provide, reactive, ref, render } from "vue";

export const DropdownItem = defineComponent({
    props: {
        label: String,
        icon: String,
    },
    setup(props) {
        // 接收父组件传递的方法
        let hide = inject('hide')
        return () => {
            return <div class="dropdown-item" onClick={hide}>
                <i class={props.icon}></i>
                <span>{props.label}</span>
            </div>
        }
    }
})

let DropdownComponent = defineComponent({
    props: {
        option: { type: Object }
    },
    setup(props, context) {

        let state = reactive({
            option: props.option,
            isShow: false,
            top: 0,
            left: 0
        })

        context.expose({
            showDropdown(option) {
                state.option = option
                state.isShow = true
                // 获取选中元素位置
                let { top, left, height } = option.el.getBoundingClientRect()
                state['position'] = {
                    top: (top + height) + 'px',
                    left: left + 'px',
                }
            }
        })

        // 向子组件传递方法
        provide('hide', () => { state.isShow = false })

        let classes = computed(() => [
            'dropdown',
            {
                'dropdown-isShow': state.isShow
            }
        ])

        // 获取当前组件dom
        let el = ref(null)

        const onMousedownDocument = (e) => {
            // 事件的传播行为是先捕获再冒泡
            // 之前为了阻止事件传播，给block都增加了阻止事件传播
            // 如果点击的是dropdom内部，什么都不做
            if (!el.value.contains(e.target)) {
                state.isShow = false
            }
            // console.log('当前点击的dom元素', e.target)
        }

        onMounted(() => {
            document.body.addEventListener('mousedown', onMousedownDocument, true)
        })

        onBeforeUnmount(() => {
            document.body.removeEventListener('mousedown', onMousedownDocument)
        })

        return () => {
            return <div class={classes.value} style={state['position']} ref={el}>{state.option.content()}</div>
        }
    }
});

let vm;
export function $dropdown(option) {
    if (!vm) {
        // 手动挂载组件
        let el = document.createElement('div')

        // 将组件渲染成虚拟节点(对象形式传参)
        vm = createVNode(DropdownComponent, { option })

        //render通过patch 变成dom
        render(vm, el)

        document.body.appendChild(el)
    }

    // console.log('Dialog配置项',option)
    // console.log('虚拟dom',vm.component)

    // 将组件渲染到这个el元素上
    let { showDropdown } = vm.component.exposed
    showDropdown(option)
}