// 列表区可以显示所有的物料
// key对应的组件映射关系
import { ElButton, ElImage, ElInput, ElOption, ElSelect } from 'element-plus'
import { EditPen, Picture, PictureFilled, Document, SwitchButton, Grid, Tickets, List } from '@element-plus/icons-vue'
// import { Button } from 'vant';
import { Tab, Tabs } from 'vant';
import Preview from '../components/Preview.vue'
import { reactive } from 'vue';

function createEditorConfig() {
    const componentList = []
    const componentMap = {}

    return {
        componentList,
        componentMap,
        register: (component) => {
            componentList.push(component)
            componentMap[component.key] = component
        }
    }
}
export let registerConfig = createEditorConfig()

// X轴位置
const createPositionXStyle = (label) => ({ type: 'positionX', label })
// Y轴位置
const createPositionYStyle = (label) => ({ type: 'positionY', label })
// 宽度
const createWidthStyle = (label) => ({ type: 'width', label })
// 高度
const createHeightStyle = (label) => ({ type: 'height', label })
// 颜色
const createColorProp = (label) => ({ type: 'color', label })
// 背景颜色
const createBackgroundColorProp = (label) => ({ type: 'BackgroundColor', label })
// 边框
const createBorderRadiusProp = (label) => ({ type: 'borderRadius', label })
// 层级
const createZindexProp = (label) => ({ type: 'zindex', label })
// 最大高度
const createMaxHeightProp = (label) => ({ type: 'maxHeight', label })


// 边距
const createMarginProp = (label) => ({ type: 'margin', label })
// 可变高度文本
const createVariableTextProp = (label) => ({ type: 'variableText', label })
// 文字内容
const createInputProp = (label) => ({ type: 'input', label })
// 字体大小
const createFontSizeProp = (label) => ({ type: 'FontSize', label })
// 字体宽度
const createFontWeightProp = (label) => ({ type: 'FontWeight', label })
// 字体空隙
const createLetterSpaceProp = (label) => ({ type: 'LetterSpace', label })
// 字体行高
const createLineHeightProp = (label) => ({ type: 'LineHeight', label })
// 选择字体位置
const createSelectPositionProp = (label, options) => ({ type: 'SelectPosition', label, options })


// 上传图片
const createImageProp = (label) => ({ type: 'image', label })
// 时间范围
const createTimeProp = (label) => ({ type: 'time', label })
// 时间范围
const createVantTableProp = (label) => ({ type: 'vantTable', label })
// 时间范围
const createVantTabProp = (label) => ({ type: 'vantTab', label })


// 创建表格
const createTableProp = (label, table) => ({ type: 'table', label, table })
const createSelectProp = (label, options) => ({ type: 'select', label, options })


registerConfig.register({
    label: '文本',
    key: 'text',
    preview: () => <Preview v-slots={{ icon: () => <Document /> }} title="文本"></Preview>,
    render: ({ block, allBlocks, container }) => {
        if (block.props.vantTab == container.activeTabName || block.props.vantTab == 'none') {
            return <span
                style={{
                    color: block.props.color,
                    fontSize: block.props.size + "px",
                    fontWeight: block.props.FontWeight,
                    "text-decoration": "underline"
                }}
                onClick={() => {
                    if (block.events.length && !block.components.length) {
                        let aBlock = block.events[0]
                        if (aBlock["event"] == 'url') {
                            window.location.href = aBlock["action"]
                        } else if (aBlock["event"] == 'alert') {
                            alert(aBlock["action"])
                        }
                    } else if (block.components.length && !block.events.length) {
                        block.components.forEach((item) => {
                            allBlocks[item.component].style.display = item["action"]
                        })
                    }
                }}>{block.props.text}</span>
        }
    }
    ,
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('字体颜色'),
        positionX: createPositionXStyle('X轴坐标'),
        positionY: createPositionYStyle('Y轴坐标'),
        size: createFontSizeProp('字体大小'),
        FontWeight: createFontWeightProp('字体宽度'),
        vantTab: createVantTabProp('tab')
    },
    events: [],
    components: []
})

