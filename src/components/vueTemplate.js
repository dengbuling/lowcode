
let vueTemplate3 = `<script>
import data22 from "./data.json";
import { getAppDevice } from 'teld-web-component/lib/method'
export default {
    data() {
        return {
            datapp: "",
        };
    },
    mounted() {
        console.log(this.datapp);
        console.log(this.datapp.blocks);
        let _this = this
        if(getAppDevice()){
            if(this.datapp.container.enableShare){
                Teld.teldWebviewShareEnable({'share': true})
                setTimeout(function () {
                    Teld.teldWebviewSetTitle({title: _this.datapp.container.title})
                    // Teld.teldGetShareContent(function () {
                    // return _this.CMSConfig.Share
                    // })
                }, 200)
            }else{
                Teld.teldWebviewShareEnable({ 'share': false })
                Teld.teldWebviewSetTitle({title: _this.datapp.container.title})
            }

            }else{
               document.title=_this.datapp.container.title
            }
    },
    created() {
        this.datapp = data22;
    },

    render(h) {
        let yyuu = this.datapp.blocks.map((item) => {
            if (item.key == "text") {
                return h("div", {
                    style: {
                        color: item.props.color,
                        fontSize: item.props.size + "px",
                        fontWeight: item.props.FontWeight,
                        top: item.style.top/20 + "rem",
                        left: item.style.left/20 + "rem",
                        height: item.style.height/20 + "rem",
                        width: item.style.width/20 + "rem",
                        // top: item.style.top + "px",
                        // left: item.style.left + "px",
                        // height: item.style.height + "px",
                        // width: item.style.width + "px",
                        position: "absolute",
                        display: item.style.display || "block",
                    },
                    domProps: {
                        innerText: item.props.text,
                    },
                    on: {
                        click: () => this.clickEvent(item),
                    },
                });
            } else if (item.key == "image" &&((item.props.timeType == "none") || (item.props.timeType == undefined)) ) {
                return h("img", {
                    style: {
                        // color: item.props.color,
                        // fontSize: item.props.size + "px",
                        // fontWeight: item.props.FontWeight,
                        // top: item.style.top + "px",
                        // left: item.style.left + "px",
                        // height: item.style.height + "px",
                        // width: item.style.width + "px",
                        top: item.style.top/20 + "rem",
                        left: item.style.left/20 + "rem",
                        height: item.style.height/20 + "rem",
                        width: item.style.width/20 + "rem",
                        position: "absolute",
                        display: item.style.display || "block",
                    },
                    domProps: {
                        // innerText: item.props.text,
                        // src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        src: require('./img/' + item.props.url + '.png'),
                    },
                    on: {
                        click: () => this.clickEvent(item),
                    },
                });
            } else if (item.key == "image" && (item.props.timeType == "before") && new Date()<new Date(item.props.startTime)) {
                return h("img", {
                    style: {
                        // color: item.props.color,
                        // fontSize: item.props.size + "px",
                        // fontWeight: item.props.FontWeight,
                        // top: item.style.top + "px",
                        // left: item.style.left + "px",
                        // height: item.style.height + "px",
                        // width: item.style.width + "px",
                        top: item.style.top/20 + "rem",
                        left: item.style.left/20 + "rem",
                        height: item.style.height/20 + "rem",
                        width: item.style.width/20 + "rem",
                        position: "absolute",
                        display: item.style.display || "block",
                    },
                    domProps: {
                        // innerText: item.props.text,
                        // src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        src: require('./img/' + item.props.url + '.png'),
                    },
                    on: {
                        click: () => this.clickEvent(item),
                    },
                });
            } else if (item.key == "image" && (item.props.timeType == "between") && (new Date(item.props.startTime)<new Date() && new Date()<new Date(item.props.endTime))) {
                return h("img", {
                    style: {
                        // color: item.props.color,
                        // fontSize: item.props.size + "px",
                        // fontWeight: item.props.FontWeight,
                        // top: item.style.top + "px",
                        // left: item.style.left + "px",
                        // height: item.style.height + "px",
                        // width: item.style.width + "px",
                        top: item.style.top/20 + "rem",
                        left: item.style.left/20 + "rem",
                        height: item.style.height/20 + "rem",
                        width: item.style.width/20 + "rem",
                        position: "absolute",
                        display: item.style.display || "block",
                    },
                    domProps: {
                        // innerText: item.props.text,
                        // src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        src: require('./img/' + item.props.url + '.png'),
                    },
                    on: {
                        click: () => this.clickEvent(item),
                    },
                });
            } else if (item.key == "image" && (item.props.timeType == "after") && new Date()>new Date(item.props.endTime)) {
                return h("img", {
                    style: {
                        // color: item.props.color,
                        // fontSize: item.props.size + "px",
                        // fontWeight: item.props.FontWeight,
                        // top: item.style.top + "px",
                        // left: item.style.left + "px",
                        // height: item.style.height + "px",
                        // width: item.style.width + "px",
                        top: item.style.top/20 + "rem",
                        left: item.style.left/20 + "rem",
                        height: item.style.height/20 + "rem",
                        width: item.style.width/20 + "rem",
                        position: "absolute",
                        display: item.style.display || "block",
                    },
                    domProps: {
                        // innerText: item.props.text,
                        // src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        src: require('./img/' + item.props.url + '.png'),
                    },
                    on: {
                        click: () => this.clickEvent(item),
                    },
                });
            }else if (item.key == "div") {
                return h("div", {
                    style: {
                        // color: item.props.color,
                        // fontSize: item.props.size + "px",
                        // fontWeight: item.props.FontWeight,
                        // top: item.style.top + "px",
                        // left: item.style.left + "px",
                        // height: item.style.height + "px",
                        // width: item.style.width + "px",
                        top: item.style.top/20 + "rem",
                        left: item.style.left/20 + "rem",
                        height: item.style.height/20 + "rem",
                        width: item.style.width/20 + "rem",
                        position: "absolute",
                        color:item.props.color,
                        display: item.style.display || "block",
                    },
                    domProps: {
                        // innerText: item.props.text,
                        // src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        // src: require('./img/' + item.props.url + '.png'),
                    },
                    on: {
                        // click: () => this.clickEvent(item),
                    },
                });
            }else if (item.key == "textarea") {
                return h("p", {
                    style: {
                        // color: item.props.color,
                        // fontSize: item.props.size + "px",
                        // fontWeight: item.props.FontWeight,
                        // top: item.style.top + "px",
                        // left: item.style.left + "px",
                        // height: item.style.height + "px",
                        // width: item.style.width + "px",
                        // top: item.style.top/20 + "rem",
                        // left: item.style.left/20 + "rem",
                        // height: item.style.height/20 + "rem",
                        // width: item.style.width/20 + "rem",
                        // position: "absolute",
                        // color:item.props.color,
                        // display: item.style.display || "block",
                        color: item.props.color,
                        fontSize: item.props.size + "px",
                        fontWeight: item.props.FontWeight,
                        letterSpacing: item.props.LetterSpace + "px",
                        height: item.style.height/20 + "rem",
                        width: item.style.width/20 + "rem",
                        backgroundColor: item.props.BackgroundColor || 'white',
                        borderRadius: item.props.borderRadius + "px",
                        "text-align": item.props.SelectPosition,
                        lineHeight: item.props.LineHeight + "px",
                        position: "absolute",
                        top: item.style.top/20 + "rem",
                        left: item.style.left/20 + "rem",
                    },
                    domProps: {
                        innerText: item.props.text,
                        // src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        // src: require('./img/' + item.props.url + '.png'),
                    },
                    on: {
                        // click: () => this.clickEvent(item),
                    },
                });
                
            }
        });

        return h("div", yyuu);
    },

    methods: {
        clickEvent(item) {
            if (item.events.length && !item.components.length) {
                console.log("!!!!!");
                // let aaa = item.events.shift()
                let aaa = item.events[0];
                // console.log(item.events.shift())
                console.log(aaa["action"]);
                if (aaa["event"] == "url") {
                    window.location.href = aaa["action"];
                } else if (aaa["event"] == "alert") {
                    alert(aaa["action"]);
                    // console.log(aaa["action"])
                }
            } else if (item.components.length && !item.events.length) {
                console.log("allBlocks");
                item.components.forEach((block) => {
                    this.datapp.blocks[block.component].style.display =
                        block["action"];
                    // 当前组件重新挂载（强制刷新官方不推荐后续尝试优化）
                    this.$forceUpdate();
                });
                console.log(this.datapp.blocks);
            }
        },
    },
};
</script>`

