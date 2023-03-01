import { Delete } from "@element-plus/icons-vue";
import { ElButton, ElIcon, ElInput, ElNotification, ElOption, ElSelect, ElTable, ElTableColumn } from "element-plus";
import { defineComponent, reactive, computed, onMounted } from "vue";

export default defineComponent({
    props: {
        block: { type: Object },
        modelValue: { type: Object },
        currentBlock: { type: Object }
    },

    setup(props, { emit }) {

        let state = reactive({
            // 组件事件数据
            eventData: []
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
            // 当前组件绑定的组件事件赋值
            // state.eventData.push(JSON.parse(JSON.stringify(events.value)))
            // state.eventData.push(events.value)
            state.eventData = events.value
            // console.log('当前组件绑定的事件', events.value)
        })

        // 添加组件事件，只能添加1个事件
        let addEvent = () => {
            // console.log('当前选中组件数据', props.currentBlock)
            // console.log('当前选中组件关联的联动个数', props.currentBlock.components.length)
            if (props.currentBlock.components.length) {
                ElNotification({
                    message: "请先删除组件联动",
                    position: 'bottom-right',
                    type: 'error'
                })
                return
            } else if (state.eventData.length == 1) {
                ElNotification({
                    message: "只能添加1个组件事件",
                    position: 'bottom-right',
                    type: 'error'
                })
                return
            }
            state.eventData.push({})
            events.value = state.eventData
            // console.log('点击添加按钮，添加的组件事件', events.value)
        }

        // 确认添加组件事件
        let confirmEvent = () => {
            if (state.eventData.length == 0) {
                ElNotification({
                    message: "请添加按钮事件~",
                    position: 'bottom-right',
                    type: 'error'
                })
                return
            }
            events.value = state.eventData
            // console.log('点击确认按钮，添加的组件事件', events.value)
            // console.log('当前选中组件从父组件传递过来的数据', props.currentBlock)
        }

        // 删除组件事件
        let deleteEvent = (index) => {
            state.eventData.splice(index, 1)
            events.value = state.eventData
            // console.log('删除行索引',index)
        }

        return () => {
            return <>
                <ElTable data={state.eventData} header-cell-style={{ background: '#b1b3b8', color: '#333333' }}>
                    <ElTableColumn prop={"operation"} label={"操作"} width="60">
                        {{
                            default: ({ $index }) =>
                                <>
                                    <ElIcon size={20} color="red" onClick={() => deleteEvent($index)} >
                                        <Delete />
                                    </ElIcon>
                                </>
                        }}
                    </ElTableColumn>
                    <ElTableColumn prop={"event"} label={"点击事件"}>
                        {{
                            default: ({ row }) => <>
                                <ElSelect v-model={row['event']} class="add-row">
                                    <ElOption label="跳转" value="url"></ElOption>
                                    <ElOption label="弹窗" value="alert"></ElOption>
                                </ElSelect>
                            </>
                        }}
                    </ElTableColumn>
                    <ElTableColumn prop={"action"} label={"动作"}>
                        {{
                            default: ({ row }) => <ElInput v-model={row['action']}></ElInput>
                        }}
                    </ElTableColumn>
                </ElTable>
                <ElButton type="primary" plain size="small" onClick={addEvent}>添加事件</ElButton>
                <ElButton type="primary" size="small" onClick={confirmEvent}>确认</ElButton>
            </>
        }
    }
})