registerConfig.register({
    label: '按钮',
    key: 'button',
    // 配置元素可以调整大小
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <SwitchButton /> }} title="按钮"></Preview>,
    render: ({ props, block }) => <ElButton style={{
        height: block.style.height + "px",
        width: block.style.width + "px",
        top: block.style.top + "px",
        left: block.style.left + "px",
        fontSize: block.props.size + "px",
        display: block.style.display || "block"
    }} type={props.type}>{props.text}</ElButton>,
    props: {
        text: createInputProp('按钮内容'),
        positionX: createPositionXStyle('X轴坐标'),
        positionY: createPositionYStyle('Y轴坐标'),
        width: createWidthStyle('宽度'),
        height: createHeightStyle('高度'),
        size: createFontSizeProp('字体大小'),
        type: createSelectProp('按钮类型', [
            { label: '基础', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
            { label: '文本', value: 'text' }
        ]),
        borderRadius: createBorderRadiusProp('按钮圆角'),
    }
})

registerConfig.register({
    label: '输入框',
    // 配置元素可以调整大小
    resize: {
        width: true
    },
    preview: () => <Preview v-slots={{ icon: () => <EditPen /> }} title="输入框"></Preview>,
    render: ({ props, block }) => <ElInput style={{ width: block.style.width + "px" }} placeholder="渲染输入框" v-model={props.text}></ElInput>,
    key: 'input',
    props: {
        text: createInputProp('绑定字段'),
    }
})

registerConfig.register({
    label: '上传图片',
    key: 'image',
    // 配置元素可以调整大小
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <PictureFilled /> }} title="图片"></Preview>,
    render: ({ block, container, preview }) => {
        if (block.props.vantTab == container.activeTabName || block.props.vantTab == 'none') {
            return <>
                {(block.props.timeType == "before" && new Date() < new Date(block.props.startTime) && preview) && <ElImage
                    src={block.props.url}
                    style={{
                        height: block.style.height + "px",
                        width: block.style.width + "px",
                        display: block.style.display || "block"
                    }}>
                </ElImage>
                }
                {(block.props.timeType == "between" && (new Date(block.props.startTime) < new Date() && new Date() < new Date(block.props.endTime)) && preview) && <ElImage
                    src={block.props.url}
                    style={{
                        height: block.style.height + "px",
                        width: block.style.width + "px",
                        display: block.style.display || "block"
                    }}>
                </ElImage>
                }
                {(block.props.timeType == "after" && new Date() > new Date(block.props.endTime) && preview) && <ElImage
                    src={block.props.url}
                    style={{
                        height: block.style.height + "px",
                        width: block.style.width + "px",
                        display: block.style.display || "block"
                    }}>
                </ElImage>
                }
                {!(preview) && <ElImage
                    src={block.props.url}
                    style={{
                        height: block.style.height + "px",
                        width: block.style.width + "px",
                        display: block.style.display || "block"
                    }}>
                </ElImage>
                }
            </>
        }
    },
    props: {
        text: createImageProp('上传图片'),
        positionX: createPositionXStyle('X轴坐标'),
        positionY: createPositionYStyle('Y轴坐标'),
        width: createWidthStyle('宽度'),
        height: createHeightStyle('高度'),
        time: createTimeProp('时间范围'),
        vantTab: createVantTabProp('tab')
    },
    events: [],
    components: []
})

registerConfig.register({
    label: 'dialog图片',
    key: 'dialogImage',
    // 配置元素可以调整大小
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <Picture /> }} title="dialog图片"></Preview>,
    render: ({ props, block, preview }) => <>
        {(block.props.timeType == "before" && new Date() < new Date(block.props.startTime) && preview) && <ElImage
            src={props.url}
            style={{
                height: block.style.height + "px",
                width: block.style.width + "px",
                display: block.style.display || "block",

            }}>
        </ElImage>
        }
        {(block.props.timeType == "between" && (new Date(block.props.startTime) < new Date() && new Date() < new Date(block.props.endTime)) && preview) && <ElImage
            src={props.url}
            style={{
                height: block.style.height + "px",
                width: block.style.width + "px",
                display: block.style.display || "block"
            }}>
        </ElImage>
        }
        {(block.props.timeType == "after" && new Date() > new Date(block.props.endTime) && preview) && <ElImage
            src={props.url}
            style={{
                height: block.style.height + "px",
                width: block.style.width + "px",
                display: block.style.display || "block"
            }}>
        </ElImage>
        }
        {!(preview) && <ElImage
            src={props.url}
            style={{
                height: block.style.height + "px",
                width: block.style.width + "px",
                display: block.style.display || "block"
            }}>
        </ElImage>
        }
    </>,
    props: {
        text: createImageProp('上传图片'),
        positionX: createPositionXStyle('X轴坐标'),
        positionY: createPositionYStyle('Y轴坐标'),
        width: createWidthStyle('宽度'),
        height: createHeightStyle('高度'),
        zindex: createZindexProp('层级'),
        time: createTimeProp('时间范围'),
    },
    events: [],
    components: []
})

