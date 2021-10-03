// Controls whether the window is hidden or displayed
function Displaying(Did) {
  var qrcodeId = document.getElementById(Did);
  if(qrcodeId.style.display == "none") {
    qrcodeId.style.display = "block";
  } else {
    qrcodeId.style.display = "none";
  }
}

//add stylesheet code
function loadCssCode(code, h_document){
  var d = arguments[1] || document;
  var attribute = {'type': 'text/css', 'rel': 'stylesheet'};
  loadCode(d, 'style', attribute, 'head', code);
}

//add code
//loadCode(document, 'SCRIPT', [{n:v}..], 'body')
function loadCode(d, element, attribute, scope, content){
  var Tags = d.createElement(element);
  for (var n in attribute) {
   Tags.setAttribute(n, attribute[n]);
  }
  if (content) {
    Tags.appendChild(d.createTextNode(content));
  }
  if (scope == "head") {
    d.getElementsByTagName("HEAD")[0].appendChild(Tags);
  } else {
    d.body.appendChild(Tags);
  }
}

//open new window
function OpenBox(open_url, open_width, open_height, name_height) {
  var width = arguments[1] || 420;
  var height = arguments[2] || 360;
  var name = arguments[3] || "_seif"; //当前窗口 _parent 父窗口 _blank默认
  var iTop = (window.screen.availHeight - 30 - height) / 2; //获得窗口的垂直位置;
  var iLeft = (window.screen.availWidth - 10 - width) / 2; //获得窗口的水平位置;
  return window.open(open_url, name, "alwaysRaised=yes, dependent=yes, location=no, top=" + iTop + ",left=" + iLeft + ", toolbar=no, directories=no, titlebar=yes, menubar=no, scrollbars=no, status=no, resizable=yes, copyhistory=no, width=" + width + ", height=" + height + "");
}

//sina weibo undefined
function DocumentInfo() {
  var d = document;
  var e = encodeURIComponent; //encode URL
  var img = d.getElementById("content_string").getElementsByTagName("img");
  if ( img.length != 0  && typeof img[0].src != "undefined" ) {
    this.image = e(img[0].src);
  } else {
    this.image = null;
  }
  var meta = d.getElementsByTagName('meta');
  this.description = null;
  for ( i in meta ) {
    if ( typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") {
      this.description = meta[i].content;
    }
  }
  this.url = d.URL;
  this.domain = d.domain;
  this.cookie = d.cookie;
  this.referrer = d.referrer;
  this.lastModified = d.lastModified
  this.href = e(d.location.href);
  this.title = e(d.title.replace(' - Yakeing Blog',''));
}

//Tencent qq or qzone
function TencentBox(n) {
  var info = new DocumentInfo();
  var name = arguments[0] || 'QQ';
  if ( name == 'QQ') {
    var u = "https://connect.qq.com/widget/shareqq/index.html"
  } else {
    var u = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
  }
  var url = [u, '?url=', info.href, '&pics=', info.image, '&title=', info.title, '&summary=', info.description, '&desc=', info.title, '&site=Yakeing%20Blog'].join('');
  if (/Firefox/.test(navigator.userAgent)) { setTimeout("OpenBox(url, 723, 596)", 0) } else { OpenBox(url, 723, 596) }
}

//Sina weibo
function WeiboBox() {
  var info = new DocumentInfo();
  var url = ['https://service.weibo.com/share/share.php?url=', info.href, '&pic=', info.image, '&title=', info.title, '&appkey=3818214747'].join('');
  if (/Firefox/.test(navigator.userAgent)) { setTimeout("OpenBox(url, 642, 347)", 0) } else { OpenBox(url, 642, 347) }
}

//twitter
function TwitterBox() {
  var info = new DocumentInfo();
  var url = ['https://twitter.com/intent/tweet?url=', info.href, '&text=', info.title].join('');
  if (/Firefox/.test(navigator.userAgent)) { setTimeout("OpenBox(url, 642, 347)", 0) } else { OpenBox(url, 642, 347) }
}

//purge Jsdelivr Cache
//yakeing/Documentation@master/images/
function purgeJsdelivrCache(fileUrl) {
  var db = {};
  var url = ['https://purge.jsdelivr.net/gh/', fileUrl].join('');
  var css = "body{background-color:#eee;margin:0; font-size:16px; color:#6a737d;} html,body{height:auto;} div{padding:5px; border-bottom:1px dashed #9e9e9e;} span{color:#ff5722; padding: 0 6px;}";
  if (/Firefox/.test(navigator.userAgent)) { setTimeout("var id = OpenBox('', 600, 300)", 0) } else { var id = OpenBox('', 600, 300) }
  var d = id.document;
  loadCssCode(css, d);
  d.title = "正在清除缓存...";
  d.body.innerHTML = "<div>正在更新服务器缓存...</div>";
  var res_function = function(res, status) {
      var title = "CDN服务代码：", HTML = "";
    if( status != 200){
      d.title += status ;
      d.body.innerHTML = res;
    } else {
      res = JSON.parse(res);
      if ( typeof d == "object" && typeof res == "object") {
        title += res.maxcdn.code;
        for (var i = res.fastly.length - 1; i >= 0; i--) {
        HTML += "<div>服务器ID:<span>"+res.fastly[i].id+"</span>状态:<span>"+res.fastly[i].status+"</span></div>";
        }
      } else {
        title += "数据故障";
        HTML = "<div>CDN服务:<span>接收数据错误</span>或<span>传递document错误</span></div>";
      }
    }
    d.title = title;
    d.body.innerHTML = HTML;
    return 1;
  }
  var ARGUMENTS = {URL:url, RES_FUNCTION:res_function, HEADER:{'Content-type':'application/json;charset=UTF-8'}};
  Http(ARGUMENTS);
}

