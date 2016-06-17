/**
 * Created by Administrator on 2015/8/12.
 */

//返回obj的style类型
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];//IE
    }
    else {
        return getComputedStyle(obj, null)[name];
    }
}

//运动函数
function starMove(obj, name, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var temp = 0;
        if (name == "opacity") {
            temp = Math.round(parseFloat(getStyle(obj, name)) * 100);//用parseFloat()处理小数,round四舍五入,避免小数位
        }
        else {
            temp = parseInt(getStyle(obj, name));//parseInt()处理整数，除了opacity都是整数
        }
        var speed = (target - temp) / 5;
        speed = (speed > 0) ? Math.ceil(speed) : Math.floor(speed);
        if (temp == target) {
            clearInterval(obj.timer);
        }
        else {
            if (name == "opacity") {
                obj.style.filter = "alpha(opacity = " + temp + speed + ")";//IE
                obj.style.opacity = (temp + speed) / 100;
            }
            else {
                obj.style[name] = temp + speed + "px";//注意加px
            }
        }
    }, 30);
}

//链式运动函数
function starMove2(obj, name, target, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var temp = 0;
        if (name == "opacity") {
            temp = Math.round(parseFloat(getStyle(obj, name)) * 100);//用parseFloat()处理小数,round四舍五入,避免小数位
        }
        else {
            temp = parseInt(getStyle(obj, name));//parseInt()处理整数，除了opacity都是整数
        }
        var speed = (target - temp) / 5;
        speed = (speed > 0) ? Math.ceil(speed) : Math.floor(speed);
        if (temp == target) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
        else {
            if (name == "opacity") {
                obj.style.filter = "alpha(opacity = " + temp + speed + ")";//IE
                obj.style.opacity = (temp + speed) / 100;
            }
            else {
                obj.style[name] = temp + speed + "px";//注意加px
            }
        }
    }, 30);
}

//json链式运动框架
function starMove3(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
                var allReady = false;
                for (var attr in json) {
                    var temp = 0;
                    if (attr == "opacity") {
                        temp = Math.round(parseFloat(getStyle(obj, attr)) * 100);//用parseFloat()处理小数,round四舍五入,避免小数位
            }
            else {
                temp = parseInt(getStyle(obj, attr));//parseInt()处理整数，除了opacity都是整数
            }
            var speed = (json[attr] - temp) / 5;
            speed = (speed > 0) ? Math.ceil(speed) : Math.floor(speed);
            if (temp == json[attr]) {
                allReady = true;
            }
            else {
                if (attr == "opacity") {
                    obj.style.filter = "alpha(opacity = " + temp + speed + ")";//IE
                    obj.style.opacity = (temp + speed) / 100;
                }
                else {
                    obj.style[attr] = temp + speed + "px";//注意加px
                }
            }
        }
        if (allReady) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    });
}

//动态ul添加内容
function addLi1() {
    var oUl1 = document.getElementById("ul1");
    var oUl2 = document.getElementById("ul2");
    for (var i = 0; i < 6; ++i) {
        var new_li_1 = document.createElement("li");
        new_li_1.innerHTML = '<img src="images/' + i + '.jpg">';
        oUl1.appendChild(new_li_1);
        var new_li_2 = document.createElement("li");
        new_li_2.innerHTML = '<img src="images/' + i + '.jpg">';
        oUl2.appendChild(new_li_2);
    }
    oUl1.childNodes[0].style.zIndex = "1";
    oUl2.innerHTML = oUl2.innerHTML + oUl2.innerHTML;
    oUl2.style.width = oUl2.childNodes[0].offsetWidth * oUl2.children.length + "px";//宽度撑起，注意加px
    oUl2.childNodes[0].style.opacity = "1";
    oUl2.childNodes[6].style.opacity = "1";
}

//静态ul添加内容
function addLi2() {
    var oUl1 = document.getElementById("ul1");
    var oUl2 = document.getElementById("ul2");
    for (var i = 0; i < 6; ++i) {
        var new_li_1 = document.createElement("li");
        new_li_1.innerHTML = '<img src="images/' + i + '.jpg">';
        oUl1.appendChild(new_li_1);
        var new_li_2 = document.createElement("li");
        new_li_2.innerHTML = '<img src="images/' + i + '.jpg">';
        oUl2.appendChild(new_li_2);
    }
    oUl1.childNodes[0].style.zIndex = "1";
    oUl2.style.width = oUl2.childNodes[0].offsetWidth * oUl2.children.length + "px";//宽度撑起，注意加px
    oUl2.childNodes[0].style.opacity = "1";
}

