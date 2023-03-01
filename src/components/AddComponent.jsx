import { Delete } from "@element-plus/icons-vue";
import { ElButton, ElIcon, ElNotification, ElOption, ElSelect, ElTable, ElTableColumn } from "element-plus";
import { defineComponent, reactive, computed, onMounted } from "vue";

export default defineComponent({
    props: {
        block: { type: Object },
        modelValue: { type: Object },
        currentBlock: { type: Object }
    },

    setup(props, { emit }) {

        let state = reactive({
            // 组件联动数据
            componentData: [],
        })

        let events = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                emit('update:modelValue', JSON.parse(JSON.stringify(newValue)))
            }
        })

        onMounted(() => {
            // 当前组件绑定的组件联动赋值
            state.componentData = events.value
            // console.log('当前组件绑定的组件联动', events.value)
        })

        // 添加组件联动
        let addComponent = () => {
            console.log('当前选中组件点击事件', props.currentBlock.events.length)
            if (props.currentBlock.events.length) {
                ElNotification({
                    title: 'Error',
                    message: "请先删除组件事件",
                    position: 'bottom-right',
                    type: 'error'
                })
                return
            }
            state.componentData.push({})
            events.value = state.componentData
        }

        // 确认添加组件联动
        let confirmComponent = () => {
            if (state.componentData.length == 0) {
                ElNotification({
                    message: "请添加组件联动~",
                    position: 'bottom-right',
                    type: 'error'
                })
                return
            }
            events.value = state.componentData
            // console.log('输入的组件联动数据', state.componentData)
            // console.log('当前选中组件从父组件传递过来的数据',props.currentBlock)
        }

        // 删除组件联动
        let deleteComponent = (index) => {
            state.componentData.splice(index, 1)
            events.value = state.componentData
            // console.log('删除行索引',index)
        }

        return () => {
            return <>
                <ElTable data={state.componentData} header-cell-style={{ background: '#b1b3b8', color: '#333333' }}>
                    <ElTableColumn prop={"operation"} label={"操作"} width="60">
                        {{
                            default: ({ $index }) =>
                                <>
                                    <ElIcon size={20} color="red" onClick={() => deleteComponent($index)}>
                                        <Delete />
                                    </ElIcon>
                                </>
                        }}
                    </ElTableColumn>
                    {/* <ElTableColumn prop={"event"} label={"事件"}>
                        {{
                            default: ({ row }) => <>
                                <ElSelect v-model={row['event']} class="add-component" placeholder="请选择">
                                    <ElOption label="联动组件" value="component"></ElOption>
                                </ElSelect>
                            </>
                        }}
                    </ElTableColumn> */}
                    <ElTableColumn prop={"component"} label={"联动组件"}>
                        {{
                            default: ({ row }) => <>
                                <ElSelect v-model={row['component']} class="add-row" placeholder="请选择">
                                    {
                                        props.block.map((item, index) => {
                                            // if (!item.focus) return <ElOption
                                            return <ElOption
                                                label={item.key}
                                                value={index}
                                                onMouseover={() => item.hover = true}
                                                onMouseout={() => item.hover = false}>
                                            </ElOption>
                                        })
                                    }
                                </ElSelect>
                            </>
                        }}
                    </ElTableColumn>
                    <ElTableColumn prop={"action"} label={"动作"}>
                        {{
                            default: ({ row }) => <>
                                <ElSelect v-model={row["action"]} class="add-component" placeholder="请选择">
                                    <ElOption label="显示" value="block"></ElOption>
                                    <ElOption label="隐藏" value="none"></ElOption>
                                </ElSelect>
                            </>
                        }}
                    </ElTableColumn>
                </ElTable>
                <ElButton type="primary" plain size="small" onClick={addComponent}>添加组件</ElButton>
                <ElButton type="primary" size="small" onClick={confirmComponent}>确认</ElButton>
            </>
        }
    }
})