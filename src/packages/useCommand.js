import { onUnmounted } from "vue"
import { events } from "./event"

export function useCommand(data, focusData) {
    // 前进后退需要指针
    const state = {
        // 前进后退的索引值
        current: -1,
        // 存放所有的操作命令
        queue: [],
        // 制作命令和执行功能的映射表
        commands: {},
        // 存放所有命令
        commandArray: [],
        // 销毁
        destroyList: []
    }

    const registry = (command) => {
        state.commandArray.push(command)
        // 目的是方便execute中写多个方法，方便功能维护
        state.commands[command.name] = (...args) => {
            const { redo, undo } = command.execute(...args)
            redo()
            // 不需要放到队列中直接跳过即可
            if (!command.pushQueue) {
                return
            }
            let { queue, current } = state

            // 保存指令的前进后退
            if (queue.length > 0) {
                // 可能在放置的过程中有撤销操作，所以根据当前最新的current值来计算新的
                queue = queue.slice(0, current + 1)
                state.queue = queue
            }
            queue.push({ redo, undo })
            state.current = current + 1
            // console.log('当前存放的所有操作命令', queue)
            // console.log('当前前进后退的索引值', state.current)
        }
    }

    // 注册我们需要的命令
    registry({
        name: 'redo',
        keyboard: 'ctrl+y',
        // 执行命令就会调用内部redo方法
        execute() {
            return {
                redo() {
                    console.log('前进')
                    // 找到当前的下一步还原操作
                    let item = state.queue[state.current + 1]
                    // console.log('当前索引值对应操作命令列表', item)
                    // console.log('当前存放的所有操作命令', state.queue)
                    // console.log('当前前进后退的索引值', state.current)
                    if (item) {
                        item.redo && item.redo()
                        state.current++
                    }
                }
            }
        }
    })
    registry({
        name: 'undo',
        keyboard: 'ctrl+z',
        execute() {
            return {
                redo() {
                    console.log('撤销')
                    // 没有可以撤销的了
                    if (state.current == -1) return
                    // 找到当前的下一步还原操作
                    let item = state.queue[state.current]
                    // console.log('当前索引值对应操作命令列表', item)
                    // console.log('当前存放的所有操作命令', state.queue)
                    // console.log('当前前进后退的索引值', state.current)
                    if (item) {
                        item.undo && item.undo()
                        state.current--
                    }
                }
            }
        }
    })
    registry({
        name: 'drag',
        pushQueue: true,

        // 初始化操作
        init() {
            this.before = null
            // 监控拖拽开始事件，保存状态
            const start = () => {
                // debugger;
                // console.log('监控拖拽开始事件')
                this.before = JSON.parse(JSON.stringify(data.value.blocks))
                // console.log("拖拽开始事件组件", data.value.blocks)
            }
            // 拖拽之后需要触发对应指令
            const end = () => {
                // debugger;
                // console.log('监控拖拽结束事件')
                state.commands.drag()
                // console.log("拖拽结束事件组件", data.value.blocks)
            }
            events.on('start', start)
            events.on('end', end)
            return () => {
                events.off('start')
                events.off('end')
            }
        },
        execute() {
            let before = this.before
            let after = JSON.parse(JSON.stringify(data.value.blocks))
            return {
                redo() {
                    data.value = { ...data.value, blocks: after }
                },
                undo() {
                    data.value = { ...data.value, blocks: before }
                }
            }
        }
    });
    // 导入JSON增加历史记录
    registry({
        name: 'updateContainer',
        pushQueue: true,
        execute(newValue) {
            let state = {
                after: newValue,
                before: data.value
            }
            return {
                redo() {
                    data.value = state.after
                    // console.log('当前页面中元素', data.value)
                },
                undo() {
                    data.value = state.before
                    // console.log('当前页面中元素',state.before)
                }
            }
        }
    })


    // 更新某一条数据导入JSON增加历史记录
    registry({
        name: 'updateBlock',
        pushQueue: true,
        execute(newBlock, oldBlock) {

            let state = {
                before: data.value.blocks,
                after: (() => {
                    let blocks = [...data.value.blocks]
                    const index = data.value.blocks.indexOf(oldBlock)
                    if (index > -1) {
                        blocks.splice(index, 1, newBlock)
                    }
                    return blocks
                })()
            }
            return {
                redo() {
                    data.value = { ...data.value, blocks: state.after }
                    // console.log('当前页面中元素', data.value)
                },
                undo() {
                    data.value = { ...data.value, blocks: state.before }
                    // console.log('当前页面中元素',state.before)
                }
            }
        }
    })

    // 置顶
    registry({
        name: 'placeTop',
        pushQueue: true,
        execute() {

            let before = JSON.parse(JSON.stringify(data.value))
            let after = (() => {
                let maxZIndex = focusData.value.unfocus.reduce((prev, block) => {
                    return Math.max(prev, block.zIndex)
                }, -Infinity)
                focusData.value.focus.forEach(block => block.zIndex = maxZIndex + 1);
                return JSON.parse(JSON.stringify(data.value))
            })()

            return {
                redo() {
                    let focusMaxZIndex = Math.max(...focusData.value.focus.map(item => item.zIndex))
                    let unfocusMaxZIndex = Math.max(...focusData.value.unfocus.map(item => item.zIndex))
                    console.log('选中元素最大zIndex', focusMaxZIndex)
                    console.log('未选中元素最大zIndex', unfocusMaxZIndex)
                    data.value = after
                    // console.log('当前页面中元素', data.value)
                },
                undo() {
                    data.value = before
                    // console.log('当前页面中元素',state.before)
                }
            }
        }
    })

    // 置底
    registry({
        name: 'placeBottom',
        pushQueue: true,
        execute() {

            let before = JSON.parse(JSON.stringify(data.value))
            let after = (() => {
                let minZIndex = focusData.value.unfocus.reduce((prev, block) => {
                    return Math.min(prev, block.zIndex)
                }, Infinity)
                if (minZIndex < 1) {
                    focusData.value.unfocus.forEach(block => block.zIndex++);
                }
                focusData.value.focus.forEach(block => block.zIndex = minZIndex - 1);
                return JSON.parse(JSON.stringify(data.value))
            })()

            return {
                redo() {
                    let focusMinZIndex = Math.max(...focusData.value.focus.map(item => item.zIndex))
                    let unfocusMinZIndex = Math.max(...focusData.value.unfocus.map(item => item.zIndex))
                    console.log('选中元素最大zIndex', focusMinZIndex)
                    console.log('未选中元素最大zIndex', unfocusMinZIndex)

                    data.value = after
                    // console.log('当前页面中元素', data.value)
                },
                undo() {
                    data.value = before
                    // console.log('当前页面中元素',state.before)
                }
            }
        }
    })

    // 删除
    registry({
        name: 'delete',
        pushQueue: true,
        execute() {

            let before = JSON.parse(JSON.stringify(data.value.blocks))
            let after = focusData.value.unfocus
            return {
                redo() {
                    data.value = { ...data.value, blocks: after }
                    // console.log('当前页面中元素', data.value)
                },
                undo() {
                    data.value = { ...data.value, blocks: before }
                    // console.log('当前页面中元素',state.before)
                }
            }
        }
    })

    const keyboardEvent = (() => {
        const keycodes = {
            90: 'z',
            89: 'y'
        }

        const onKeydown = (e) => {
            const { ctrlKey, keyCode } = e
            // console.log(ctrlKey,keyCode)
            let keyString = []
            ctrlKey && keyString.push('ctrl')
            keyString.push(keycodes[keyCode])
            let key = keyString.join('+')
            console.log('键盘按键', key)
            state.commandArray.forEach(command => {
                if (command.keyboard === key) {
                    state.commands[command.name]()
                    e.preventDefault();
                }
            })
        }

        const init = () => {
            window.addEventListener('keydown', onKeydown)
            return () => {
                window.removeEventListener('keydown', onKeydown)
            }
        }
        return init
    })();

    (() => {

        state.destroyList.push(keyboardEvent())
        state.commandArray.forEach(command => command.init && state.destroyList.push(command.init()))
    })()

    // 清理绑定的事件
    onUnmounted(() => {
        // console.log("清理绑定的事件")
        state.destroyList.forEach(fn => fn && fn())
    })

    return state
}