//移动ul
function ulMove(val, speed) {
    clearInterval(val.timer);
    val.timer = setInterval(function () {
        if (speed < 0 && val.offsetLeft < -val.offsetWidth / 2) {
            val.style.left = 0;
        }
        else if (speed > 0 && val.offsetLeft > 0) {
            val.style.left = -val.offsetWidth / 2 + "px";//注意加px
        }
        val.style.left = val.offsetLeft + speed + "px";//注意加px
    }, 30);
}

//获取鼠标坐标位置
function getMousePosition(ev) {
    var oEvent = ev || event;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    return {x: oEvent.clientX + scrollLeft, y: oEvent.clientY + scrollTop};
}

function getScrollPosition() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    return {x: scrollLeft, y: scrollTop};
}

//事件绑定
function myAddEvent(obj, ev, fn) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + ev, fn);
    }
    else {
        obj.addEventListener(ev, fn, false);
    }
}

//JQ显示div
function showDiv(div) {
    $(div).fadeIn();
}

//JQ隐藏div
function hideDiv(div) {
    $(div).fadeOut();
}

//拖拽函数
function tz(obj) {
    obj.onmousedown = function (ev) {
        var disX = getMousePosition(ev).x - obj.offsetLeft;
        var disY = getMousePosition(ev).y - obj.offsetTop;
        document.onmousemove = function (ev) {
            var l = getMousePosition(ev).x - disX;
            var t = getMousePosition(ev).y - disY;
            if (l < 0) {
                l = 0;
            }
            else if (l > document.documentElement.clientWidth - obj.offsetWidth) {
                l = document.documentElement.clientWidth - obj.offsetWidth;
            }
            if (t < 0) {
                t = 0;
            }
            else if (t > document.documentElement.clientHeight - obj.offsetHeight) {
                t = document.documentElement.clientHeight - obj.offsetHeight;
            }
            obj.style.left = l + "px";
            obj.style.top = t + "px";
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;//阻止默认行为
    };
}

//obj1在obj2的X轴拖拽
function tzX(obj1, obj2) {
    obj1.onmousedown = function (ev) {
        var disX = getMousePosition(ev).x - obj1.offsetLeft;
        document.onmousemove = function (ev) {
            var l = getMousePosition(ev).x - disX;
            if (l < 0) {
                l = 0;
            }
            else if (l > obj2.offsetWidth - obj1.offsetWidth) {
                l = obj2.offsetWidth - obj1.offsetWidth;
            }
            obj1.style.left = l + "px";
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;//阻止默认行为
    };
}

//obj1在obj2的Y轴拖拽
function tzY(obj1, obj2) {
    obj1.onmousedown = function (ev) {
        var disY = getMousePosition(ev).y - obj1.offsetTop;
        document.onmousemove = function (ev) {
            var t = getMousePosition(ev).y - disY;
            if (t < 0) {
                t = 0;
            }
            else if (t > obj2.offsetHeight - obj1.offsetHeight) {
                t = obj2.offsetHeight - obj1.offsetHeight;
            }
            obj1.style.top = t + "px";
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;//阻止默认行为
    };
}

//ajax
function loadXMLDoc(url, fnSuccess, fnFailed) {
    var xmlhttp = null;
    var txt, x, i;

    //创建ajax对象
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
    }
    //连接服务器
    xmlhttp.open("GET", url, true);
    //发送
    xmlhttp.send();
    //接受

    /*
     xmlhttp.onreadystatechange = function () {
     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     xmlDoc = xmlhttp.responseXML;
     txt = "";
     x = xmlDoc.getElementsByTagName("title");
     for (i = 0; i < x.length; i++) {
     txt = txt + x[i].childNodes[0].nodeValue + "<br/>";
     }
     document.getElementById("myDiv").innerHTML = txt;//将获取的数据显示到指定的位置
     }
     else {
     }
     }
     */
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                fnSuccess(xmlhttp.responseText);//responseText为返回数据
            }
            else {
                if (fnFailed) {
                    fnFailed(xmlhttp.status);
                }
            }
        }
    }
}

