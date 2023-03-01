import { ElDatePicker, ElRadioButton, ElRadioGroup } from "element-plus";
import { computed, defineComponent } from "vue";

export default defineComponent({
    props: {
        start: { type: String },
        end: { type: String },
        type: { type: String },
        preview: { type: Boolean },
    },
    emits: ['update:start', 'update:end', 'update:type'],
    setup(props, { emit }) {

        let start = computed({
            get() {
                return props.start
            },
            set(newValue) {
                emit('update:start', newValue)
            }
        })

        let end = computed({
            get() {
                return props.end
            },
            set(newValue) {
                emit('update:end', newValue)
            }
        })

        let type = computed({
            get() {
                return props.type
            },
            set(newValue) {
                emit('update:type', newValue)
            }
        })

        return () => {
            return <>
                <ElRadioGroup v-model={type.value} size="small">
                    <ElRadioButton label="before"></ElRadioButton>
                    <ElRadioButton label="between"></ElRadioButton>
                    <ElRadioButton label="after"></ElRadioButton>
                    <ElRadioButton label="none"></ElRadioButton>
                </ElRadioGroup>
                {
                    (type.value == "before" || type.value == "between") && <ElDatePicker
                        v-model={start.value}
                        type="datetime"
                        placeholder="活动开始时间"
                        // range-separator="To"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                    ></ElDatePicker>
                }
                {
                    (type.value == "between" || type.value == "after") && <ElDatePicker
                        v-model={end.value}
                        type="datetime"
                        placeholder="活动结束时间"
                        // range-separator="To"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                    ></ElDatePicker>
                }
            </>
        }
    }
})