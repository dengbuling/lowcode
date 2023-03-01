
// 动态添加文本组件
import { ElButton } from "element-plus";
import { computed, defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
    props: {
        modelValue: { type: Object }
    },
    setup(props, { emit }) {

        let state = reactive({
            // 可变段落数据
            data: [],
        })

        let data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                emit('update:modelValue', JSON.parse(JSON.stringify(newValue)))
            }
        })

        // 首次挂载组件时赋值
        onMounted(() => {
            state.data = data.value || []
        })

        const add = () => {
            state.data.push({})
        }

        const remove = () => {
            state.data.pop()
        }

        const confirm = () => {
            data.value = state.data
            // console.log('可变段落数据',state.data)
            // console.log('可变段落数据',data.value)
        }

        return () => {
            return <>
                {
                    state.data.map((item) => {
                        return <textarea v-model_lazy={item.text} style={{
                            "width": "100%",
                            "height": "4rem",
                            "margin-bottom": "0.3rem"
                        }}></textarea>
                    })
                }
                <div>
                    <ElButton onClick={add}>添加</ElButton>
                    <ElButton onClick={remove}>删除</ElButton>
                    <ElButton onClick={confirm}>确认</ElButton>
                </div>
            </>
        }
    }
})