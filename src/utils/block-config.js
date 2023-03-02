export function BlockConfig(block, container) {

    try {
        const config = {
            text: () => {
                block.value.props["color"] = "#000000"
                block.value.props["text"] = "<a>标签909090文本"
                block.value.props["size"] = 16
                block.value.props["FontWeight"] = 400
                block.value.props["vantTab"] = container.activeTabName ? container.activeTabName : 'none'
            },
            button: () => {
                block.value.props["text"] = "渲染按钮"
                block.value.style.width = 100
                block.value.style.height = 32
                block.value.props.size = 16
                block.value.props["type"] = "primary"
                block.value.props.borderRadius = 0
            },
            image: () => {
                block.value.style.width = 200
                block.value.style.height = 200
                block.value.props["url"] = 'https://puui.qpic.cn/vupload/0/1573555382625_bhp0wud8l6w.png/0'
                block.value.props["vantTab"] = container.activeTabName ? container.activeTabName : 'none'
                block.value.isFirst = false
            },
            dialogImage: () => {
                block.value.style.width = 200
                block.value.style.height = 200
                block.value.props["url"] = 'https://puui.qpic.cn/vupload/0/1573555382625_bhp0wud8l6w.png/0'
                block.value.props["zindex"] = 100
                block.value.isFirst = false
            },
            textarea: () => {
                block.value.style.width = 200
                block.value.style.height = 50
                block.value.props["text"] = "可改变背景色文本"
                block.value.props.size = 16
                block.value.props.FontWeight = 400
                block.value.props.LineHeight = 20
                block.value.props.LetterSpace = 0
                block.value.props["SelectPosition"] = "left"
                block.value.props.borderRadius = 0
                block.value.isFirst = false
            },
            variableText: () => {
                block.value.style.width = 200
                block.value.style.height = 50
                block.value.props.FontWeight = 400
                block.value.props.size = 16
                block.value.props.FontWeight = 400
                block.value.props.LineHeight = 20
                block.value.props.LetterSpace = 0
                block.value.props["SelectPosition"] = "left"
                block.value.props.borderRadius = 0
                block.value.props.margin = 5
                block.value.isFirst = false
            },
            dialogTextarea: () => {
                block.value.style.width = 200
                block.value.style.height = 50
                block.value.props.FontWeight = 400
                block.value.props.size = 16
                block.value.props.FontWeight = 400
                block.value.props.LineHeight = 20
                block.value.props.LetterSpace = 0
                block.value.props["SelectPosition"] = "left"
                block.value.props.borderRadius = 0
                block.value.props.margin = 5
                block.value.props["zindex"] = 100
                block.value.isFirst = false
            },
            dialogBackground: () => {
                block.value.style.width = 375
                block.value.style.height = 667
                block.value.style.top = 0
                block.value.style.left = 0
                block.value.style.right = 0
                block.value.style.bottom = 0
                block.value.props["zindex"] = 99
                block.value.isFirst = false
            },
            dialogText: () => {
                block.value.style.width = 100
                block.value.style.height = 100
                block.value.isFirst = false
            },
            tab: () => {
                block.value.style.width = 375
                block.value.style.height = 100
                block.value.props["vantTable"] = [{text:"999"}]
                block.value.isFirst = false
            }
        }[block.value.key]()
        return config
    } catch (error) {
        console.log('暂未配置元素')
    }
}