let vueTemplate5 = `
<script>
import jsonData from './data.json'
import { getAppDevice } from 'teld-web-component/lib/method'
import { domain } from 'teld-web-component/lib/env'
export default {
    data () {
        return {
            appData: ''
        }
    },
    mounted () {
        // console.log(this.appData)
        // console.log(this.appData.blocks)
        let _this = this
        let shareParam = {
                title: _this.appData.container.shareParamTitle,
                desc: _this.appData.container.shareParamDesc,
                image: _this.appData.container.shareParamUrl,
                url: location.protocol + '//cv' + domain + '/module/' + _this.appData.container.document + '.html#/index'
                // url: location.protocol + '//cv' + domain + ':8083/module/' + _this.appData.container.document + '.html#/index'
            }
        if (getAppDevice()) {
            if (this.appData.container.enableShare) {
                Teld.teldWebviewShareEnable({ share: true })
                setTimeout(function () {
                    Teld.teldWebviewSetTitle({title: _this.appData.container.title})
                    Teld.teldGetShareContent(function () {
                        return shareParam
                    })
                }, 200)
            } else {
                Teld.teldWebviewShareEnable({ share: false })
                setTimeout(function () {
                    Teld.teldWebviewSetTitle({title: _this.appData.container.title})
                }, 200)
            }
        } else {
            document.title = _this.appData.container.title
        }
    },
    created () {
        this.appData = jsonData
    },
    render (h) {
        let vnodeList = this.appData.blocks.map((item, _, self) => {
            if (item.key == 'text') {
                return h('div', {
                    style: {
                        color: item.props.color,
                        fontSize: item.props.size + 'px',
                        fontWeight: item.props.FontWeight,
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        position: 'absolute',
                        display: item.style.display || 'block',
                        "text-decoration":"underline"
                    },
                    domProps: {
                        innerText: item.props.text
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } else if (item.key == 'image' && (item.props.timeType == 'none' || item.props.timeType == undefined)) {
                return h('img', {
                    style: {
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        position: 'absolute',
                        display: item.style.display || "block"
                    },
                    domProps: {
                        src: require('./img/' + item.props.url + '.png')
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } else if (item.key == 'image' && item.props.timeType == 'before' && new Date() < new Date(item.props.startTime.replace(/-/g, '/'))) {
                return h('img', {
                    style: {
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        position: 'absolute'
                    },
                    domProps: {
                        src: require('./img/' + item.props.url + '.png')
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } else if (item.key == 'image' &&
                item.props.timeType == 'between' &&
                new Date(item.props.startTime.replace(/-/g, '/')) < new Date() &&
                new Date() < new Date(item.props.endTime.replace(/-/g, '/'))
            ) {
                return h('img', {
                    style: {
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        position: 'absolute'
                    },
                    domProps: {
                        src: require('./img/' + item.props.url + '.png')
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } else if (item.key == 'image' && (item.props.timeType == 'after') && new Date() > new Date(item.props.endTime.replace(/-/g, '/'))
            ) {
                return h('img', {
                    style: {
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        position: 'absolute'
                    },
                    domProps: {
                        src: require('./img/' + item.props.url + '.png')
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } else if (item.key == 'div') {
                return h('div', {
                    style: {
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        position: 'absolute',
                        color: item.props.color,
                        display: item.style.display || 'block'
                    }
                })
            } 
            // else if (item.key == 'textarea') {
            //     return h('p', {
            //         style: {
            //             color: item.props.color,
            //             fontSize: item.props.size / 20 + 'rem',
            //             fontWeight: item.props.FontWeight,
            //             letterSpacing: item.props.LetterSpace + 'px',
            //             height: item.style.height / 20 + 'rem',
            //             width: item.style.width / 20 + 'rem',
            //             backgroundColor: item.props.BackgroundColor,
            //             borderRadius: item.props.borderRadius + 'px',
            //             'text-align': item.props.SelectPosition,
            //             lineHeight: item.props.LineHeight + 'px',
            //             position: 'absolute',
            //             top: item.style.top / 20 + 'rem',
            //             left: item.style.left / 20 + 'rem'
            //         },
            //         domProps: {
            //             innerText: item.props.text
            //         }
            //     })
            // } 
            else if (item.key == 'textarea' && (item.props.timeType == 'none' || item.props.timeType == undefined)) {
                return h('p', {
                    style: {
                        color: item.props.color,
                        fontSize: item.props.size / 20 + 'rem',
                        fontWeight: item.props.FontWeight,
                        letterSpacing: item.props.LetterSpace + 'px',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        backgroundColor: item.props.BackgroundColor,
                        borderRadius: item.props.borderRadius + 'px',
                        'text-align': item.props.SelectPosition,
                        lineHeight: item.props.LineHeight + 'px',
                        position: 'absolute',
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem'
                    },
                    domProps: {
                        innerText: item.props.text
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } else if (item.key == 'textarea' && item.props.timeType == 'before' && new Date() < new Date(item.props.startTime.replace(/-/g, '/'))) {
                return h('p', {
                    style: {
                        color: item.props.color,
                        fontSize: item.props.size / 20 + 'rem',
                        fontWeight: item.props.FontWeight,
                        letterSpacing: item.props.LetterSpace + 'px',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        backgroundColor: item.props.BackgroundColor,
                        borderRadius: item.props.borderRadius + 'px',
                        'text-align': item.props.SelectPosition,
                        lineHeight: item.props.LineHeight + 'px',
                        position: 'absolute',
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem'
                    },
                    domProps: {
                        innerText: item.props.text
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } else if (item.key == 'textarea' &&
                item.props.timeType == 'between' &&
                new Date(item.props.startTime.replace(/-/g, '/')) < new Date() &&
                new Date() < new Date(item.props.endTime.replace(/-/g, '/'))
            ) {
                return h('p', {
                    style: {
                        color: item.props.color,
                        fontSize: item.props.size / 20 + 'rem',
                        fontWeight: item.props.FontWeight,
                        letterSpacing: item.props.LetterSpace + 'px',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        backgroundColor: item.props.BackgroundColor,
                        borderRadius: item.props.borderRadius + 'px',
                        'text-align': item.props.SelectPosition,
                        lineHeight: item.props.LineHeight + 'px',
                        position: 'absolute',
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem'
                    },
                    domProps: {
                        innerText: item.props.text
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } else if (item.key == 'textarea' && (item.props.timeType == 'after') && new Date() > new Date(item.props.endTime.replace(/-/g, '/'))
            ) {
                return h('p', {
                    style: {
                        color: item.props.color,
                        fontSize: item.props.size / 20 + 'rem',
                        fontWeight: item.props.FontWeight,
                        letterSpacing: item.props.LetterSpace + 'px',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        backgroundColor: item.props.BackgroundColor,
                        borderRadius: item.props.borderRadius + 'px',
                        'text-align': item.props.SelectPosition,
                        lineHeight: item.props.LineHeight + 'px',
                        position: 'absolute',
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem'
                    },
                    domProps: {
                        innerText: item.props.text
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            } 
            
            
            else if (item.key == 'dialogBackground') {
                return h('div', {
                    style: {
                        position: 'fixed',
                        backgroundColor: item.props.BackgroundColor || 'rgba(0, 0, 0, 0.6)',
                        // height: item.style.height / 20 + 'rem',
                        // width: item.style.width / 20 + 'rem',
                        height: '100%',
                        width: '100%',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        // top: item.style.top / 20 + 'rem',
                        // left: item.style.left / 20 + 'rem',
                        // right: item.style.left / 20 + 'rem',
                        // bottom: item.style.left / 20 + 'rem',
                        zIndex: item.props.zindex,
                        display: item.style.display || "none"
                    }
                })
            } else if (item.key == 'dialogImage') {
                return h('img', {
                    style: {
                        top: item.style.top / 20 + 'rem',
                        left: item.style.left / 20 + 'rem',
                        height: item.style.height / 20 + 'rem',
                        width: item.style.width / 20 + 'rem',
                        position: 'fixed',
                        display: item.style.display || "none",
                        zIndex: item.props.zindex,
                    },
                    domProps: {
                        src: require('./img/' + item.props.url + '.png')
                    },
                    on: {
                        click: () => this.clickEvent(item)
                    }
                })
            }else if (item.key == 'dialogTextarea') {
                return h('div',
                    {
                        style: {

                            height: item.style.height / 20 + 'rem',
                            width: item.style.width / 20 + 'rem',
                            top: item.style.top / 20 + 'rem',
                            left: item.style.left / 20 + 'rem',
                            position: 'absolute',
                            backgroundColor: item.props.BackgroundColor || 'white',
                            // borderRadius: item.props.borderRadius + "px",
                            display: item.style.display=="block" ? "flex" : "none",
                            flexDirection:"column",
                            zIndex: item.props.zindex,
                            maxHeight:item.props.maxHeight + "px",
                            // overflowY:"scroll"
                        },
                    },
                    (function () {
                        let dialogText = item.props.variableText.map((ppp) => {
                            // if (item.key == 'dialogTextarea') {
                                return h('p', {
                                    style: {
                                        color: item.props.color,
                                        fontSize: item.props.size + "px",
                                        fontWeight: item.props.FontWeight,
                                        letterSpacing: item.props.LetterSpace + "px",
                                        // height: block.style.height + "px",
                                        // width: block.style.width + "px",
                                        // backgroundColor: props.BackgroundColor || 'transparent',
                                        // borderRadius: props.borderRadius + "px",
                                        "text-align": item.props.SelectPosition,
                                        lineHeight: item.props.LineHeight + "px",
                                        "word-wrap": "break-word",
                                        margin:"5px"
                                    },
                                    domProps: {
                                        innerText: ppp.text
                                    }
                                })
                            // }
                        })
                        return dialogText
                    })()
                )
            }
            else if (item.key == 'dialogText') {
                return h('div',
                    {
                        style: {

                            height: item.style.height / 20 + "rem",
                            width: item.style.width / 20 + "rem",
                            backgroundColor:item.props.BackgroundColor || "white",
                            borderRadius: item.props.borderRadius + "px",
                            "text-align": item.props.SelectPosition,
                            position: "fixed",
                            top: item.style.top / 20 + "rem",
                            left: item.style.left / 20 + "rem",
                            "max-height":item.style.maxHeight / 20 + "rem",
                            "overflow-y": "scroll",
                            display:"flex",
                            "flex-direction": "column"
                        },
                    },
                    (function () {
                        let dialogText = self.map((item) => {
                            if (item.key == 'dialogTextarea') {
                                return h('p', {
                                    style: {
                                        // height: item.style.height / 20 + "rem",
                                        width: item.style.width / 20 + "rem",
                                        "word-wrap": "break-word",
                                        // backgroundColor:item.props.BackgroundColor || "yellow",
                                        // borderRadius: item.props.borderRadius + "px",
                                        // "text-align": item.props.SelectPosition,
                                        // position: "fixed",
                                        // top: item.style.top / 20 + "rem",
                                        // left: item.style.left / 20 + "rem",
                                        // "max-height":item.style.maxHeight / 20 + "rem",
                                        // "overflow-y": "scroll"
                                    },
                                    domProps: {
                                        innerText: item.props.text
                                    }
                                })
                            }
                        })
                        return dialogText
                    })()
                )
            }else if (item.key == 'variableText') {
                return h('div',
                    {
                        style: {

                            height: item.style.height / 20 + 'rem',
                            width: item.style.width / 20 + 'rem',
                            top: item.style.top / 20 + 'rem',
                            left: item.style.left / 20 + 'rem',
                            position: 'absolute',
                            backgroundColor: item.props.BackgroundColor || 'white',
                            // borderRadius: item.props.borderRadius + "px",
                            display: "flex",
                            flexDirection:"column",
                            zIndex: item.props.zindex,
                            maxHeight:item.props.maxHeight + "px",
                            // overflowY:"scroll"
                        },
                    },
                    (function () {
                        let dialogText = item.props.variableText.map((ppp) => {
                            // if (item.key == 'dialogTextarea') {
                                return h('p', {
                                    style: {
                                        color: item.props.color,
                                        fontSize: item.props.size + "px",
                                        fontWeight: item.props.FontWeight,
                                        letterSpacing: item.props.LetterSpace + "px",
                                        // height: block.style.height + "px",
                                        // width: block.style.width + "px",
                                        // backgroundColor: props.BackgroundColor || 'transparent',
                                        // borderRadius: props.borderRadius + "px",
                                        "text-align": item.props.SelectPosition,
                                        lineHeight: item.props.LineHeight + "px",
                                        "word-wrap": "break-word",
                                        margin:"5px"
                                    },
                                    domProps: {
                                        innerText: ppp.text
                                    }
                                })
                            // }
                        })
                        return dialogText
                    })()
                )
            }
        })
        return h('div', vnodeList)
    },

    methods: {
        clickEvent (item) {
            if (getAppDevice()) {
                if (item.events.length && !item.components.length) {
                    let block = item.events[0]
                    console.log(block['action'])
                    if (block['event'] == 'url') {
                        // window.location.href = block['action']
                        Teld.teldWebviewLoadUrl({
                            'url': block['action'],
                            'share': false
                        })
                    } else if (block['event'] == 'alert') {
                        alert(block['action'])
                    }
                } else if (item.components.length && !item.events.length) {
                    item.components.forEach((block) => {
                        this.appData.blocks[block.component].style.display = block['action']
                        // 当前组件重新挂载（强制刷新官方不推荐后续尝试优化）
                        this.$forceUpdate()
                    })
                    // console.log(this.appData.blocks)
                } else {
                    return
                }
            } else {
                if (item.events.length && !item.components.length) {
                    alert('请前往特来电APP参与活动~')
                } else if (item.components.length && !item.events.length) {
                    alert('请前往特来电APP参与活动~')
                } else {
                    return
                }
            }
        }
    }
}
</script>
`



