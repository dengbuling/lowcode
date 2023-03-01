import { ElButton, ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElRadio, ElSelect, ElTable, ElTableColumn, ElTabPane, ElTabs } from "element-plus";
import { defineComponent, watch, inject, reactive, computed, ref, onMounted } from "vue";
import TableEditor from './table-editor'
import VantTableColumn from "../components/VantTableColumn";
import Upload from '../components/Upload.vue'
import AddEvent from "../components/AddEvent";
import AddComponent from "../components/AddComponent";
import TimeButton from "../components/TimeButton";
import TabButton from "../components/TabButton";
import VariableText from "../components/variableText";
import { ElRadioGroup } from "element-plus/lib/components";
import { events } from "./event"

export default defineComponent({
    props: {
        block: { type: Object },
        data: { type: Object },
        preview: { type: Boolean },
        vantTab: { type: Object },
        updateBlock: { type: Function },
        updateContainer: { type: Function }
    },
    emits: ['update:modelValue'],
    setup(props, { emit, expose }) {

        // 获取data配置数据
        const config = inject('config')

        const state = reactive({
            editData: {}
        })

        let activeTab = ref(1)
        // let activeTab = ref("1")

        // activeName 改变时触发
        const handleTabChange = (pane) => {
            activeTab.value = (pane)
            if (!props.block) {
                state.editData = JSON.parse(JSON.stringify(props.data.container))
            }
            console.log('activeName', pane)
            // console.log('重置后元素数据', state.editData)
        }

        const refreshTab = () => {
            if (!props.block) {
                // 点击背景画布切换tab
                if (activeTab.value == 2 || activeTab.value == 3) {
                    activeTab.value = 1
                }
            } else {
                activeTab.value = 1
                // console.log('已选中block')
            }
            console.log('Tab刷新了')
            // console.log('activeTab.value', activeTab.value)
        }

        const changeActiveVantTab = (value) => {
            props.data.container.activeTabName = value
            // console.log('props.data.container', props.data.container)
            // console.log('value', value)
        }

        onMounted(() => {
            events.on("refreshTab", refreshTab)
            events.on('changeActiveVantTab', changeActiveVantTab)
        })

        // 重置
        let reset = () => {
            if (!props.block) {
                state.editData = JSON.parse(JSON.stringify(props.data.container))
            } else {
                state.editData = JSON.parse(JSON.stringify(props.block))
            }
            // debugger
            // console.log('reset函数当前选中元素', props.block)
            // console.log('重置后元素数据', state.editData)
        }

        // 应用
        const apply = () => {
            if (!props.block) {
                props.updateContainer({ ...props.data, container: state.editData })
            } else {
                props.updateBlock(state.editData, props.block)
            }
            // debugger
            // console.log('apply函数当前选中元素', props.block)
            // console.log('应用后元素数据', state.editData)
        }


        // 侦听选中的block
        // watch(() => props.modelValue, reset, { immediate: true })
        watch(() => props.block, reset, { immediate: true })

        return () => {

            let content = []
            let ElementEvent = []
            let ElementComponent = []
            // 通过block的key属性直接获取对应的组件
            let component = null
            let documentAttribute = []
            let ElementAttribute = []

            const rules = reactive({
                title: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 50, message: 'Length should be 3 to 5', trigger: 'blur' },
                ],
                document: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 50, message: 'Length should be 3 to 5', trigger: 'blur' },
                ],
                enableShare: [
                    {
                        required: true,
                        message: 'Please select activity resource',
                        trigger: 'change',
                    },
                ],
                desc: [
                    { required: true, message: 'Please input activity form', trigger: 'blur' },
                ],
            })


            if (!props.block) {

                let unWatchContainer = watch(state.editData, () => {
                    apply()
                    unWatchContainer()
                    console.log('移除画布侦听，画布属性修改后的值为', state.editData)
                })

                // 点击背景画布切换tab
                refreshTab()

                content.push(<>
                    <ElFormItem label='页面宽度'>
                        <ElInputNumber v-model={state.editData.width} controls-position="right"></ElInputNumber>
                    </ElFormItem>
                    <ElFormItem label='页面高度'>
                        <ElInputNumber v-model={state.editData.height} controls-position="right"></ElInputNumber>
                    </ElFormItem>
                    <ElFormItem label='背景颜色'>
                        <ElColorPicker v-model={state.editData.color}></ElColorPicker>
                    </ElFormItem>
                    {/* <ElFormItem label='透明度'>
                        <ElInputNumber v-model={state.editData.opacity} step={0.1} min={0} max={1} controls-position="right"></ElInputNumber>
                    </ElFormItem> */}
                </>)
                // console.log('没有选中页面元素', props.block)
                documentAttribute.push(<>
                    <ElForm model={state.editData}>
                        <ElFormItem label="页面标题" prop="title">
                            <input class="el-input" v-model_lazy={state.editData["title"]} />
                        </ElFormItem>
                        <ElFormItem label="项目标题" prop="document">
                            <input class="el-input" v-model_lazy={state.editData["document"]} />
                        </ElFormItem>
                        <ElFormItem label="是否允许分享" prop="enableShare">
                            <ElRadioGroup>
                                <ElRadio v-model={state.editData['enableShare']} name="分享" label={true}></ElRadio>
                                <ElRadio v-model={state.editData['enableShare']} name="不分享" label={false}></ElRadio>
                            </ElRadioGroup>
                            {(state.editData['enableShare'] == true) && <><ElFormItem label="分享标题">
                                <input class="el-input" v-model_lazy={state.editData["shareParamTitle"]} />
                            </ElFormItem>
                                <ElFormItem label="分享文字">
                                    <input class="el-input" v-model_lazy={state.editData["shareParamDesc"]} />
                                </ElFormItem>
                                <ElFormItem label="分享图片">
                                    <input class="el-input" v-model_lazy={state.editData["shareParamUrl"]} />
                                </ElFormItem>
                            </>
                            }
                        </ElFormItem>
                    </ElForm>
                </>)
            } else {

                let unWatchBlock = watch(state.editData, () => {
                    apply()
                    unWatchBlock()
                    console.log('block属性修改后的值为', props.block)
                    console.log('移除block侦听，block属性修改后的值为', state.editData)
                }, { deep: true })

                const getRandom = (min = 1000, max = 9999) => {
                    // console.log('block属性修改后的值为', props.block)
                    if (!props.block.id) {
                        const number = Math.floor(Math.random() * (max - min)) + min;
                        state.editData["id"] = `${state.editData["key"]}_${number}`
                    }
                }
                getRandom()

                // 通过block的key属性直接获取对应的组件
                component = config.componentMap[props.block.key]
                // console.log('配置文件中对应组件', component)

                if (component && component.props) {
                    // 遍历对象生成数组，并map解构数组
                    let item = Object.entries(component.props).map(([propName, propConfig]) => {
                        // console.log(propName, propConfig)
                        // console.log('正在编辑元素props的key', propName)
                        // console.log('正在编辑元素props的value', propConfig)
                        // console.log('正在编辑元素props的type', propConfig.type)
                        // {text:xxx,size:13px,color:#fff}
                        return <>
                            <ElFormItem label={propConfig.label}>
                                {{
                                    input: () => <textarea v-model_lazy={state.editData.props[propName]} style={{ width: "100%", height: "5rem" }}></textarea>,
                                    // input: () => <ElInput v-model={state.editData.props[propName]} type="textarea"></ElInput>,
                                    color: () => <ElColorPicker v-model={state.editData.props[propName]} show-alpha={true}></ElColorPicker>,
                                    FontSize: () => <ElInputNumber v-model={state.editData.props[propName]} controls-position="right"></ElInputNumber>,
                                    select: () => <ElSelect v-model={state.editData.props[propName]}>
                                        {propConfig.options.map(option => {
                                            return <ElOption label={option.label} value={option.value}></ElOption>
                                        })}
                                    </ElSelect>,
                                    // 用户在应用时可以保存下拉菜单选项
                                    table: () => <TableEditor propConfig={propConfig} v-model={state.editData.props[propName]}></TableEditor>,
                                    image: () => <Upload propConfig={propConfig} v-model={state.editData.props['url']}></Upload>,
                                    positionX: () => <ElInputNumber v-model={state.editData.style.left} controls-position="right"></ElInputNumber>,
                                    positionY: () => <ElInputNumber v-model={state.editData.style.top} controls-position="right"></ElInputNumber>,
                                    width: () => <ElInputNumber v-model={state.editData.style.width} controls-position="right"></ElInputNumber>,
                                    height: () => <ElInputNumber v-model={state.editData.style.height} controls-position="right"></ElInputNumber>,
                                    borderRadius: () => <ElInputNumber v-model={state.editData.props[propName]} min={0} controls-position="right"></ElInputNumber>,
                                    FontWeight: () => <ElInputNumber v-model={state.editData.props[propName]} step={100} min={0} max={900} controls-position="right"></ElInputNumber>,
                                    LetterSpace: () => <ElInputNumber v-model={state.editData.props[propName]} controls-position="right"></ElInputNumber>,
                                    SelectPosition: () =>
                                        <ElSelect v-model={state.editData.props[propName]}>
                                            {propConfig.options.map(option => {
                                                return <ElOption label={option.label} value={option.value}></ElOption>
                                            })}
                                        </ElSelect>,
                                    LineHeight: () => <ElInputNumber v-model={state.editData.props[propName]} controls-position="right"></ElInputNumber>,
                                    zindex: () => <ElInputNumber v-model={state.editData.props[propName]} controls-position="right"></ElInputNumber>,
                                    maxHeight: () => <ElInputNumber v-model={state.editData.props[propName]} controls-position="right"></ElInputNumber>,
                                    BackgroundColor: () => <ElColorPicker v-model={state.editData.props[propName]} show-alpha={true}></ElColorPicker>,
                                    time: () => <> <TimeButton v-model:start={state.editData.props.startTime}
                                        v-model:end={state.editData.props.endTime}
                                        v-model:type={state.editData.props["timeType"]}
                                        preview={props.preview}></TimeButton>
                                    </>,
                                    variableText: () => <VariableText v-model={state.editData.props[propName]}></VariableText>,
                                    vantTable: () => <VantTableColumn
                                        v-model={state.editData.props[propName]}
                                        v-model:activeTab={state.editData.props["activeTab"]}
                                        v-model:activeTabIndex={state.editData.props["activeTabIndex"]}
                                        v-model:tabUrl={state.editData.props["tabUrl"]}
                                        v-model:tabActiveUrl={state.editData.props["tabActiveUrl"]}>
                                        
                                    </VantTableColumn>,
                                    vantTab: () => <TabButton v-model={state.editData.props[propName]} vantTab={props.vantTab}></TabButton>,
                                    margin: () => <ElInputNumber v-model={state.editData.props[propName]} v-model:vantTab={state.editData.props["vantTab"]} controls-position="right"></ElInputNumber>,
                                }[propConfig.type]()}
                            </ElFormItem>
                        </>
                    })
                    content.push(item)
                }
                if (component && component.events) {
                    // 遍历对象生成数组，并map解构数组
                    let item = <AddEvent block={props.data.blocks} v-model={state.editData.events} currentBlock={state.editData}></AddEvent>
                    ElementEvent.push(item)
                    // console.log('已添加事件',ElementEvent)
                }
                if (component && component.components) {
                    // 遍历对象生成数组，并map解构数组
                    let item = <AddComponent block={props.data.blocks} v-model={state.editData.components} currentBlock={state.editData}></AddComponent>
                    ElementComponent.push(item)
                    // console.log('已添加组件联动',ElementComponent)
                }

                ElementAttribute.push(<>
                    <ElForm model={state.editData}>
                        <ElFormItem label="组件编号">
                            <span>{state.editData["id"]}</span>
                        </ElFormItem>
                        <ElFormItem label="组件类型">
                            <span>{state.editData["key"]}</span>
                        </ElFormItem>
                        <ElFormItem label="组件名称">
                            <input class="el-input" v-model_lazy={state.editData["name"]} />
                        </ElFormItem>
                    </ElForm>
                </>)
            }



            const ruleFormRef = ref(null)
            const submitForm = async () => {
                console.log('0o00o0o0i0o0o0o0o0o0o0')
                // console.log(ruleFormRef.value)
                // if (!formEl) return
                await ruleFormRef.value.validate((valid, fields) => {
                    if (valid) {
                        console.log('submit!')
                    } else {
                        console.log('error submit!', fields)
                    }
                })
            }

            const lllooo = () => {
                submitForm()
            }

            events.on('submitForm', submitForm)

            //   expose({submitForm })

            const dataForm = reactive({
                title: null,
                document: null,
                share: null,
                shareParamdesc: null,
                shareParamtitle: null,
                shareurl: null
            })



            return <>
                {/* 属性控制栏 */}
                <ElTabs onTab-change={handleTabChange} v-model={activeTab.value}>
                    {
                        <ElTabPane label={"页面属性"} name={0}>
                            {/* {
                                activeTab.value == 0 && <ElForm ref={ruleFormRef} model={state.editData}>
                                    <ElFormItem label="页面标题" prop="title">
                                        <input class="el-input" v-model_lazy={state.editData["title"]} />
                                    </ElFormItem>
                                    <ElFormItem label="项目标题" prop="document">
                                        <input class="el-input" v-model_lazy={state.editData["document"]} />
                                    </ElFormItem>
                                    <ElFormItem label="是否允许分享" prop="enableShare">
                                        <ElRadioGroup>
                                            <ElRadio v-model={state.editData['enableShare']} name="分享" label={true}></ElRadio>
                                            <ElRadio v-model={state.editData['enableShare']} name="不分享" label={false}></ElRadio>
                                        </ElRadioGroup>
                                        {(state.editData['enableShare'] == true) && <><ElFormItem label="分享标题">
                                            <input class="el-input" v-model_lazy={state.editData["shareParamTitle"]} />
                                        </ElFormItem>
                                            <ElFormItem label="分享文字">
                                                <input class="el-input" v-model_lazy={state.editData["shareParamDesc"]} />
                                            </ElFormItem>
                                            <ElFormItem label="分享图片">
                                                <input class="el-input" v-model_lazy={state.editData["shareParamUrl"]} />
                                            </ElFormItem>
                                        </>
                                        }
                                    </ElFormItem>
                                </ElForm>
                            } */}
                            {
                                !props.block && activeTab.value == 0 && documentAttribute
                            }
                            {
                                props.block && activeTab.value == 0 && ElementAttribute
                            }
                        </ElTabPane>
                    }
                    <ElTabPane label={"样式"} name={1}>
                        {content}
                    </ElTabPane>
                    {
                        (props.block && component.components) && <ElTabPane label={"组件联动"} name={2}>
                            {activeTab.value == 2 && ElementComponent}
                            {/* {activeTab.value == "2" && ElementComponent} */}
                        </ElTabPane>
                    }
                    {
                        (props.block && component.events) && <ElTabPane label={"点击事件"} name={3}>
                            {activeTab.value == 3 && ElementEvent}
                            {/* {activeTab.value == "3" && ElementEvent} */}
                        </ElTabPane>
                    }
                </ElTabs>
                {/* <ElButton type="primary" onClick={() => apply()}>应用</ElButton> */}
                {/* <ElButton onClick={reset}>重置</ElButton> */}
            </>
        }
    }
})