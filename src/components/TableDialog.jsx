import { ElDialog, ElButton, ElTable, ElTableColumn, ElInput } from "element-plus";
import { createVNode, defineComponent, reactive, render } from "vue";

// 添加下拉选项弹窗
let TableComponent = defineComponent({

    props: {
        options: { type: Object }
    },
    setup(props, { expose }) {

        let state = reactive({
            option: props.options,
            isShow: false,
            // 编辑的数据
            editData: []
        })

        expose({
            show(option) {
                // 把用户的配置缓存起来
                state.option = option
                // 更改显示状态
                state.isShow = true
                // 通过渲染的数据默认展现
                state.editData = JSON.parse(JSON.stringify(option.data))
            }
        })

        const add = () => {
            state.editData.push({})
        }

        const onCancel = () => {
            state.isShow = false
        }

        const onConfirm = () => {
            // debugger
            state.option.onConfirm(state.editData)
            state.isShow = false
        }

        return () => {
            return <ElDialog v-model={state.isShow}>
                {/* 插槽 */}
                {{
                    default: () => (
                        <div>
                            <ElButton onClick={add}>添加</ElButton>
                            <ElButton>重置</ElButton>
                            <ElTable data={state.editData}>
                                <ElTableColumn type="index"></ElTableColumn>
                                {props.options.config.table.options.map((item, index) => {
                                    return <ElTableColumn label={item.label}>
                                        {{
                                            default: ({ row }) => <ElInput v-model={row[item.field]}></ElInput>
                                        }}
                                    </ElTableColumn>

                                })}
                                <ElTableColumn label="操作">
                                    <ElButton type="danger">删除</ElButton>
                                </ElTableColumn>
                            </ElTable>
                        </div>),
                    footer: () =>
                        <>
                            <ElButton onClick={onCancel}>取消</ElButton>
                            <ElButton onClick={onConfirm}>确定</ElButton>
                        </>
                }}
            </ElDialog>
        }
    }
})

let vm
export function $tableDialog(options) {
    if (!vm) {
        let el = document.createElement('div')
        vm = createVNode(TableComponent, { options })
        render(vm, el)
        document.body.appendChild(el)
    }
    let { show } = vm.component.exposed
    show(options)
}