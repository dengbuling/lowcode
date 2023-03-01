import { defineComponent, computed, inject, ref, watch, reactive, render, provide } from "vue";
import { ElButton, ElCard, ElScrollbar, ElTabPane, ElTabs } from "element-plus";
import { ElNotification } from "element-plus/lib/components";
import { Coin, Files, Stopwatch } from '@element-plus/icons-vue'
import { useMenuDragger } from './useMenuDragger'
import { useFocus } from "./useFocus";
import { useBlockDrager } from "./useBlockDrager";
import { useCommand } from "./useCommand";
import { handleTabs } from '../components/handleTabs'
import { $dialog } from '../components/Dialog'
import { $dropdown, DropdownItem } from '../components/Dropdown'
import EditorBlock from './editor-block.jsx'
import EditorOperator from './editor-operator'
import MenuTab from '../components/MenuTab.vue'
import { saveAsZip } from '../utils/fileDownload'
import { $drawer } from '../components/Drawer'
import { events } from "./event"

import './editor.scss'
import '../css/app.css'
import '../css/editor-container.scss'
import '../css/editor-block.scss'
import '../css/editor-left.css'
import './NavMenu.scss'

import { vueTemplate } from '../components/vueTemplate.js'
import { getHtml } from '../components/htmlTemplate.js'
import { getJS } from '../components/jsTemplate'