//OPTIONS, GET, PUT, POST, DELETE
function Http(ARGUMENTS) {
  var ARG ={}, res;
  var DefaultArg = {
    ASYNC : ["[object Boolean]", true],
    DATA : ["[object String]", null],
    //DOWNLOAD_FUNCTION : ["[object Function]", function(){}],
    HEADER : ["[object Object]", {'Content-type':'application/x-www-form-urlencoded;charset=UTF-8'}],
    METHOD: ["[object String]", 'GET'],
    PASSWORD : ["[object String]", undefined],
    RES_FUNCTION : ["[object Function]", function(){}],
    TIMEOUT : ["[object Number]", 0],
    //UP_FUNCTION : ["[object Function]", function(){}],
    URL : ["[object String]", undefined],
    USERNAME : ["[object String]", undefined],
    WITHCREDENTIALS : ["[object Boolean]", false]
  };
  for(var k in DefaultArg) {
    if (Object.prototype.toString.call(ARGUMENTS[k]) === DefaultArg[k][0]) {
      ARG[k] = ARGUMENTS[k];
    } else {
      ARG[k] = DefaultArg[k][1];
    }
  }
  console.log('1.sendData', ARG);
  try{
    var xhr = new XMLHttpRequest();
  }catch(e){
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open(ARG.METHOD, ARG.URL, ARG.ASYNC, ARG.USERNAME, ARG.PASSWORD);
  for(var n in ARG.HEADER) {
    xhr.setRequestHeader(n, ARG.HEADER[n]);
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      //console.log('ResponseHeaders:', xhr.getAllResponseHeaders());
      //getResponseHeader responseURL responseType statusText
      //response responseXML
      console.log('2.receiveData:', xhr.responseText);
      ARG.RES_FUNCTION(xhr.responseText, xhr.status);
    }
  };
  xhr.timeout = ARG.TIMEOUT;
  xhr.withCredentials = ARG.WITHCREDENTIALS; //cookie
  //xhr.upload.οnprοgress = UP_FUNCTION; //loaded total
  //xhr.οnprοgress = DOWNLOAD_FUNCTION; //loaded total
  xhr.send(ARG.DATA);
  //xhr.abort(); //stop
}

//console Log Code
//[[content,color]] #606060 #1475b2 #42c02e
function consoleLogCode(dataArr){
  var only = "border-radius: 3px; ";
  var first = "border-radius: 3px 0 0 3px; ";
  var last = "border-radius: 0 3px 3px 0; ";
  var ColorRE = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$");
  if ((!Array.isArray && Object.prototype.toString.call(dataArr) === '[object Array]') || Array.isArray(dataArr)) {
    var style = [], content = [], len = dataArr.length;
    for (var i = 0; i < len; i++) {
      if ( typeof dataArr[i][0] != "undefined" && typeof dataArr[i][1] != "undefined" ) {
        var css = [];
        if (0 == len-1) {
          css.push(only);
        } else if (i == 0) {
          css.push(first);
        } else if (i == len-1) {
          css.push(last);
        }
        if ( !ColorRE.test(dataArr[i][1]) ) {
          console.error("ERROR: "+dataArr[i].join(","));
          return false;
        }
        content.push("%c ", dataArr[i][0], " ");
        css.push("padding: 1px; color: #fff; background: ", dataArr[i][1], ";");
        style.push(css.join(""));
      } else {
        console.error("ERROR: "+dataArr.join(","));
        return false;
      }
    }
    style.unshift(content.join(""));
    //console.log.apply(void 0, style);
    var oup = function() {
      var e;
      window.console && "function" === typeof window.console.log && (e = console).log.apply(e, arguments)
    }.apply(void 0, style);
  } else {
    console.error("ERROR: Parameter error!");
  }
}

//---------------------------
//This is the page UI
(function (window, document) {

  var layout   = document.getElementById('layout'),
    menu   = document.getElementById('menu'),
    menuLink = document.getElementById('menuLink'),
    content  = document.getElementById('main');

  function toggleClass(element, className) {
    var classes = element.className.split(/\s+/),
      length = classes.length,
      i = 0;

    for(; i < length; i++) {
      if (classes[i] === className) {
      classes.splice(i, 1);
      break;
      }
    }
    // The className is not found
    if (length === classes.length) {
      classes.push(className);
    }

    element.className = classes.join(' ');
  }

  function toggleAll(e) {
    var active = 'active';

    e.preventDefault();
    toggleClass(layout, active);
    toggleClass(menu, active);
    toggleClass(menuLink, active);
  }

  menuLink.onclick = function (e) {
    toggleAll(e);
  };

  content.onclick = function(e) {
    if (menu.className.indexOf('active') !== -1) {
      toggleAll(e);
    }
  };

}(this, this.document));