let vueTemplate = `




<script>
import jsonData from './data.json'
import { getAppDevice } from 'teld-web-component/lib/method'
import { domain } from 'teld-web-component/lib/env'
import { Tab, Tabs } from 'vant'
export default {
    data () {
        return {
            appData: ''
        }
    },
    mounted () {
        // console.log(this.appData)
        // console.log(this.appData.blocks)
        let _this = this
        let shareParam = {
                title: _this.appData.container.shareParamTitle,
                desc: _this.appData.container.shareParamDesc,
                image: _this.appData.container.shareParamUrl,
                url: location.protocol + '//cv' + domain + '/module/' + _this.appData.container.document + '.html#/index'
            }
        if (getAppDevice()) {
            if (this.appData.container.enableShare) {
                Teld.teldWebviewShareEnable({ share: true })
                setTimeout(function () {
                    Teld.teldWebviewSetTitle({title: _this.appData.container.title})
                    Teld.teldGetShareContent(function () {
                        return shareParam
                    })
                }, 200)
            } else {
                Teld.teldWebviewShareEnable({ share: false })
                setTimeout(function () {
                    Teld.teldWebviewSetTitle({title: _this.appData.container.title})
                }, 200)
            }
        } else {
            document.title = _this.appData.container.title
        }
    },
    created () {
        this.appData = jsonData
    },
    render (h) {
            return h('div', this.getVnodeList(h, this.appData, this.clickEvent))
    },
    methods: {
        clickEvent (item) {
            if (!getAppDevice()) {
                if (item.events.length && !item.components.length) {
                    let block = item.events[0]
                    console.log(block['action'])
                    if (block['event'] == 'url') {
                        Teld.teldWebviewLoadUrl({
                            'url': block['action'],
                            'share': false
                        })
                    } else if (block['event'] == 'alert') {
                        alert(block['action'])
                    }
                } else if (item.components.length && !item.events.length) {
                    item.components.forEach((block) => {
                        this.appData.blocks[block.component].style.display = block['action']
                        // 当前组件重新挂载（强制刷新官方不推荐后续尝试优化）
                        this.$forceUpdate()
                    })
                    // console.log(this.appData.blocks)
                }
            } else {
                if (item.events.length && !item.components.length) {
                    alert('请前往特来电APP参与活动~')
                } else if (item.components.length && !item.events.length) {
                    alert('请前往特来电APP参与活动~')
                }
            }
        },
        getVnodeList (h, appData, clickEvent, fontSize = 20) {
            const vnodeList = appData.blocks.map((item, _, self) => {
                const config = {
                    text: () => {
                        return h('div', {
                            style: {
                                top: item.style.top / fontSize + 'rem',
                                left: item.style.left / fontSize + 'rem',
                                height: item.style.height / fontSize + 'rem',
                                width: item.style.width / fontSize + 'rem',
                                position: 'absolute',
                                display: item.style.display || 'block',
                                color: item.props.color,
                                fontSize: item.props.size + 'px',
                                fontWeight: item.props.FontWeight,
                                'text-decoration': 'underline'
                            },
                            domProps: {
                                innerText: item.props.text
                            },
                            on: {
                                click: () => clickEvent(item)
                            }
                        })
                    },
                    image: () => {
                        if (item.props.timeType == 'none' || item.props.timeType == undefined) {
                            return h('img', {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute',
                                    display: item.style.display || 'block'
                                },
                                domProps: {
                                    src: require('./img/' + item.props.url + '.png')
                                },
                                on: {
                                    click: () => this.clickEvent(item)
                                }
                            })
                        } else if (item.props.timeType == 'before' && new Date() < new Date(item.props.startTime.replace(/-/g, '/'))) {
                            return h('img', {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute'
                                },
                                domProps: {
                                    src: require('./img/' + item.props.url + '.png')
                                },
                                on: {
                                    click: () => this.clickEvent(item)
                                }
                            })
                        } else if (item.props.timeType == 'between' && new Date(item.props.startTime.replace(/-/g, '/')) < new Date() && new Date() < new Date(item.props.endTime.replace(/-/g, '/'))) {
                            return h('img', {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute'
                                },
                                domProps: {
                                    src: require('./img/' + item.props.url + '.png')
                                },
                                on: {
                                    click: () => this.clickEvent(item)
                                }
                            })
                        } else if (item.key == 'image' && (item.props.timeType == 'after') && new Date() > new Date(item.props.endTime.replace(/-/g, '/'))) {
                            return h('img', {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute'
                                },
                                domProps: {
                                    src: require('./img/' + item.props.url + '.png')
                                },
                                on: {
                                    click: () => this.clickEvent(item)
                                }
                            })
                        }
                    },
                    textarea: () => {
                        if (item.props.timeType == 'none' || item.props.timeType == undefined) {
                            return h('p', {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute',
                                    color: item.props.color,
                                    backgroundColor: item.props.BackgroundColor,
                                    fontSize: item.props.size / fontSize + 'rem',
                                    fontWeight: item.props.FontWeight,
                                    letterSpacing: item.props.LetterSpace + 'px',
                                    'text-align': item.props.SelectPosition,
                                    lineHeight: item.props.LineHeight + 'px',
                                    borderRadius: item.props.borderRadius + 'px'
                                },
                                domProps: {
                                    innerText: item.props.text
                                },
                                on: {
                                    click: () => this.clickEvent(item)
                                }
                            })
                        } else if (item.props.timeType == 'before' && new Date() < new Date(item.props.startTime.replace(/-/g, '/'))) {
                            return h('p', {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute',
                                    color: item.props.color,
                                    backgroundColor: item.props.BackgroundColor,
                                    fontSize: item.props.size / fontSize + 'rem',
                                    fontWeight: item.props.FontWeight,
                                    letterSpacing: item.props.LetterSpace + 'px',
                                    'text-align': item.props.SelectPosition,
                                    lineHeight: item.props.LineHeight + 'px',
                                    borderRadius: item.props.borderRadius + 'px'
                                },
                                domProps: {
                                    innerText: item.props.text
                                },
                                on: {
                                    click: () => this.clickEvent(item)
                                }
                            })
                        } else if (item.props.timeType == 'between' && new Date(item.props.startTime.replace(/-/g, '/')) < new Date() && new Date() < new Date(item.props.endTime.replace(/-/g, '/'))) {
                            return h('p', {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute',
                                    color: item.props.color,
                                    backgroundColor: item.props.BackgroundColor,
                                    fontSize: item.props.size / fontSize + 'rem',
                                    fontWeight: item.props.FontWeight,
                                    letterSpacing: item.props.LetterSpace + 'px',
                                    'text-align': item.props.SelectPosition,
                                    lineHeight: item.props.LineHeight + 'px',
                                    borderRadius: item.props.borderRadius + 'px'
                                },
                                domProps: {
                                    innerText: item.props.text
                                },
                                on: {
                                    click: () => this.clickEvent(item)
                                }
                            })
                        } else if (item.props.timeType == 'after' && new Date() > new Date(item.props.endTime.replace(/-/g, '/'))) {
                            return h('p', {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute',
                                    color: item.props.color,
                                    backgroundColor: item.props.BackgroundColor,
                                    fontSize: item.props.size / fontSize + 'rem',
                                    fontWeight: item.props.FontWeight,
                                    letterSpacing: item.props.LetterSpace + 'px',
                                    'text-align': item.props.SelectPosition,
                                    lineHeight: item.props.LineHeight + 'px',
                                    borderRadius: item.props.borderRadius + 'px'
                                },
                                domProps: {
                                    innerText: item.props.text
                                },
                                on: {
                                    click: () => this.clickEvent(item)
                                }
                            })
                        }
                    },
                    dialogBackground: () => {
                        return h('div', {
                            style: {
                                top: '0',
                                left: '0',
                                right: '0',
                                bottom: '0',
                                position: 'fixed',
                                height: '100%',
                                width: '100%',
                                display: item.style.display || 'none',
                                backgroundColor: item.props.BackgroundColor || 'rgba(0, 0, 0, 0.6)'
                            }
                        })
                    },
                    variableText: () => {
                        return h('div',
                            {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute',
                                    backgroundColor: item.props.BackgroundColor || 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    zIndex: item.props.zindex,
                                    maxHeight: item.props.maxHeight + 'px'
                                }
                            },
                            (function () {
                                let dialogText = item.props.variableText.map((dialogTextItem) => {
                                    return h('p', {
                                        style: {
                                            color: item.props.color,
                                            fontSize: item.props.size + 'px',
                                            fontWeight: item.props.FontWeight,
                                            letterSpacing: item.props.LetterSpace + 'px',
                                            lineHeight: item.props.LineHeight + 'px',
                                            'text-align': item.props.SelectPosition,
                                            'word-wrap': 'break-word',
                                            margin: '5px'
                                        },
                                        domProps: {
                                            innerText: dialogTextItem.text
                                        }
                                    })
                                })
                                return dialogText
                            })()
                        )
                    },
                    dialogTextarea: ()=> {
                        return h('div',
                            {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute',
                                    backgroundColor: item.props.BackgroundColor || 'white',
                                    display: item.style.display=='block' ? 'flex' : 'none',
                                    flexDirection: 'column',
                                    zIndex: item.props.zindex,
                                    maxHeight: item.props.maxHeight + 'px'
                                }
                            },
                            (function () {
                                let dialogText = item.props.variableText.map((dialogTextItem) => {
                                        return h('p', {
                                            style: {
                                                color: item.props.color,
                                                fontSize: item.props.size + 'px',
                                                fontWeight: item.props.FontWeight,
                                                letterSpacing: item.props.LetterSpace + 'px',
                                                lineHeight: item.props.LineHeight + 'px',
                                                'text-align': item.props.SelectPosition,
                                                'word-wrap': 'break-word',
                                                margin: '5px'
                                            },
                                            domProps: {
                                                innerText: dialogTextItem.text
                                            }
                                        })
                                })
                                return dialogText
                            })()
                        )
                    },
                    dialogImage: () => {
                        return h('img', {
                            style: {
                                top: item.style.top / fontSize + 'rem',
                                left: item.style.left / fontSize + 'rem',
                                height: item.style.height / fontSize + 'rem',
                                width: item.style.width / fontSize + 'rem',
                                position: 'absolute',
                                display: item.style.display || 'none'
                            },
                            domProps: {
                                src: require('./img/' + item.props.url + '.png')
                            },
                            on: {
                                click: () => clickEvent(item)
                            }
                        })
                    },
                    tab: () => {
                        return h(Tabs,
                            {
                                style: {
                                    top: item.style.top / fontSize + 'rem',
                                    left: item.style.left / fontSize + 'rem',
                                    height: item.style.height / fontSize + 'rem',
                                    width: item.style.width / fontSize + 'rem',
                                    position: 'absolute'
                                },
                                class:{
                                    vantabs:"vantabs"
                                },
                            },
                            (function () {
                                console.log(item.props.vantTable)
                                let dialogText = item.props.vantTable.map((dialogTextItem) => {
                                        return h(Tab, {
                                            style: {
                                                // color: item.props.color,
                                                // fontSize: item.props.size + 'px',
                                                // fontWeight: item.props.FontWeight,
                                                // letterSpacing: item.props.LetterSpace + 'px',
                                                // lineHeight: item.props.LineHeight + 'px',
                                                // 'text-align': item.props.SelectPosition,
                                                // 'word-wrap': 'break-word',
                                                // margin: '5px'
                                                // top: item.style.top / fontSize + 'rem',
                                                // left: item.style.left / fontSize + 'rem',
                                                // height: item.style.height / fontSize + 'rem',
                                                // width: item.style.width / fontSize + 'rem'
                                            },
                                            domProps: {
                                                // title: dialogTextItem.text
                                            },
                                            attrs: {
                                            title: dialogTextItem.text
                                            },
                                            
                                        })
                                })
                                return dialogText
                            })()
                        )
                    }
                }[item.key]()
                // console.log('config', config)
                return config
            })
            // console.log('vnodeList', vnodeList)
            return vnodeList
        }
    }
}
</script>





`



export {vueTemplate}





