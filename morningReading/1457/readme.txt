https://blog.csdn.net/alex8046/article/details/51982730

目前最先进的 CSS 加载方法

<head>
  <script>
    // https://github.com/filamentgroup/loadCSS
    !function(e){"use strict"
    var n=function(n,t,o){function i(e){return f.body?e():void setTimeout(function(){i(e)})}var d,r,a,l,f=e.document,s=f.createElement("link"),u=o||"all"
    return t?d=t:(r=(f.body||f.getElementsByTagName("head")[0]).childNodes,d=r[r.length-1]),a=f.styleSheets,s.rel="stylesheet",s.href=n,s.media="only x",i(function(){d.parentNode.insertBefore(s,t?d:d.nextSibling)}),l=function(e){for(var n=s.href,t=a.length;t--;)if(a[t].href===n)return e()
    setTimeout(function(){l(e)})},s.addEventListener&&s.addEventListener("load",function(){this.media=u}),s.onloadcssdefined=l,l(function(){s.media!==u&&(s.media=u)}),s}
    "undefined"!=typeof exports?exports.loadCSS=n:e.loadCSS=n}("undefined"!=typeof global?global:this)
  </script>
  <style>
    /* The styles for the site header, plus: */
    .main-article,
    .comments,
    .about-me,
    footer {
      display: none;
    }
  </style>
  <script>
    loadCSS("/the-rest-of-the-styles.css");
  </script>
</head>
<body>
</body>


在上面的代码中，通过一些内联样式我们可以加速初始渲染，同时隐藏起还没有加载完样式的组件，并通过 JavaScript 异步地完成加载。剩余的 CSS 加载完后会重写.main-article中的display:none。

这个方法受到性能专家的推崇,他们认为这是快速完成初始渲染的好方法，并且经过实地测量确实在加载的时候快了不少。

但也存在一些不足之处。。。。。。

「1.它需要一个（小的）JavaScript 库」

这是由 WebKit 的实现方式造成的。一旦页面中添加了<link rel="stylesheet">，即使样式表是由 JavaScript 加载的，WebKit 还是会在加载完成之前阻碍渲染。

在 Firefox 和 IE/Edge 浏览器中，通过 JS 加载样式表是完全异步进行的。稳定版本的 Chrome 浏览器是通过 WebKit 的方式加载的，但在 Canary 版本中，仍然是使用 Firefox/Edge 加载方式。

「2.必须经历两个加载阶段」

在上述模式中，内联的 CSS 通过display:none隐藏了没有加载完样式的内容，直到异步加载完剩余的 CSS 样式。如果你将这些样式分派到两个或多个 CSS 文件中，这些文件有可能不按照顺序加载，导致加载过程中出现内容错乱：

内容错乱，就好比弹出广告一样，会导致用户体验挫败，必须全力消灭。

既然有两个加载阶段，你就必须决定渲染的先后顺序。你当然会想首先渲染「位置显要」的内容。但是，所谓的「位置」是根据窗口大小来决定的。因此，问题来了，你得找出一把「万能」钥匙。