export default defineComponent({
    props: {
        modelValue: { type: Object }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {

        const data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                // console.log('data更新后的数据', newValue)
                // 深拷贝更新父组件的数据
                emit('update:modelValue', JSON.parse(JSON.stringify(newValue)))
            }
        })
        // console.log('data最新数据',data.value)

        // 页面预览是内容不能再操作了，可以点击、输入操作
        const previewRef = ref(false)

        const editorRef = ref(true)

        // 内容区画布大小设置
        const containerStyle = computed(() => ({
            width: props.modelValue.container.width + 'px',
            height: props.modelValue.container.height + 'px',
            "background-color": props.modelValue.container.color,
            opacity: props.modelValue.container.opacity
        }))
        // console.log('内容区画布大小',containerStyle.value)

        // 整个画布
        const containerCanvas = ref(null)

        // 获取内容区元素
        const containerRef = ref(null)

        // v-model绑定的正在编辑的内容区TabPane.name
        const editableTabsValue = ref(0)

        // TabPane页面循环列表
        const editableTabs = ref([{ title: 'index 1', name: 0 }])

        // 当前选中的TabPane页面
        let targetNameActive = ref(0)


        const vantTabData = reactive({
            data: null
        })
        const getVantTabData = (value) => {
            console.log('value', value)
            vantTabData.data = value
        }
        events.on('getVantTabData', getVantTabData)

        // localStorage中保存的block数据
        const localStorageData = reactive({
            blockData: JSON.parse(localStorage.getItem('blockData2'))
        })

        // 实现Tab页编辑
        const { handleTabsEdit, handleTabChange } = handleTabs(editableTabs, editableTabsValue, targetNameActive)

        // 获取data配置数据
        const config = inject('config')
        // console.log('data配置数据', config)

        // 实现菜单的拖拽功能
        const { dragstart, dragend } = useMenuDragger(data, containerRef, targetNameActive)
        // const { dragstart, dragend } = useMenuDragger(data, containerCanvas, targetNameActive)

        // 实现并获取焦点
        let { clearBlockFocus, blockMousedown, focusData, lastSelectBlock } = useFocus(props, previewRef, (e) => mousedown(e))

        // 实现内容区组件拖拽
        let { mousedown, markLine } = useBlockDrager(focusData, lastSelectBlock, data)

        // 菜单按钮命令
        const { commands } = useCommand(data, focusData)

        // 删除历史记录
        const handleDeleteHistory = (index, self) => {
            self.splice(index, 1)
            localStorage.setItem('blockData2', JSON.stringify(self))
            ElNotification({
                title: 'success',
                message: "历史记录删除成功",
                position: 'bottom-right',
                type: 'success'
            })
        }

        // 获取历史记录更新页面
        const handleUpdateHistory = (block) => {
            data.value = block.data
            editableTabs.value = block.data.container.tab
            ElNotification({
                title: 'success',
                message: "页面更新成功",
                position: 'bottom-right',
                type: 'success'
            })
        }

        // 菜单按钮
        const buttons = [
            { label: '撤销', icon: 'icon-bianji', handler: () => { commands.undo() } },
            { label: '重做', icon: 'icon-faxian', handler: () => { commands.redo() } },
            {
                label: '导出', icon: 'icon-faxian', handler: () => {
                    $dialog({
                        title: "导出",
                        content: JSON.stringify(data.value)
                    })
                }
            },
            {
                label: '导入', icon: 'icon-faxian', handler: () => {
                    $dialog({
                        title: "导入",
                        content: undefined,
                        footer: true,
                        onConfirm(text) {
                            // console.log('导入的JSON数据', text)
                            commands.updateContainer(JSON.parse(text))
                        }
                    })
                }
            },
            { label: '置顶', icon: 'icon-bianji', handler: () => { commands.placeTop() } },
            { label: '置底', icon: 'icon-bianji', handler: () => { commands.placeBottom() } },
            { label: '删除', icon: 'icon-bianji', handler: () => { commands.delete() } },
            {
                label: () => previewRef.value ? '编辑' : '预览',
                icon: () => previewRef.value ? 'icon-bianji' : 'icon-faxian',
                handler: () => {
                    previewRef.value = !previewRef.value
                    clearBlockFocus()
                }
            },
            {
                label: '关闭', icon: 'icon-bianji', handler: () => {
                    editorRef.value = false
                    clearBlockFocus()
                }
            },
            // { label: '保存', icon: 'icon-bianji', handler: () => { localStorage.setItem('blockData', JSON.stringify(data.value)) } },
            {
                label: '保存', icon: 'icon-bianji', handler: () => {
                    let blockData = JSON.parse(localStorage.getItem('blockData2'))
                    if (blockData) {
                        // 存入内容区域tab数量
                        data.value.container.tab = editableTabs.value
                        blockData.push({
                            date: (new Date()).toLocaleString(),
                            data: data.value,
                            name: data.value.container.document || "index"
                        })
                        blockData.sort((a, b) => b.date.localeCompare(a.date))
                        localStorage.setItem('blockData2', JSON.stringify(blockData))
                        localStorageData.blockData = JSON.parse(localStorage.getItem('blockData2'))
                        console.log('降序排序历史记录', localStorageData.blockData)
                    } else {
                        localStorage.setItem('blockData2', JSON.stringify([]))
                    }
                    ElNotification({
                        title: 'success',
                        message: "保存成功",
                        position: 'bottom-right',
                        type: 'success'
                    })
                }
            },
            // {
            //     label: '获取', icon: 'icon-bianji', handler: async () => {
            //         await (data.value = JSON.parse(localStorage.getItem('blockData')))
            //         // console.log('从本地缓存中获取数据', data.value)
            //     }
            // },
            {
                label: '一键复制', icon: 'icon-bianji', handler: () => {
                    try {
                        let lastSelectBlockCopy = JSON.parse(JSON.stringify(lastSelectBlock.value))
                        data.value.blocks.push({
                            ...lastSelectBlockCopy,
                            focus: false,
                            zIndex: lastSelectBlockCopy.zIndex += 1
                        })
                        ElNotification({
                            title: 'success',
                            message: "复制成功",
                            position: 'bottom-right',
                            type: 'success'
                        })
                    } catch (error) {
                        ElNotification({
                            title: 'Error',
                            message: '请选择组件',
                            position: 'bottom-right',
                            type: 'error'
                        })
                    }
                }
            },
            {
                label: '查看代码', icon: 'icon-bianji', handler: () => {
                    // console.log(data.value)
                    // console.log(config)
                    localStorage.setItem('vue', vueTemplate)
                    $drawer({
                        title: '',
                        content: data.value,
                        jscontent: (vueTemplate)
                    })
                    // events.emit('submitForm')
                }
            },
            {
                label: '生成代码', icon: 'icon-bianji', handler: () => {
                    // console.log(data.value)
                    let htmlTemplate = getHtml(data.value.container.document, data.value.container.color)
                    // console.log('html模板',htmlTemplate)
                    let jsTemplate = getJS(data.value.container.document)
                    // console.log('js模板',jsTemplate)
                    saveAsZip(data.value, vueTemplate, htmlTemplate, jsTemplate)
                }
            }
        ]

        // 右键元素弹出菜单
        const onContextMenuBlock = (e, block) => {
            // 阻止默认事件
            e.preventDefault()
            $dropdown({
                el: e.target,
                content: () => {
                    return <>
                        <DropdownItem label='删除' icon='icon-bianji' onClick={() => { commands.delete() }}></DropdownItem>
                        <DropdownItem label='置顶' icon='icon-bianji' onClick={() => { commands.placeTop() }}></DropdownItem>
                        <DropdownItem label='置底' icon='icon-bianji' onClick={() => { commands.placeBottom() }}></DropdownItem>
                        <DropdownItem label='查看' icon='icon-bianji' onClick={() => {
                            $dialog({
                                title: "查看",
                                content: JSON.stringify(block)
                            })
                        }}></DropdownItem>
                        <DropdownItem label='导入' icon='icon-bianji' onClick={() => {
                            $dialog({
                                title: "导入",
                                content: undefined,
                                footer: true,
                                onConfirm(text) {
                                    // console.log('导入的JSON数据', text)
                                    commands.updateBlock(JSON.parse(text), block)
                                }
                            })
                        }}></DropdownItem>
                    </ >
                }
            })
        }

        return () => {
            return !editorRef.value ?
                <>
                    {/* 关闭预览、编辑 */}
                    <div class="editor-container-canvas__content" style={[containerStyle.value, 'margin:0']}>
                        {/* <div class="editor-container-canvas__content" style={containerStyle.value} style="margin:0"> */}
                        {props.modelValue.blocks.map((block) =>
                            // e为当前事件源
                            <EditorBlock
                                class='editor-block-preview'
                                v-model={block}>
                            </EditorBlock>)}
                    </div>
                    <div onClick={() => { editorRef.value = true }}>返回</div>
                </> :
                <>
                    <div class="editor-app">
                        {/* 页面顶部菜单 */}
                        <ElCard class="nav-menu" shadow="never" style={{ 'height': '52px' }}>
                            {buttons.map((button) => {
                                const label = typeof button.label == 'function' ? button.label() : button.label
                                return <div class="nav-menu-item" onClick={button.handler}>
                                    <ElButton>{label}</ElButton>
                                </div>
                            })}
                        </ElCard>
                        {/* 菜单栏 */}
                        {/* <div class="editor-top">
                            {buttons.map((button) => {
                                const label = typeof button.label == 'function' ? button.label() : button.label
                                const icon = typeof button.icon == 'function' ? button.icon() : button.icon
                                return <div class="editor-top-button" onClick={button.handler}>
                                    <ElButton>{label}</ElButton>
                                </div>
                            })}
                        </div> */}
                        <div class="editor">
                            {/* 左侧组件拖拽 */}
                            <div class="editor-left">
                                <ElTabs tab-position={"left"}>
                                    <ElTabPane v-slots={{ label: () => <MenuTab v-slots={{ icon: () => <Coin /> }} title="组件"></MenuTab> }}>
                                        <ElCard shadow="never">
                                            {/* 根据注册列表渲染对应内容，实现H5的拖拖拽 */}
                                            {config.componentList.map((component) => (
                                                <div draggable onDragstart={e => dragstart(e, component)} onDragend={dragend}>
                                                    <div>{component.preview()}</div>
                                                </div>
                                            ))}
                                            {/* 根据注册列表渲染对应内容，实现H5的拖拖拽 */}
                                            {/* {config.componentList.map((component) => (
                                                <div class="editor-left-item" draggable onDragstart={e => dragstart(e, component)} onDragend={dragend}>
                                                    <div>{component.preview()}</div>
                                                </div>
                                            ))} */}
                                        </ElCard>
                                    </ElTabPane>
                                    <ElTabPane v-slots={{ label: () => <MenuTab v-slots={{ icon: () => <Files /> }} title="已选组件"></MenuTab> }}>
                                        <ElCard shadow="never">
                                            <div>
                                                {
                                                    props.modelValue.blocks.map((block, index) => {
                                                        return <div
                                                            onMousedown={e => blockMousedown(e, block, index)}
                                                            onMouseover={() => block.hover = true}
                                                            onMouseout={() => block.hover = false}>{block.key}
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </ElCard>
                                    </ElTabPane>
                                    <ElTabPane v-slots={{ label: () => <MenuTab v-slots={{ icon: () => <Stopwatch /> }} title="历史记录"></MenuTab> }}>
                                        <ElScrollbar>
                                            {
                                                localStorageData.blockData && localStorageData.blockData.map((block, index, self) => {
                                                    return <>
                                                        <ElCard class="editor-left-card" shadow="never">
                                                            <div>名称：{block.name}</div>
                                                            <div>时间：{block.date}</div>
                                                            <div>
                                                                <ElButton onClick={() => handleDeleteHistory(index, self)}>删除</ElButton>
                                                                <ElButton onClick={() => handleUpdateHistory(block)}>获取</ElButton>
                                                            </div>
                                                        </ElCard>
                                                    </>
                                                })
                                            }
                                        </ElScrollbar>
                                    </ElTabPane>
                                </ElTabs>
                            </div>
                            {/* 中间内容区 */}
                            <div class="editor-container">
                                <div class="editor-container-canvas" onMousedown={clearBlockFocus} ref={containerCanvas}>
                                    <ElScrollbar always={true}>
                                        {/* 产生滚动条 */}
                                        <ElTabs class="editor-container-canvas-tab" v-model={editableTabsValue.value} type="card" editable onTab-change={handleTabChange} onEdit={handleTabsEdit}>
                                            {
                                                editableTabs.value.map((item) => {
                                                    return <ElTabPane name={item.name} label={item.title}>
                                                        {
                                                            (item.name == targetNameActive.value) && <div class="editor-container-canvas__content" style={containerStyle.value} ref={containerRef} onMousedown={clearBlockFocus}>
                                                                {props.modelValue.blocks.map((block, index) => {
                                                                    // 判断页面标识和当前页一致时挂载组件
                                                                    if (block.activeTab == targetNameActive.value) {
                                                                        return <EditorBlock
                                                                            class={[block.focus ? 'editor-block-focus' : '', previewRef.value ? 'editor-block-preview' : '', block.hover ? 'editor-block-hover' : '']}
                                                                            block={block}
                                                                            allBlocks={props.modelValue.blocks}
                                                                            container={props.modelValue.container}
                                                                            preview={previewRef.value}
                                                                            onMousedown={e => blockMousedown(e, block, index)}
                                                                            onContextmenu={(e) => onContextMenuBlock(e, block)}>
                                                                        </EditorBlock>
                                                                    }
                                                                })
                                                                }
                                                                {/* 辅助线 */}
                                                                {markLine.x !== null && <div class="editor-container-linex" style={{ left: markLine.x + "px" }}></div>}
                                                                {markLine.y !== null && <div class="editor-container-liney" style={{ top: markLine.y + "px" }}></div>}
                                                            </div>
                                                        }
                                                    </ElTabPane>
                                                })
                                            }
                                        </ElTabs>
                                    </ElScrollbar>
                                </div>
                            </div>
                            {/* 属性控制栏 */}
                            <div class="editor-right">
                                <ElScrollbar class="editor-right-card" always={true}>
                                    <EditorOperator
                                        // ref="operatorRef"
                                        block={lastSelectBlock.value}
                                        data={data.value}
                                        vantTab={vantTabData.data}
                                        preview={previewRef.value}
                                        updateBlock={commands.updateBlock}
                                        updateContainer={commands.updateContainer}
                                    ></EditorOperator>
                                </ElScrollbar>
                            </div>
                        </div>
                    </div>
                </>
        }
    }
})