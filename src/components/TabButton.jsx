import { ElRadioButton, ElRadioGroup } from "element-plus";
import { computed, defineComponent, onMounted, onUnmounted, reactive } from "vue";

export default defineComponent({
    props: {
        modelValue: { type: String },
        vantTab: { type: Object }
    },
    emits: ['update:modelValue', 'update:vantTab'],
    setup(props, { emit }) {

        let data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                emit('update:modelValue', newValue)
            }
        })

        let vantTab = computed({
            get() {
                return props.vantTab
            },
            set(newValue) {
                emit('update:modelValue', newValue)
            }
        })

        const state = reactive({
            vantTabs: null
        })

        onMounted(() => {
            state.vantTabs = vantTab.value ? vantTab.value.concat([{ text: 'none' }]) : [{ text: 'none' }]
            // console.log('vantTab.value', vantTab.value)
        })

        return () => {
            return <>
                <ElRadioGroup v-model={data.value} size="small">
                    {
                        state.vantTabs && state.vantTabs.map(item => <ElRadioButton label={item.text}></ElRadioButton>)
                    }
                </ElRadioGroup>
            </>
        }
    }
})