registerConfig.register({
    label: '背景色文本',
    key: 'textarea',
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <Tickets /> }} title="可变背景文本"></Preview>,
    render: ({ props, block }) => <>
        <div style={{
            color: props.color,
            fontSize: props.size + "px",
            fontWeight: props.FontWeight,
            letterSpacing: props.LetterSpace + "px",
            height: block.style.height + "px",
            width: block.style.width + "px",
            backgroundColor: props.BackgroundColor || 'rgba(255, 255, 255, 1)',
            borderRadius: props.borderRadius + "px",
            lineHeight: props.LineHeight + "px",
            "text-align": props.SelectPosition,
            "word-wrap": "break-word",
        }}><p style={{ margin: 0 }}>{props.text}</p>
        </div>
    </>,
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('字体颜色'),
        BackgroundColor: createBackgroundColorProp('背景颜色'),
        positionX: createPositionXStyle('X轴坐标'),
        positionY: createPositionYStyle('Y轴坐标'),
        width: createWidthStyle('宽度'),
        height: createHeightStyle('高度'),
        size: createFontSizeProp('字体大小'),
        FontWeight: createFontWeightProp('字体粗细'),
        LineHeight: createLineHeightProp('字体行高'),
        LetterSpace: createLetterSpaceProp('字体空隙'),
        borderRadius: createBorderRadiusProp('边框圆角'),
        SelectPosition: createSelectPositionProp('字体位置', [
            { label: '居中', value: 'center' },
            { label: '左', value: 'left' },
            { label: '右', value: 'right' }
        ]),
        time: createTimeProp('时间范围'),
    },
    events: [],
    components: []
})

registerConfig.register({
    // 可编辑文本
    label: 'variableText',
    key: 'variableText',
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <List /> }} title="可添加文本"></Preview>,
    render: ({ props, block }) => <>
        <div style={{
            height: block.style.height + "px",
            width: block.style.width + "px",
            top: block.style.top + "px",
            left: block.style.left + "px",
            backgroundColor: props.BackgroundColor || 'rgba(255, 255, 255, 1)',
            borderRadius: props.borderRadius + "px",
            display: "flex",
            flexDirection: "column",
            // maxHeight: block.props.maxHeight + "px",
        }}>
            {
                props.variableText && props.variableText.map((item) => {
                    return <p style={{
                        color: props.color,
                        fontSize: props.size + "px",
                        fontWeight: props.FontWeight,
                        letterSpacing: props.LetterSpace + "px",
                        "text-align": props.SelectPosition,
                        lineHeight: props.LineHeight + "px",
                        "word-wrap": "break-word",
                        margin: props.margin + "px"
                    }}>{item.text}</p>
                })
            }
        </div>
    </>,
    props: {
        variableText: createVariableTextProp('可变文本'),
        color: createColorProp('字体颜色'),
        BackgroundColor: createBackgroundColorProp('背景颜色'),
        positionX: createPositionXStyle('X轴坐标'),
        positionY: createPositionYStyle('Y轴坐标'),
        width: createWidthStyle('宽度'),
        height: createHeightStyle('高度'),
        size: createFontSizeProp('字体大小'),
        FontWeight: createFontWeightProp('字体粗细'),
        LineHeight: createLineHeightProp('字体行高'),
        LetterSpace: createLetterSpaceProp('字体空隙'),
        SelectPosition: createSelectPositionProp('字体位置', [
            { label: '居中', value: 'center' },
            { label: '左', value: 'left' },
            { label: '右', value: 'right' }
        ]),
        margin: createMarginProp('段落边距'),
        borderRadius: createBorderRadiusProp('边框圆角')
    }
})

