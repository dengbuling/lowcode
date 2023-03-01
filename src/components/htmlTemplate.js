

const getHtml = (html, backgroundColor) => {

    let htmlTemplate =
`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta http-equiv="Cache-Control" content="no-cache" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" >
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="format-detection" content="telephone=no" />
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <script src="/static/original/js/teldApp.js"></script>
        <script src="/static/original/js/jteld.js"></script>
        <style>
            * {
                margin: 0;
                padding: 0;
                outline-style: none;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-weight: normal;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

            }
            body,html {
                font-family: PingFangSC-Regular, sans-serif;
                min-width: 320px;
                max-width: 640px;
                margin:0 auto;
                background-color: ${backgroundColor};
            }
        </style>
    </head>
    <body>
    <router-view class="view" id="${html}"></router-view>
    </body>
</html>
`
    return htmlTemplate
}


export { getHtml }





