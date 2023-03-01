import jsZip from 'jszip'
import { saveAs } from 'file-saver'

// 单文件下载
var funDownload = function (content, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);

    // 释放这个临时的对象URL
    URL.revokeObjectURL(eleLink.href)
};

const saveAsZip = (blockValue, vueTemplate, htmlTemplate, jsTemplate) => {
    let zip = new jsZip();
    let blockData = JSON.parse(JSON.stringify(blockValue))
    // 新建项目名称文件夹
    var myFile = zip.folder(blockData.container.document)
    // 项目名称文件夹目录下新增img文件夹
    var fileppp = myFile.folder('img')

    blockData.blocks.forEach((block, index) => {
        if (block.key == "image" || block.key == "dialogImage") {
            fileppp.file(`${index}.png`, block.props.url.split('base64,')[1], { base64: true }); // 文件名称
            // 将json数据中的base64格式图片转换为索引
            block.props.url = index
            // console.log('压缩文件中的image元素', block)
        }
    })

    console.log(blockData)

    // json数据需要格式化
    var jsonBlob = new Blob([JSON.stringify(blockData)])
    var vueBlob = new Blob([vueTemplate])
    var htmlBlob = new Blob([htmlTemplate])
    var jsBlob = new Blob([jsTemplate])

    // 项目名称文件夹中添加文件
    myFile.file('data.json', jsonBlob, { base64: true })
    myFile.file(`index.vue`, vueBlob, { base64: true })
    myFile.file(`${blockData.container.document}.html`, htmlBlob, { base64: true })
    myFile.file(`${blockData.container.document}.js`, jsBlob, { base64: true })

    zip.generateAsync({ type: 'blob' }).then(function (content) {
        // see FileSaver.js
        saveAs(content, `${blockData.container.document}.zip`);
    });

}

export { funDownload, saveAsZip }