registerConfig.register({
    // dialog弹窗可编辑文本
    label: 'dialogTextarea',
    key: 'dialogTextarea',
    // 配置元素可以调整大小
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <Grid /> }} title="dialog文本"></Preview>,
    render: ({ props, block }) => <>
        <div style={{
            height: block.style.height + "px",
            width: block.style.width + "px",
            top: block.style.top + "px",
            left: block.style.left + "px",
            backgroundColor: props.BackgroundColor || 'rgba(255, 255, 255, 1)',
            borderRadius: props.borderRadius + "px",
            display: "flex",
            flexDirection: "column",
            // maxHeight: block.props.maxHeight + "px",
        }}>
            {
                props.variableText && props.variableText.map((item) => {
                    return <p style={{
                        color: props.color,
                        fontSize: props.size + "px",
                        fontWeight: props.FontWeight,
                        letterSpacing: props.LetterSpace + "px",
                        "text-align": props.SelectPosition,
                        lineHeight: props.LineHeight + "px",
                        "word-wrap": "break-word",
                        margin: props.margin + "px"
                    }}>{item.text}</p>
                })
            }
        </div>
    </>,
    props: {
        variableText: createVariableTextProp('可变文本'),
        color: createColorProp('字体颜色'),
        BackgroundColor: createBackgroundColorProp('背景颜色'),
        positionX: createPositionXStyle('X轴坐标'),
        positionY: createPositionYStyle('Y轴坐标'),
        width: createWidthStyle('宽度'),
        height: createHeightStyle('高度'),
        size: createFontSizeProp('字体大小'),
        FontWeight: createFontWeightProp('字体粗细'),
        LineHeight: createLineHeightProp('字体行高'),
        LetterSpace: createLetterSpaceProp('字体空隙'),
        SelectPosition: createSelectPositionProp('字体位置', [
            { label: '居中', value: 'center' },
            { label: '左', value: 'left' },
            { label: '右', value: 'right' }
        ]),
        margin: createMarginProp('段落边距'),
        borderRadius: createBorderRadiusProp('边框圆角'),
        zindex: createZindexProp('层级'),
    }
})

registerConfig.register({
    // dialog背景蒙层
    label: 'dialogBackground',
    key: 'dialogBackground',
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <Grid /> }} title="dialog背景"></Preview>,
    render: ({ props, block }) => <>
        <div style={{
            height: block.style.height + "px",
            width: block.style.width + "px",
            top: block.style.top + "px",
            left: block.style.left + "px",
            backgroundColor: props.color || 'rgba(0, 0, 0, 0.6)',
            display: block.style.display || "block",
            zIndex: block.props.zindex
        }}></div>
    </>,
    props: {
        zindex: createZindexProp('层级'),
    }
})


registerConfig.register({
    key: 'tab',
    label: 'tab',
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <Grid /> }} title="tab占位"></Preview>,
    render: ({ block }) =>
        <>
            <Tabs class="willname" sticky={true} style={{
                height: block.style.height + "px",
                width: block.style.width + "px",
                top: block.style.top + "px",
                left: block.style.left + "px",
            }} v-model:active={block.props.activeTabIndex}>
                {
                    block.props.vantTable && block.props.vantTable.map(item => <Tab class="ppp" title={item.text} 
                    // v-slots={{ title: () => <>
                    // <span>{item.text}</span>
                    // </> 
                    // }}
                    ></Tab>)
                }
            </Tabs>
            {/* <style lang="scss">
                .ppp{
                    "color":red;
                }
            </style> */}
            {/* <> */}
            <style>
                {
                    `div{color:blue;}
                    span{color:red}
                    .willname .van-sticky{
                        background-image: url('${block.props.tabUrl}');
                        // background: yellow;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .van-tabs__nav{
                        background-color: transparent;
                   }
                   .van-tab--active{
                    transform: scale(1.2);
                    background-image: url('${block.props.tabUrl}');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    .slotTab{
                        margin-top: 0.2rem;
                    }
                    
               }
                    `
                }
                </style>
            {/* </> */}
        </>,
    props: {
        positionX: createPositionXStyle('X轴坐标'),
        positionY: createPositionYStyle('Y轴坐标'),
        width: createWidthStyle('宽度'),
        height: createHeightStyle('高度'),
        vantTable: createVantTableProp('tab')
    }
})



