let htmlHead = `<!DOCTYPE html>
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
    <!--加密需要引用-->
    <script src="/static/original/js/pako.min.js"></script>
    <script src="/static/original/js/encrypt/des/tripledes.js"></script>
    <script src="/static/original/js/jquery-2.1.4.min.js"></script>
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
            /* background-color: dodgerblue; */
        }
    </style>
</head>
<body>`

let htmlScript = `</body>
<script src="//hm.baidu.com/hm.js?13eb8aa64687d124bfcaac2d29a1bc8f" type="text/javascript" defer="defer"></script>
<script>
    var _mtac = {};
    (function() {
        var mta = document.createElement("script");
        mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
        mta.setAttribute("name", "MTAH5");
        mta.setAttribute("sid", "500721244");
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mta, s);
    })();
</script>
</html>`

export { htmlHead, htmlScript }
