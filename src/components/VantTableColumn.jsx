import { ElButton, ElRadioButton, ElRadioGroup } from "element-plus";
import { computed, defineComponent, onMounted, reactive } from "vue";
import Upload from './Upload.vue'
import { events } from "../packages/event"

export default defineComponent({
    props: {
        modelValue: { type: Object },
        activeTab: { type: String },
        activeTabIndex: { type: Number },
        tabUrl:{ type: String },
        tabActiveUrl:{ type: String }
    },
    emits: ['update:modelValue', 'update:activeTab', 'update:activeTabIndex', 'update:tabUrl', 'update:tabActiveUrl'],
    setup(props, { emit }) {

        const state = reactive({
            // 可变段落数据
            data: [],
            activeTabName: null,
            url:null
        })

        // 当前组件的vantTab
        let data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                emit('update:modelValue', JSON.parse(JSON.stringify(newValue)))
            }
        })

        // 当前Radio选择内容
        let activeTabData = computed({
            get() {
                return props.activeTab
            },
            set(newValue) {
                emit('update:activeTab', newValue)
            }
        })

        // 当前Radio选择内容index
        let activeTabIndex = computed({
            get() {
                return props.activeTabIndex
            },
            set(newValue) {
                emit('update:activeTabIndex', newValue)
            }
        })

        // 当前Radio选择内容index
        let tabUrl = computed({
            get() {
                return props.tabUrl
            },
            set(newValue) {
                emit('update:tabUrl', newValue)
            }
        })

        // 当前Radio选择内容index
        let tabActiveUrl = computed({
            get() {
                return props.tabActiveUrl
            },
            set(newValue) {
                emit('update:tabActiveUrl', newValue)
            }
        })

        // 首次挂载组件时赋值
        onMounted(() => {
            state.data = data.value || []
            state.activeTabName = activeTabData.value ? activeTabData.value : null
            events.emit("getvantTab", state.data)
            // console.log('当前组件的vantTab', state.data)
        })

        const add = () => {
            state.data.push({})
            data.value = state.data
        }

        const remove = () => {
            state.data.pop()
            data.value = state.data
        }

        const confirm = () => {
            data.value = state.data
            events.emit('getVantTabData', state.data)
            // console.log('可变段落数据',state.data)
            // console.log('可变段落数据',data.value)
        }

        const handleChange = () => {
            activeTabData.value = state.activeTabName
            activeTabIndex.value = state.data.findIndex(item => item.text == state.activeTabName)
            events.emit('changeActiveVantTab', state.activeTabName)
            // console.log('当前组件的activeTabIndex', activeTabIndex.value)
            // console.log('当前组件的activeTabName', state.activeTabName)
            // console.log('当前组件的vantTab', state.data)
        }

        return () => {
            return <>
                {
                    state.data.map(item => <input v-model_lazy={item.text} />)
                }
                <ElRadioGroup v-model={state.activeTabName} style={{ width: "100%" }} onChange={handleChange}>
                    {
                        state.data.map(item => <ElRadioButton label={item.text} />)
                    }
                </ElRadioGroup>
                <Upload v-model={tabUrl.value}></Upload>
                <Upload v-model={tabActiveUrl.value}></Upload>
                <div>
                    <ElButton onClick={add}>添加</ElButton>
                    <ElButton onClick={remove}>删除</ElButton>
                    <ElButton onClick={confirm}>确认</ElButton>
                </div>
            </>
        }
    }
})