registerConfig.register({
    label: 'dialogText',
    resize: {
        width: true,
        height: true
    },
    preview: () => <Preview v-slots={{ icon: () => <Grid /> }} title="dialog文本2"></Preview>,
    // dialogPreview: () => <Preview v-slots={{ icon: () => <Grid /> }} title="dialog文本"></Preview>,
    render: ({ props, block }) => <>
        {/* <span style={{ color: props.color, fontSize: props.size,fontWeight:props.FontWeight,display:props.show?'':'none'}}>{props.text || '渲染文本'}</span> */}
        {/* <div>{props.show}</div> */}
        <div style={{
            height: block.style.height + "px",
            width: block.style.width + "px",
            top: block.style.top + "px",
            left: block.style.left + "px",
            backgroundColor: props.color || 'white',
            borderRadius: props.borderRadius + "px",
            display: block.style.display || "block",
            zIndex: block.props.zindex,
            maxHeight: block.props.maxHeight + "px",
            // overflowY:"scroll"
        }}></div>
    </>,
    key: 'dialogText',
    props: {
        // borderRadius: createBorderRadiusProp('圆角'),
        color: createColorProp('颜色'),
        zindex: createZindexProp('层级'),
        maxHeight: createMaxHeightProp('最大高度')
    }
})


// registerConfig.register({
//     label: 'dialogRuleText',
//     resize: {
//         width: true,
//         height: true
//     },
//     preview: () => <Preview v-slots={{ icon: () => <Grid /> }} title="弹窗规则文本"></Preview>,
//     // dialogPreview: () => <Preview v-slots={{ icon: () => <Grid /> }} title="dialog文本"></Preview>,
//     render: ({ props, block }) => <>
//         {/* <span style={{ color: props.color, fontSize: props.size,fontWeight:props.FontWeight,display:props.show?'':'none'}}>{props.text || '渲染文本'}</span> */}
//         {/* <div>{props.show}</div> */}
//         <div style={{
//             height: block.style.height + "px",
//             width: block.style.width + "px",
//             top: block.style.top + "px",
//             left: block.style.left + "px",
//             backgroundColor: props.color || 'white',
//             borderRadius: props.borderRadius + "px",
//             display: block.style.display || "block",
//             zIndex: block.props.zindex,
//             maxHeight: block.props.maxHeight + "px",
//             // overflowY:"scroll"
//         }}></div>
//     </>,
//     key: 'dialogRuleText',
//     props: {
//         // borderRadius: createBorderRadiusProp('圆角'),
//         color: createColorProp('颜色'),
//         zindex: createZindexProp('层级'),
//         maxHeight: createMaxHeightProp('最大高度')
//     }
// })





// registerConfig.register({
//     label: '下拉框',
//     preview: () => <ElSelect modelValue=""></ElSelect>,
//     render: ({ props }) => {
//         return <ElSelect>
//             {(props.options || []).map((option, index) => {
//                 return <ElOption label={option.label} value={option.value} key={index}></ElOption>
//             })}
//         </ElSelect>
//     },
//     key: 'select',
//     props: {
//         options: createTableProp('下拉选项', {
//             options: [
//                 { label: '显示值', field: 'label' },
//                 { label: '绑定值', field: 'value' }
//             ],
//             // 显示给用户的值，是label的值
//             key: 'label'
//         })
//     }
// })


// registerConfig.register({
//     label: '空标签',
//     // 配置元素可以调整大小
//     resize: {
//         width: true,
//         height: true
//     },
//     preview: () => <Preview v-slots={{ icon: () => <Grid /> }} title="空标签"></Preview>,
//     render: ({ props, block }) => <div style={{
//         height: block.style.height + "px",
//         width: block.style.width + "px",
//         backgroundColor: props.color || 'white',
//         borderRadius: props.borderRadius + "px"
//     }}></div>,
//     key: 'div',
//     props: {
//         borderRadius: createBorderRadiusProp('圆角'),
//         color: createColorProp('颜色'),
//     }
// })




