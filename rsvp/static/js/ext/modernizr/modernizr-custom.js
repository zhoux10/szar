/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-animation-apng-backdropfilter-backgroundsize-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-bgsizecover-borderimage-borderradius-boxshadow-boxsizing-capture-checked-classlist-cssanimations-csscalc-csschunit-cssfilters-cssgradients-cssinvalid-cssmask-csspointerevents-csspositionsticky-csspseudoanimations-csspseudotransitions-cssremunit-cssresize-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-cubicbezierrange-dataset-datauri-directory-display_runin-displaytable-ellipsis-fileinput-flexbox-flexboxlegacy-flexboxtweener-flexwrap-fontface-formattribute-formvalidation-generatedcontent-hidden-history-inlinesvg-input-inputformaction-inputformenctype-inputformmethod-inputformtarget-inputtypes-json-lastchild-localstorage-mediaqueries-multiplebgs-mutationobserver-notification-nthchild-objectfit-oninput-opacity-overflowscrolling-pagevisibility-performance-placeholder-preserve3d-proximity-queryselector-requestanimationframe-requestautocomplete-rgba-sandbox-seamless-siblinggeneral-sizes-smil-supports-svgclippaths-svgfilters-svgforeignobject-templatestrings-textshadow-touchevents-unicode-urlparser-video-willchange-setclasses-cssclassprefix:support- !*/
!function(window,document,undefined){function is(e,t){return typeof e===t}function testRunner(){var e,t,n,r,i,o,d;for(var s in tests)if(tests.hasOwnProperty(s)){if(e=[],t=tests[s],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=is(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)o=e[i],d=o.split("."),1===d.length?Modernizr[d[0]]=r:(!Modernizr[d[0]]||Modernizr[d[0]]instanceof Boolean||(Modernizr[d[0]]=new Boolean(Modernizr[d[0]])),Modernizr[d[0]][d[1]]=r),classes.push((r?"":"no-")+d.join("-"))}}function setClasses(e){var t=docElement.className,n=Modernizr._config.classPrefix||"";if(isSVG&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),isSVG?docElement.className.baseVal=t:docElement.className=t)}function createElement(){return"function"!=typeof document.createElement?document.createElement(arguments[0]):isSVG?document.createElementNS.call(document,"http://www.w3.org/2000/svg",arguments[0]):document.createElement.apply(document,arguments)}function roundedEquals(e,t){return e-1===t||e===t||e+1===t}function cssToDOM(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function addTest(e,t){if("object"==typeof e)for(var n in e)hasOwnProp(e,n)&&addTest(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),i=Modernizr[r[0]];if(2==r.length&&(i=i[r[1]]),"undefined"!=typeof i)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),setClasses([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function getBody(){var e=document.body;return e||(e=createElement(isSVG?"svg":"body"),e.fake=!0),e}function injectElementWithStyles(e,t,n,r){var i,o,d,s,a="modernizr",l=createElement("div"),c=getBody();if(parseInt(n,10))for(;n--;)d=createElement("div"),d.id=r?r[n]:a+(n+1),l.appendChild(d);return i=createElement("style"),i.type="text/css",i.id="s"+a,(c.fake?c:l).appendChild(i),c.appendChild(l),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e)),l.id=a,c.fake&&(c.style.background="",c.style.overflow="hidden",s=docElement.style.overflow,docElement.style.overflow="hidden",docElement.appendChild(c)),o=t(l,e),c.fake?(c.parentNode.removeChild(c),docElement.style.overflow=s,docElement.offsetHeight):l.parentNode.removeChild(l),!!o}function contains(e,t){return!!~(""+e).indexOf(t)}function fnBind(e,t){return function(){return e.apply(t,arguments)}}function testDOMProps(e,t,n){var r;for(var i in e)if(e[i]in t)return n===!1?e[i]:(r=t[e[i]],is(r,"function")?fnBind(r,n||t):r);return!1}function domToCSS(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function nativeTestProps(e,t){var n=e.length;if("CSS"in window&&"supports"in window.CSS){for(;n--;)if(window.CSS.supports(domToCSS(e[n]),t))return!0;return!1}if("CSSSupportsRule"in window){for(var r=[];n--;)r.push("("+domToCSS(e[n])+":"+t+")");return r=r.join(" or "),injectElementWithStyles("@supports ("+r+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return undefined}function testProps(e,t,n,r){function i(){d&&(delete mStyle.style,delete mStyle.modElem)}if(r=is(r,"undefined")?!1:r,!is(n,"undefined")){var o=nativeTestProps(e,n);if(!is(o,"undefined"))return o}for(var d,s,a,l,c,u=["modernizr","tspan"];!mStyle.style;)d=!0,mStyle.modElem=createElement(u.shift()),mStyle.style=mStyle.modElem.style;for(a=e.length,s=0;a>s;s++)if(l=e[s],c=mStyle.style[l],contains(l,"-")&&(l=cssToDOM(l)),mStyle.style[l]!==undefined){if(r||is(n,"undefined"))return i(),"pfx"==t?l:!0;try{mStyle.style[l]=n}catch(p){}if(mStyle.style[l]!=c)return i(),"pfx"==t?l:!0}return i(),!1}function testPropsAll(e,t,n,r,i){var o=e.charAt(0).toUpperCase()+e.slice(1),d=(e+" "+cssomPrefixes.join(o+" ")+o).split(" ");return is(t,"string")||is(t,"undefined")?testProps(d,t,r,i):(d=(e+" "+domPrefixes.join(o+" ")+o).split(" "),testDOMProps(d,t,n))}function testAllProps(e,t,n){return testPropsAll(e,undefined,undefined,t,n)}var classes=[],tests=[],ModernizrProto={_version:"3.3.1",_config:{classPrefix:"support-",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){tests.push({name:e,fn:t,options:n})},addAsyncTest:function(e){tests.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=ModernizrProto,Modernizr=new Modernizr,Modernizr.addTest("history",function(){var e=navigator.userAgent;return-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone")?window.history&&"pushState"in window.history:!1}),Modernizr.addTest("json","JSON"in window&&"parse"in JSON&&"stringify"in JSON),Modernizr.addTest("notification",function(){if(!window.Notification||!window.Notification.requestPermission)return!1;if("granted"===window.Notification.permission)return!0;try{new window.Notification("")}catch(e){if("TypeError"===e.name)return!1}return!0}),Modernizr.addTest("queryselector","querySelector"in document&&"querySelectorAll"in document),Modernizr.addTest("templatestrings",function(){var supports;try{eval("``"),supports=!0}catch(e){}return!!supports});var newSyntax="CSS"in window&&"supports"in window.CSS,oldSyntax="supportsCSS"in window;Modernizr.addTest("supports",newSyntax||oldSyntax),Modernizr.addTest("mutationobserver",!!window.MutationObserver||!!window.WebKitMutationObserver),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}),Modernizr.addTest("svgfilters",function(){var e=!1;try{e="SVGFEColorMatrixElement"in window&&2==SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(t){}return e}),Modernizr.addTest("urlparser",function(){var e;try{return e=new URL("http://modernizr.com/"),"http://modernizr.com/"===e.href}catch(t){return!1}});var docElement=document.documentElement;Modernizr.addTest("willchange","willChange"in docElement.style),Modernizr.addTest("classlist","classList"in docElement);var isSVG="svg"===docElement.nodeName.toLowerCase();Modernizr.addTest("video",function(){var e=createElement("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("webanimations","animate"in createElement("div")),Modernizr.addTest("bgpositionshorthand",function(){var e=createElement("a"),t=e.style,n="right 10px bottom 10px";return t.cssText="background-position: "+n+";",t.backgroundPosition===n}),Modernizr.addTest("multiplebgs",function(){var e=createElement("a").style;return e.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(e.background)}),Modernizr.addTest("csspointerevents",function(){var e=createElement("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents}),Modernizr.addTest("cssremunit",function(){var e=createElement("a").style;try{e.fontSize="3rem"}catch(t){}return/rem/.test(e.fontSize)}),Modernizr.addTest("rgba",function(){var e=createElement("a").style;return e.cssText="background-color:rgba(150,255,150,.5)",(""+e.backgroundColor).indexOf("rgba")>-1}),Modernizr.addTest("dataset",function(){var e=createElement("div");return e.setAttribute("data-a-b","c"),!(!e.dataset||"c"!==e.dataset.aB)}),Modernizr.addTest("hidden","hidden"in createElement("a")),Modernizr.addTest("capture","capture"in createElement("input")),Modernizr.addTest("fileinput",function(){if(navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/))return!1;var e=createElement("input");return e.type="file",!e.disabled}),Modernizr.addTest("formattribute",function(){var e,t=createElement("form"),n=createElement("input"),r=createElement("div"),i="formtest"+(new Date).getTime(),o=!1;t.id=i;try{n.setAttribute("form",i)}catch(d){document.createAttribute&&(e=document.createAttribute("form"),e.nodeValue=i,n.setAttributeNode(e))}return r.appendChild(t),r.appendChild(n),docElement.appendChild(r),o=t.elements&&1===t.elements.length&&n.form==t,r.parentNode.removeChild(r),o}),Modernizr.addTest("placeholder","placeholder"in createElement("input")&&"placeholder"in createElement("textarea")),Modernizr.addTest("sandbox","sandbox"in createElement("iframe")),Modernizr.addTest("seamless","seamless"in createElement("iframe")),Modernizr.addTest("inputformaction",!!("formAction"in createElement("input")),{aliases:["input-formaction"]}),Modernizr.addTest("inputformenctype",!!("formEnctype"in createElement("input")),{aliases:["input-formenctype"]}),Modernizr.addTest("inputformmethod",!!("formMethod"in createElement("input"))),Modernizr.addTest("inputformtarget",!!("formtarget"in createElement("input")),{aliases:["input-formtarget"]}),Modernizr.addTest("inlinesvg",function(){var e=createElement("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var inputElem=createElement("input"),inputattrs="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),attrs={};Modernizr.input=function(e){for(var t=0,n=e.length;n>t;t++)attrs[e[t]]=!!(e[t]in inputElem);return attrs.list&&(attrs.list=!(!createElement("datalist")||!window.HTMLDataListElement)),attrs}(inputattrs);var inputtypes="search tel url email datetime date month week time datetime-local number range color".split(" "),inputs={};Modernizr.inputtypes=function(e){for(var t,n,r,i=e.length,o="1)",d=0;i>d;d++)inputElem.setAttribute("type",t=e[d]),r="text"!==inputElem.type&&"style"in inputElem,r&&(inputElem.value=o,inputElem.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(t)&&inputElem.style.WebkitAppearance!==undefined?(docElement.appendChild(inputElem),n=document.defaultView,r=n.getComputedStyle&&"textfield"!==n.getComputedStyle(inputElem,null).WebkitAppearance&&0!==inputElem.offsetHeight,docElement.removeChild(inputElem)):/^(search|tel)$/.test(t)||(r=/^(url|email)$/.test(t)?inputElem.checkValidity&&inputElem.checkValidity()===!1:inputElem.value!=o)),inputs[e[d]]=!!r;return inputs}(inputtypes);var prefixes=ModernizrProto._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];ModernizrProto._prefixes=prefixes,Modernizr.addTest("csscalc",function(){var e="width:",t="calc(10px);",n=createElement("a");return n.style.cssText=e+prefixes.join(t+e),!!n.style.length}),Modernizr.addTest("cubicbezierrange",function(){var e=createElement("a");return e.style.cssText=prefixes.join("transition-timing-function:cubic-bezier(1,0,0,1.1); "),!!e.style.length}),Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",i=0,o=prefixes.length-1;o>i;i++)e=0===i?"to ":"",r+=t+prefixes[i]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=t+"-webkit-"+n);var d=createElement("a"),s=d.style;return s.cssText=r,(""+s.backgroundImage).indexOf("gradient")>-1}),Modernizr.addTest("opacity",function(){var e=createElement("a").style;return e.cssText=prefixes.join("opacity:.55;"),/^0.55$/.test(e.opacity)}),Modernizr.addTest("csspositionsticky",function(){var e="position:",t="sticky",n=createElement("a"),r=n.style;return r.cssText=e+prefixes.join(t+";"+e).slice(0,-e.length),-1!==r.position.indexOf(t)});var modElem={elem:createElement("modernizr")};Modernizr._q.push(function(){delete modElem.elem}),Modernizr.addTest("csschunit",function(){var e,t=modElem.elem.style;try{t.fontSize="3ch",e=-1!==t.fontSize.indexOf("ch")}catch(n){e=!1}return e});var hasEvent=function(){function e(e,n){var r;return e?(n&&"string"!=typeof n||(n=createElement(n||"div")),e="on"+e,r=e in n,!r&&t&&(n.setAttribute||(n=createElement("div")),n.setAttribute(e,""),r="function"==typeof n[e],n[e]!==undefined&&(n[e]=undefined),n.removeAttribute(e)),r):!1}var t=!("onblur"in document.documentElement);return e}();ModernizrProto.hasEvent=hasEvent,Modernizr.addTest("canvas",function(){var e=createElement("canvas");return!(!e.getContext||!e.getContext("2d"))});var toStringFn={}.toString;Modernizr.addTest("svgclippaths",function(){return!!document.createElementNS&&/SVGClipPath/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg","clipPath")))}),Modernizr.addTest("svgforeignobject",function(){return!!document.createElementNS&&/SVGForeignObject/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg","foreignObject")))}),Modernizr.addTest("smil",function(){return!!document.createElementNS&&/SVGAnimate/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg","animate")))});var hasOwnProp;!function(){var e={}.hasOwnProperty;hasOwnProp=is(e,"undefined")||is(e.call,"undefined")?function(e,t){return t in e&&is(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),ModernizrProto._l={},ModernizrProto.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},ModernizrProto._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){ModernizrProto.addTest=addTest}),Modernizr.addAsyncTest(function(){function e(){clearTimeout(t),window.removeEventListener("deviceproximity",e),addTest("proximity",!0)}var t,n=300;"ondeviceproximity"in window&&"onuserproximity"in window?(window.addEventListener("deviceproximity",e),t=setTimeout(function(){window.removeEventListener("deviceproximity",e),addTest("proximity",!1)},n)):addTest("proximity",!1)}),Modernizr.addAsyncTest(function(){if(!Modernizr.canvas)return!1;var e=new Image,t=createElement("canvas"),n=t.getContext("2d");e.onload=function(){addTest("apng",function(){return"undefined"==typeof t.getContext?!1:(n.drawImage(e,0,0),0===n.getImageData(0,0,1,1).data[3])})},e.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg=="}),Modernizr.addAsyncTest(function(){var e,t,n,r=createElement("img"),i="sizes"in r;!i&&"srcset"in r?(t="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",n=function(){addTest("sizes",2==r.width)},r.onload=n,r.onerror=n,r.setAttribute("sizes","9px"),r.srcset=e+" 1w,"+t+" 8w",r.src=e):addTest("sizes",i)}),Modernizr.addAsyncTest(function(){function e(){var e=new Image;e.onerror=function(){addTest("datauri",!0),Modernizr.datauri=new Boolean(!0),Modernizr.datauri.over32kb=!1},e.onload=function(){addTest("datauri",!0),Modernizr.datauri=new Boolean(!0),Modernizr.datauri.over32kb=1==e.width&&1==e.height};for(var t="R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";t.length<33e3;)t="\r\n"+t;e.src="data:image/gif;base64,"+t}-1!==navigator.userAgent.indexOf("MSIE 7.")&&setTimeout(function(){addTest("datauri",!1)},10);var t=new Image;t.onerror=function(){addTest("datauri",!1)},t.onload=function(){1==t.width&&1==t.height?e():addTest("datauri",!1)},t.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="});var omPrefixes="Moz O ms Webkit",domPrefixes=ModernizrProto._config.usePrefixes?omPrefixes.toLowerCase().split(" "):[];ModernizrProto._domPrefixes=domPrefixes,Modernizr.addTest("fileinputdirectory",function(){var e=createElement("input"),t="directory";if(e.type="file",t in e)return!0;for(var n=0,r=domPrefixes.length;r>n;n++)if(domPrefixes[n]+t in e)return!0;return!1});var cssomPrefixes=ModernizrProto._config.usePrefixes?omPrefixes.split(" "):[];ModernizrProto._cssomPrefixes=cssomPrefixes;var atRule=function(e){var t,n=prefixes.length,r=window.CSSRule;if("undefined"==typeof r)return undefined;if(!e)return!1;if(e=e.replace(/^@/,""),t=e.replace(/-/g,"_").toUpperCase()+"_RULE",t in r)return"@"+e;for(var i=0;n>i;i++){var o=prefixes[i],d=o.toUpperCase()+"_"+t;if(d in r)return"@-"+o.toLowerCase()+"-"+e}return!1};ModernizrProto.atRule=atRule;var testStyles=ModernizrProto.testStyles=injectElementWithStyles;Modernizr.addTest("touchevents",function(){var e;if("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)e=!0;else{var t=["@media (",prefixes.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");testStyles(t,function(t){e=9===t.offsetTop})}return e}),Modernizr.addTest("unicode",function(){var e,t=createElement("span"),n=createElement("span");return testStyles("#modernizr{font-family:Arial,sans;font-size:300em;}",function(r){t.innerHTML=isSVG?"妇":"&#5987;",n.innerHTML=isSVG?"☆":"&#9734;",r.appendChild(t),r.appendChild(n),e="offsetWidth"in t&&t.offsetWidth!==n.offsetWidth}),e}),Modernizr.addTest("checked",function(){return testStyles("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",function(e){var t=createElement("input");return t.setAttribute("type","checkbox"),t.setAttribute("checked","checked"),e.appendChild(t),20===t.offsetLeft})}),testStyles("#modernizr{display: table; direction: ltr}#modernizr div{display: table-cell; padding: 10px}",function(e){var t,n=e.childNodes;t=n[0].offsetLeft<n[1].offsetLeft,Modernizr.addTest("displaytable",t,{aliases:["display-table"]})},2);var blacklist=function(){var e=navigator.userAgent,t=e.match(/applewebkit\/([0-9]+)/gi)&&parseFloat(RegExp.$1),n=e.match(/w(eb)?osbrowser/gi),r=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9,i=533>t&&e.match(/android/gi);return n||i||r}();blacklist?Modernizr.addTest("fontface",!1):testStyles('@font-face {font-family:"font";src:url("https://")}',function(e,t){var n=document.getElementById("smodernizr"),r=n.sheet||n.styleSheet,i=r?r.cssRules&&r.cssRules[0]?r.cssRules[0].cssText:r.cssText||"":"",o=/src/i.test(i)&&0===i.indexOf(t.split(" ")[0]);Modernizr.addTest("fontface",o)}),testStyles('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}',function(e){Modernizr.addTest("generatedcontent",e.offsetHeight>=7)}),Modernizr.addTest("cssinvalid",function(){return testStyles("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:invalid{width:50px}",function(e){var t=createElement("input");return t.required=!0,e.appendChild(t),t.clientWidth>10})}),testStyles("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}",function(e){Modernizr.addTest("lastchild",e.lastChild.offsetWidth>e.firstChild.offsetWidth)},2),testStyles("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}",function(e){for(var t=e.getElementsByTagName("div"),n=!0,r=0;5>r;r++)n=n&&t[r].offsetWidth===r%2+1;Modernizr.addTest("nthchild",n)},5),Modernizr.addTest("siblinggeneral",function(){return testStyles("#modernizr div {width:100px} #modernizr div ~ div {width:200px;display:block}",function(e){return 200==e.lastChild.offsetWidth},2)}),testStyles("#modernizr { height: 50vh; }",function(e){var t=parseInt(window.innerHeight/2,10),n=parseInt((window.getComputedStyle?getComputedStyle(e,null):e.currentStyle).height,10);Modernizr.addTest("cssvhunit",n==t)}),testStyles("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(e){var t=e.childNodes[2],n=e.childNodes[1],r=e.childNodes[0],i=parseInt((n.offsetWidth-n.clientWidth)/2,10),o=r.clientWidth/100,d=r.clientHeight/100,s=parseInt(50*Math.max(o,d),10),a=parseInt((window.getComputedStyle?getComputedStyle(t,null):t.currentStyle).width,10);Modernizr.addTest("cssvmaxunit",roundedEquals(s,a)||roundedEquals(s,a-i))},3),testStyles("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(e){var t=e.childNodes[2],n=e.childNodes[1],r=e.childNodes[0],i=parseInt((n.offsetWidth-n.clientWidth)/2,10),o=r.clientWidth/100,d=r.clientHeight/100,s=parseInt(50*Math.min(o,d),10),a=parseInt((window.getComputedStyle?getComputedStyle(t,null):t.currentStyle).width,10);Modernizr.addTest("cssvminunit",roundedEquals(s,a)||roundedEquals(s,a-i))},3),testStyles("#modernizr { width: 50vw; }",function(e){var t=parseInt(window.innerWidth/2,10),n=parseInt((window.getComputedStyle?getComputedStyle(e,null):e.currentStyle).width,10);Modernizr.addTest("cssvwunit",n==t)}),Modernizr.addTest("oninput",function(){var e,t=createElement("input");if(t.setAttribute("oninput","return"),hasEvent("oninput",docElement)||"function"==typeof t.oninput)return!0;try{var n=document.createEvent("KeyboardEvent");e=!1;var r=function(t){e=!0,t.preventDefault(),t.stopPropagation()};n.initKeyEvent("keypress",!0,!0,window,!1,!1,!1,!1,0,"e".charCodeAt(0)),docElement.appendChild(t),t.addEventListener("input",r,!1),t.focus(),t.dispatchEvent(n),t.removeEventListener("input",r,!1),docElement.removeChild(t)}catch(i){e=!1}return e}),Modernizr.addTest("formvalidation",function(){var e=createElement("form");if(!("checkValidity"in e&&"addEventListener"in e))return!1;if("reportValidity"in e)return!0;var t,n=!1;return Modernizr.formvalidationapi=!0,e.addEventListener("submit",function(e){(!window.opera||window.operamini)&&e.preventDefault(),e.stopPropagation()},!1),e.innerHTML='<input name="modTest" required="required" /><button></button>',testStyles("#modernizr form{position:absolute;top:-99999em}",function(r){r.appendChild(e),t=e.getElementsByTagName("input")[0],t.addEventListener("invalid",function(e){n=!0,e.preventDefault(),e.stopPropagation()},!1),Modernizr.formvalidationmessage=!!t.validationMessage,e.getElementsByTagName("button")[0].click()}),n});var mq=function(){var e=window.matchMedia||window.msMatchMedia;return e?function(t){var n=e(t);return n&&n.matches||!1}:function(e){var t=!1;return injectElementWithStyles("@media "+e+" { #modernizr { position: absolute; } }",function(e){t="absolute"==(window.getComputedStyle?window.getComputedStyle(e,null):e.currentStyle).position}),t}}();ModernizrProto.mq=mq,Modernizr.addTest("mediaqueries",mq("only all"));var mStyle={style:modElem.elem.style};Modernizr._q.unshift(function(){delete mStyle.style});var testProp=ModernizrProto.testProp=function(e,t,n){return testProps([e],undefined,t,n)};Modernizr.addTest("textshadow",testProp("textShadow","1px 1px")),ModernizrProto.testAllProps=testPropsAll;var prefixed=ModernizrProto.prefixed=function(e,t,n){return 0===e.indexOf("@")?atRule(e):(-1!=e.indexOf("-")&&(e=cssToDOM(e)),t?testPropsAll(e,t,n):testPropsAll(e,"pfx"))};Modernizr.addTest("pagevisibility",!!prefixed("hidden",document,!1)),Modernizr.addTest("performance",!!prefixed("performance",window)),Modernizr.addTest("requestanimationframe",!!prefixed("requestAnimationFrame",window),{aliases:["raf"]}),Modernizr.addTest("objectfit",!!prefixed("objectFit"),{aliases:["object-fit"]}),Modernizr.addTest("requestautocomplete",!!prefixed("requestAutocomplete",createElement("form"))),ModernizrProto.testAllProps=testAllProps,Modernizr.addTest("cssanimations",testAllProps("animationName","a",!0)),Modernizr.addTest("csspseudoanimations",function(){var e=!1;if(!Modernizr.cssanimations||!window.getComputedStyle)return e;var t=["@",Modernizr._prefixes.join("keyframes csspseudoanimations { from { font-size: 10px; } }@").replace(/\@$/,""),'#modernizr:before { content:" "; font-size:5px;',Modernizr._prefixes.join("animation:csspseudoanimations 1ms infinite;"),"}"].join("");return Modernizr.testStyles(t,function(t){e="10px"===window.getComputedStyle(t,":before").getPropertyValue("font-size")}),e}),Modernizr.addTest("backdropfilter",testAllProps("backdropFilter")),Modernizr.addTest("bgpositionxy",function(){return testAllProps("backgroundPositionX","3px",!0)&&testAllProps("backgroundPositionY","5px",!0)}),Modernizr.addTest("bgrepeatround",testAllProps("backgroundRepeat","round")),Modernizr.addTest("bgrepeatspace",testAllProps("backgroundRepeat","space")),Modernizr.addTest("backgroundsize",testAllProps("backgroundSize","100%",!0)),Modernizr.addTest("bgsizecover",testAllProps("backgroundSize","cover")),Modernizr.addTest("borderimage",testAllProps("borderImage","url() 1",!0)),Modernizr.addTest("borderradius",testAllProps("borderRadius","0px",!0)),Modernizr.addTest("boxshadow",testAllProps("boxShadow","1px 1px",!0)),Modernizr.addTest("boxsizing",testAllProps("boxSizing","border-box",!0)&&(document.documentMode===undefined||document.documentMode>7)),Modernizr.addTest("displayrunin",testAllProps("display","run-in"),{aliases:["display-runin"]}),Modernizr.addTest("ellipsis",testAllProps("textOverflow","ellipsis")),Modernizr.addTest("cssfilters",function(){if(Modernizr.supports)return testAllProps("filter","blur(2px)");var e=createElement("a");return e.style.cssText=prefixes.join("filter:blur(2px); "),!!e.style.length&&(document.documentMode===undefined||document.documentMode>9)}),Modernizr.addTest("flexbox",testAllProps("flexBasis","1px",!0)),Modernizr.addTest("flexboxlegacy",testAllProps("boxDirection","reverse",!0)),Modernizr.addTest("flexboxtweener",testAllProps("flexAlign","end",!0)),Modernizr.addTest("flexwrap",testAllProps("flexWrap","wrap",!0)),Modernizr.addTest("cssmask",testAllProps("maskRepeat","repeat-x",!0)),Modernizr.addTest("overflowscrolling",testAllProps("overflowScrolling","touch",!0)),Modernizr.addTest("cssresize",testAllProps("resize","both",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&testAllProps("transform","scale(1)",!0)}),Modernizr.addTest("csstransforms3d",function(){var e=!!testAllProps("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in docElement.style)){var n,r="#modernizr{width:0;height:0}";Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",testStyles(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),Modernizr.addTest("preserve3d",testAllProps("transformStyle","preserve-3d")),Modernizr.addTest("csstransitions",testAllProps("transition","all",!0)),Modernizr.addTest("csspseudotransitions",function(){var e=!1;if(!Modernizr.csstransitions||!window.getComputedStyle)return e;var t='#modernizr:before { content:" "; font-size:5px;'+Modernizr._prefixes.join("transition:0s 100s;")+"}#modernizr.trigger:before { font-size:10px; }";return Modernizr.testStyles(t,function(t){window.getComputedStyle(t,":before").getPropertyValue("font-size"),t.className+="trigger",e="5px"===window.getComputedStyle(t,":before").getPropertyValue("font-size")}),e}),testRunner(),setClasses(classes),delete ModernizrProto.addTest,delete ModernizrProto.addAsyncTest;for(var i=0;i<Modernizr._q.length;i++)Modernizr._q[i]();window.Modernizr=Modernizr}(window,document);