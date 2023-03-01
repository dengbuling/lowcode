import { ElButton, ElTag } from "element-plus"
import { computed, defineComponent } from "vue"
import { $tableDialog } from '../components/TableDialog.jsx'

// 下拉菜单编辑区
export default defineComponent({
    props: {
        propConfig: { type: Object },
        modelValue: { type: Array }
    },
    emits: ['update:modelValue'],
    setup(props, context) {

        // console.log('父组件传递的元素配置项', props.propConfig)
        // console.log('props.modelValue', props.modelValue)

        const data = computed({
            get() {
                return props.modelValue || []
            },
            set(newValue) {
                // console.log('开始更新，更新数据类型',Object.prototype.toString.call(JSON.parse(JSON.stringify(newValue))))
                context.emit('update:modelValue', JSON.parse(JSON.stringify(newValue)))
            }
        })

        // 每次点击添加会把新属性给子组件选项覆盖了
        const add = () => {
            $tableDialog({
                config: props.propConfig,
                data: data.value,
                // 点击确认的时候将数据更新
                onConfirm(newValue) {
                    data.value = newValue
                }
            })
        }

        return () => {
            return <div>
                {/* 此下拉框没有任何数据时，直接显示按钮 */}
                {(!data.value || data.value.length == 0) && <ElButton onClick={add}>添加</ElButton>}
                {(data.value || []).map(item => <ElTag onClick={add}>{item[props.propConfig.table.key]}</ElTag>)}
            </div>
        }
    }
})