//拖拽函数的面向对象
function Drag(id) {
    var _this = this;
    this.oDiv = document.getElementById(id);
    this.oDiv.onmousedown = function (ev) {
        _this.fnDown(ev);
        //阻止默认事件
        return false;
    };
}

Drag.prototype.fnDown = function (ev) {
    var _this = this;
    this.disX = getMousePosition(ev).x - this.oDiv.offsetLeft;
    this.disY = getMousePosition(ev).y - this.oDiv.offsetTop;
    document.onmousemove = function (ev) {
        _this.fnMove(ev);
    };
    document.onmouseup = function () {
        _this.fnUp();
    };
};

Drag.prototype.fnMove = function (ev) {
    var l = getMousePosition(ev).x - this.disX;
    var t = getMousePosition(ev).y - this.disY;
    this.oDiv.style.left = l + "px";
    this.oDiv.style.top = t + "px";
};

Drag.prototype.fnUp = function () {
    document.onmousemove = null;
    document.onmouseup = null;
};

//拖拽函数继承属性
function Drag2(id) {
    Drag.call(this, id);
}

for (var i in Drag.prototype) {
    Drag2.prototype[i] = Drag.prototype[i];
}

Drag2.prototype.fnMove = function (ev) {
    var l = getMousePosition(ev).x - this.disX;
    var t = getMousePosition(ev).y - this.disY;
    if (l < 0) {
        l = 0;
    }
    else if (l > document.documentElement.clientWidth - this.oDiv.offsetWidth) {
        l = document.documentElement.clientWidth - this.oDiv.offsetWidth;
    }
    if (t < 0) {
        t = 0;
    }
    else if (t > document.documentElement.clientHeight - this.oDiv.offsetHeight) {
        t = document.documentElement.clientHeight - this.oDiv.offsetHeight;
    }
    this.oDiv.style.left = l + "px";
    this.oDiv.style.top = t + "px";
};

//cookie
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + "=" + value + ";expires=" + oDate;
}

/*
 function setCookie(c_name,value,expiredays)
 {
 var exdate=new Date()
 exdate.setDate(exdate.getDate()+expiredays)
 document.cookie=c_name+ "=" +escape(value)+
 ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
 }
 */

function getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; ++i) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return "";
}

/*
 function getCookie(c_name)
 {
 if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=")
 if (c_start!=-1)
 {
 c_start=c_start + c_name.length+1
 c_end=document.cookie.indexOf(";",c_start)
 if (c_end==-1) c_end=document.cookie.length
 return unescape(document.cookie.substring(c_start,c_end))
 }
 }
 return ""
 }
 */

function removeCookie(name) {
    setCookie(name, "null", -1);
}

function checkCookie() {
    $("#recom,#group").click(function () {
        var token = getCookie('token');
        var is_agent = getCookie('is_agent');
        if (token == null || token == '') {
            location.href = "login.html?ref=" + $(this).attr("href");
            $(this).removeAttr("href");
        }
        var sPoshref = $(this).attr("href");
        var ilen = sPoshref.lastIndexOf("?");
        var subhref = sPoshref.substring(0, ilen);
        if (is_agent == 1 && subhref == "tuijian_1.html") {
            location.href = "tuijian_3.html?hid=" + getUrlParam("id");
            $(this).removeAttr("href");
        }
    });
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //???ì??????????±ê?????????ò±í???????ó
    var r = window.location.search.substr(1).match(reg);  //??????±ê????
    if (r != null)
        return unescape(r[2]);
    return null; //·?????????
}
function isCookie() {
    var sUrl = location.href;
    var s = sUrl.lastIndexOf("/");
    var subUrl = sUrl.substring(s + 1);
    var x = sUrl.lastIndexOf("?");
    var xUrl = sUrl.substring(s + 1, x);
    var token = getCookie('token');
    var is_agent = getCookie('is_agent');
    if (token == null || token == '') {
        location.href = "login.html?ref=" + subUrl;
    }
    if (is_agent == 1 && xUrl == "tuijian_1.html") {

        location.href = "tuijian_3.html?hid=" + getUrlParam("hid");
        $(this).removeAttr("href");
    }

    if ((is_agent == null || is_agent == '') && (xUrl == "tuijian_3.html" || xUrl == "tuijian_2.html")) {
        location.href = "tuijian_1.html?hid=" + getUrlParam("hid");
    }
}