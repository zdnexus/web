/**
 * Native 接口定义文件使用说明：
 *
 * 1.JS 端统一使用 Hyperion._call(methodName, options, callback) 调用 Native API
 * 其中 callback 统一接受 [status, data] 参数
 *      status 代表调用具体 API 的状态，0-成功，1-失败
 *      data   代表调用具体 API 的回传数据（可选，因为某些 API 的调用不需要回传数据）
 * 例1：Hyperion.call('request', {
 *          url: 'http://xxx.com',
 *          type: 'POST',
 *          data: {
 *              param1: '111',
 *              param2: '222'
 *          },
 *          success: function(){},
 *          error: function(){}
 *    }, function(status, data){});
 * PS: 此时 callback 的返回仅仅是对 request API 调用成功与否的确认
 *     此时 status 表示成功与否，data 可不传（因为该调用的同步周期不需要返回什么值）
 *     请求状态的确认由 success 和 error 承担
 *     所以此时的 callback 方法可有可无
 *
 * 例2：Hyperion.call('scanQrcode', function(status, data){});
 * PS: 此时 callback 的返回是对 scanQrcode API 调用成功与否的确认，data 即为扫描返回的内容，必传
 *
 *
 * 2.Native 端统一使用 Hyperion._callback(callbackMethodName, status, data) 回调 JS 端
 *   status 和 data 对应调用时设定的 callback 接受的参数
 */

var Hyperion = require('./hyperion.adapter.js');
var noop = function() {};
var isAndroid = /android/i.test(navigator.userAgent);
var defaultClose = function() {
    Hyperion.actions.close();
};
var defaultBack = function() {
    Hyperion.actions.back();
};
var pagePath = location.href.split('?')[0];

Hyperion.ready = function(cb) {
    // 如果注入在调用之前，直接调用
    // if (Hyperion.injected) {
    setTimeout(function() {
        cb && cb();
    }, 300);

    //     Hyperion.injected = true;
    //     return;
    // }

    // // 如果注入在调用之后，监听 HyperionReady 事件
    // window.addEventListener('HyperionReady', function() {
    //     if (!Hyperion.injected) {
    //         cb && cb();
    //     }
    // });
};

function stripFirstParma(fn) {
    return function(a, b) {
        fn(b);
    };
};

// 页面返回执行的回调
Hyperion.eventListener = {
    onBack: function() {},
    onAppear: function() {}
};

Hyperion.actions = {
    /**
     * 发送请求
     * @options {Object} 参数例子：
     *      {
     *          url: '/path1/path2/path3' // 请求地址
     *          type: 'GET', // 请求方式，默认get
     *          data: {}, // JSON对象 请求入参
     *          success: function(res){}, // 请求成功处理
     *          error: function(res){} // 请求失败处理
     *      }
     * @callback {Function} 回调函数（可选）
     */

    request: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var url = options.url || '',
            type = /^post$/i.test(options.type) ? 'POST' : 'GET',
            data = options.data || {};
        var success = options.success ? stripFirstParma(options.success) : noop;
        var error = options.error ? stripFirstParma(options.error) : noop;
        Hyperion._call('request', url, type, data, success, error, callback);
    },

    /**
     * 发送 GET 请求
     * @options {Object} 参数
     * @callback {Function} 回调函数（可选）
     */
    get: function(options, callback) {
        options = options || {};
        options.type = 'GET';

        Hyperion.actions.request(options, callback);
    },

    /**
     * 发送 POST 请求
     * @options {Object} 参数
     * @callback {Function} 回调函数（可选）
     */
    post: function(options, callback) {
        options = options || {};
        options.type = 'POST';

        Hyperion.actions.request(options, callback);
    },

    /**
     * webView 页面前进（本地页面 或 线上页面）
     * @options {Object} 参数例子：
     *      {
     *          title: '', // 跳转页面的标题
     *          url: '', // 跳转页面的链接
     *          type: '', // 跳转页面的类型 local-离线页面（默认） | internal-线上页面 | native 调用本地模块 app://ff/xxx
     *          hasHeader: false, // // 跳转页面需不需要顶部 header，默认为 true
     *          data: { // query string data
     *              param1: 1,
     *              param2: 2
     *          }
     *      }
     * @callback {Function} 回调函数（可选）
     */
    forward: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var title = options.title || '',
            url = options.url || '',
            type = options.type || 'local',
            data = options.data || {},
            hasHeader = options.hasHeader === undefined ? true : options.hasHeader;

        if (type === 'internal') {
            url = FCONFIG.api.host + url;
        }

        Hyperion._call('forward', title, url, type, data, hasHeader, callback);
    },
    /**
     * 注册native事件
     * @options {object} 参数
     *    {
     *       eventName 事件名
     *       eventHandler  事件处理方法
     *    }
     * @callback {Function} 回调函数（可选）
     */
    registNativeEvent: function(options, callback) {
        var eventName = options.eventName || '',
            eventHandler = options.eventHandler || noop;
        Hyperion._call('registNativeEvent', eventName, eventHandler, callback || noop);
    },
    /**
     * 移除native事件
     * @options {object} 参数
     *    {
     *       eventName 事件名
     *       eventHandler  事件处理方法
     *    }
     * @callback {Function} 回调函数（可选）
     */
    removeNativeEvent: function(options, callback) {
        var eventName = options.eventName || '',
            eventHandler = options.eventHandler || noop;
        Hyperion._call('registNativeEvent', eventName, eventHandler, callback || noop);
    },
    /**
     * 通知native事件
     * @options {object} 参数
     *    {
     *       eventName 事件名
     *       data  事件参数
     *    }
     * @callback {Function} 回调函数（可选）
     */
    notifyNativeEvent: function(options, callback) {
        var eventName = options.eventName || '',
            data = options.data || {};
        Hyperion._call('notifyNativeEvent', eventName, JSON.stringify(data), callback || noop);
    },
    /**
     * webView 页面后退
     * @options {Object} 参数例子：
     *      {
     *          url: '', // 跳转页面的链接
     *      }
     * @callback {Function} 回调函数（可选）
     */
    back: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var url = options.url || '',
            data = options.data || {};

        Hyperion._call('back', url, data, callback);
    },
    /**
    * webView 回到主模块
    * @options {Object} 参数例子：
    *      {
    *          url: '', // 未用到
               data: '' // 传入onBack中的data
    *      }
    * @callback {Function} 回调函数（可选）
    */
    close: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var url = options.url || '',
            data = options.data || '';

        Hyperion._call('close', callback, url, data);
    },

    /**
     * @options {Object} 参数例子：
     *      {
     *          title: '标题', // 头部标题
     *          isBack: true, // 是否有返回按钮
     *          backCallback: function(){}, // 返回回调
     *          isClose: true, // 是否有关闭按钮
     *          closeCallback: function(){} // 关闭回调
     *      }
     * @callback {Function} 回调函数（可选）
     */
    setHeader: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var title = options.title || '',
            isBack = options.isBack === undefined ? true : !!options.isBack,
            backCallback = options.backCallback || defaultBack,
            isClose = options.isClose === undefined ? false : !!options.isClose,
            closeCallback = options.closeCallback || defaultClose;
        Hyperion._call('setHeader', title, isBack, backCallback, isClose, closeCallback, callback);
    },

    /**
     * @options {Object} 参数例子：
     *      {
     *          publicKey: 'dsagdjhasgdkj21312136ds', // 公钥
     *          data: 'text' // 关闭回调
     *          timestamp:'2015000030303' //时间戳
     *      }
     * @callback {Function} 回调函数，返回加密后的数据 function(status, data){}
     */
    getEncodedPSW: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var publicKey = options.publicKey || '',
            data = options.data || '',
            timeStamp = options.timeStamp;

        Hyperion._call('getEncodedPSW', publicKey, data, timeStamp, callback);
    },
    

    /**
     * @options {Object} 参数例子：
     *      {
     *          text: 'text', // 文案
     *          type: 'info' // 类型：info | warning | error | success
     *      }
     * @callback {Function} 回调函数（可选）
     */
    showToast: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var text = options.text || '',
            type = options.type || 'info';

        Hyperion._call('showToast', text, type, callback);
    },

    /**
     * @callback {Function} 回调函数（可选）
     */
    hideToast: function(callback) {
        callback = callback || noop;

        Hyperion._call('hideToast', callback);
    },

    /**
     * 页面消失时调用，用于登录页面点击返回或者进行跳转页面时候告诉 Native 需要
     * @callback {Function} 回调函数（可选）
     */
    viewDisappear: function(callback) {
        callback = callback || noop;

        Hyperion._call('viewDisappear', callback);
    },

    /**
     * 显示加载动画
     * @options {Object} 参数例子：
     *      {
     *          isCancel: true, // 是否允许取消加载动画
     *          msg: 'text', // 当不允许取消加载动画时的提示信息
     *          type: 'local' // 加载动画类型，local-自身 App 或 ''-任意门
     *      }
     * @callback {Function} 回调函数（可选）
     */
    loadingBegin: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var isCancel = options.isCancel === undefined ? true : !!options.isCancel,
            msg = options.msg || '',
            type = options.type || 'local';

        Hyperion._call('loadingBegin', isCancel, msg, type, callback);
    },

    /**
     * 关闭加载动画
     * @options {Object} 参数例子：
     *      {
     *          type: 'local' // 加载动画类型，local-自身 App 或 ''-任意门
     *      }
     * @callback {Function} 回调函数（可选）
     */
    loadingFinish: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var type = options.type || 'local';

        Hyperion._call('loadingFinish', type, callback);
    },

    /**
     * 弱提示
     * @options {Object} 参数例子：
     *      {
     *          text: 'text', // 提示文案
     *          time: 2000 // 提示持续时间（ms）
     *      }
     * @callback {Function} 回调函数（可选）
     */
    tip: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var text = options.text || '',
            time = options.time || 3500;

        Hyperion._call('tip', text, time, callback);
    },

    /**
     * 强提示
     * @options {Object} 参数例子：
     *      {
     *          text: 'text', // 对话框文案
     *          btnText: 'btn-text', // 按钮文字
     *          btnCallback: function(){}
     *      }
     * @callback {Function} 回调函数（可选）
     */
    alert: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var text = options.text || '',
            btnText = options.btnText || '',
            btnCallback = options.btnCallback || noop;
        pagePath = isAndroid ? pagePath : location.href;

        Hyperion._call('alert', pagePath, text, btnText, btnCallback, callback);
    },

    /**
     * 确认信息
     * @options {Object} 参数例子：
     *      {
     *          text: 'text', // 确认框文案
     *          leftBtnText: 'text', // 左按钮文案
     *          leftBtnCallback: function(){}, // 左按钮点击回调函数
     *          rightBtnText: 'text', // 左按钮文案
     *          rightBtnCallback: function(){} // 左按钮点击回调函数
     *      }
     * @callback {Function} 回调函数（可选）
     */
    confirm: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var text = options.text || '',
            leftBtnText = options.leftBtnText || '',
            leftBtnCallback = options.leftBtnCallback || noop,
            rightBtnText = options.rightBtnText || '',
            rightBtnCallback = options.rightBtnCallback || noop;
        pagePath = isAndroid ? pagePath : location.href;

        Hyperion._call('confirm', pagePath, text, leftBtnText, leftBtnCallback, rightBtnText, rightBtnCallback, callback);
    },

    /**
     * 提示信息
     * @options {Object} 参数例子：
     *      {
     *          topText: 'text', // 上部文案
     *          bottomText: 'text', // 下部文案
     *          close: true, // 是否有关闭按钮
     *          openCallback: function(){}, // 打开动作的回调
     *          closeCallback: function(){} // 关闭按钮的回调
     *      }
     * @callback {Function} 回调函数（可选）
     */
    prompt: function(options, callback) {
        options = options || {};
        callback = callback || noop;

        var topText = options.topText || '',
            bottomText = options.bottomText || '',
            close = options.close === undefined ? true : !!options.close,
            openCallback = options.openCallback || noop,
            closeCallback = options.closeCallback || noop;
        pagePath = isAndroid ? pagePath : location.href;

        Hyperion._call('prompt', topText, bottomText, close, openCallback, closeCallback, callback);
    },


    /**
     * 获取设备信息
     * @callback {Function} 回调函数
     */
    getDeviceInfo: function(callback) {
        callback = callback || noop;

        Hyperion._call('getDeviceInfo', callback);
    },

    /*
     * 获取 app 版本信息
     * @callback {Function} 回调函数（可选）{
     *           appVersion: '1.0.0',
     *           appNewVersion: '2.0.1' // 如果有版本更新，则显示最新版本号，如果没有则不显示，IOS不需要展示个，IOS这个值返回可以为空。
     *       }
     */
    getAppVersion: function(callback) {
        callback = callback || noop;
        Hyperion._call("appVersion", callback);
    },

    /**
     * 获取经纬度 {longitude: '', latitude: ''}
     * @callback {Function} 回调函数
     */
    getLocation: function(callback) {
        callback = callback || noop;

        Hyperion._call("getLocation", callback);
    },
    /*
     * 获取 app 版本信息
     * @callback {Function} 回调函数（可选）{
     *    version: '1.0.0', //当前版本号
     *    deviceID:"设备号",
     *    h5Version:"10", //资源版本号
     *    bankID:"1002", //银行ID
     *    NewVersion: '2.0.1' // 如果有版本更新，则显示最新版本号，如果没有则不显示，IOS不需要展示个，IOS这个值返回可以为空。
     * }
     */
    appInfo: function(callback) {
        callback = callback || noop;
        Hyperion._call("appInfo", callback);
    },
    /*
     *   share 分享活动
     *   options :data{}
     *   data:{
     *      "title": "",
     *      "desc": "",
     *      "url" : "",
     *      "imageUrl" : "",
     *      "sharePlatform": [0,1] // 需要分享的平台类型 [0,1,2,3,4,5,6]，分别表示微信好友，微信朋友圈，QQ，QQ空间，天下通，微博，复制链接
     *   }
     * callback(data)
     * data{
     *   "name":"wechat",//wechat微信朋友圈 wechatFriend 微信朋友,weibo//新浪微博,qqSpace qq空间,qqFrined //qq好友,copyLink //复制链接
     *   "status" true
     * }
     */
    share: function(options, callback) {
        var callback = callback || noop;
        Hyperion._call("share", JSON.stringify(options.data), callback);
    },
    /**
     * 监听用户操作数据
     * @param eventId 事件分类
     * @param eventLable事件 事件类型细分
     * @constructor
     */
    onEvent: function(options, callback) {
        var callback = callback || noop;
        var eventId = options.eventId || "";
        var eventLable = options.eventLable || "";
        var data = options.data || "";
        Hyperion._call("onEvent", eventId, eventLable, JSON.stringify(data), callback);
    },
    /**
     * 关闭密码键盘
     */
    hideSysKeyboard: function(callback) {
        callback = callback || noop;
        Hyperion._call('hideSysKeyboard', callback);
    },
    /**
     * 关闭密码键盘
     */
    closeKeyboard: function(callback) {
        var callback = callback || noop;
        Hyperion._call('closeKeyboard', callback);
    },
    /**
     * 调用密码键盘
     * @param options {keyPressCallback:function(){},completeCallback:function(){}}
     * .keyPressCallback 函数 输入时回调
     * .completeCallback 函数 完成时回调
     * .type {
     * 1、默认全键盘
     * 2、默认数字键盘，字母不可选
     * 3、默认数字键盘、可以选择字母
     * }
     * .data:{
     *  defaultValue:"", 字符串 设置默认值
     *  maxLength:30 //默认最大长度
     * }
     */

    keyboard: function(options, callback) {
        var callback = callback || noop;
        var keyPressCallback = options.keyPressCallback || noop;
        var completeCallback = options.completeCallback || noop;
        var c_keyPressCallback = function(status, value) {
                keyPressCallback(value);
            },
            c_completeCallback = function(status, value) {
                completeCallback(value);
            };
        //Hyperion.actions.hideSysKeyboard();
        if (!options.data) {
            options.data = {
                maxLength: 40
            }
            options.data.defaultValue = "";
        }
        var params = JSON.stringify(options.params || "");
        Hyperion._call('keyboard', (options.type || "1") + "", params, c_keyPressCallback, c_completeCallback, callback);
    },
    /**
     * 关闭密码键盘
     */
    closeKeyboard: function(callback) {
        var callback = callback || noop;
        Hyperion._call('closeKeyboard', callback);
    },

    /** 本地存储信息
     * 获取本地数据
     * @param options
     * @param options.params:{ //入参
     * type:"temp" temp临时存储 / long永久存储 默认temp
     * Method :"get"  get获取/set设置/remove移除 默认get ,clear清除表所有数据
     * }

     * data:[
     * {
     *   name:"userInfo",
     *   value:'value'
     * },
     * {
     *   name:"usertype",
     *   value:'value'
     * }]
     *  //存储数据名称列表。 get
     *
     * get 回调函数


     * callback(status,data):
     * data:[
     * {
     *   name:"userinfo",
     *   value:'value'
     * },
     * {
     *   name:"usertype",
     *   value:'value'
     * }]

     * //存储数据名称列表。
     */

    localData: function(options) {
        var options = options || "";
        var opts = {};
        opts.params = {};
        opts.params.type = options.type || "temp";
        opts.params.method = options.method || "set";
        var name = options.name,
            value = options.value;
        var callback = callback || noop;
        var data = [];
        var optsCallback = opts.callback = options.callback || noop;
        if (name !== undefined) {
            var arrObj = {
                "name": name,
                "value": value
            };
            data.push(arrObj);
            data = JSON.stringify(data);
        } else {
            data = JSON.stringify((options.data || []));
        }
        //console.log(data);
        var params = opts.params || "";
        if (opts.params.method === "get") {
            var optsGetCallback = function(status, value) {
                try {
                    value = JSON.parse(value);
                } catch (e) {}
                if (value && typeof value === "object" && value.constructor === Array && value.length === 1) {
                    value = value[0];
                    try {
                        value = JSON.parse(value);
                    } catch (e) {}
                    value = value.value;
                    try {
                        value = JSON.parse(value);
                    } catch (e) {}
                    try {
                        value = JSON.parse(value);
                    } catch (e) {}
                }
                optsCallback(status, value);
            }
            Hyperion._call('localData', JSON.stringify(params), data, optsGetCallback);
        } else {
            Hyperion._call('localData', JSON.stringify(params), data, optsCallback);
        }
    },
    /**
     * 存储本地数据
     * @options {Object} 参数例子：
     *      {
     *          name: 'key', // 数据的 key
     *          value: data, // 数据（格式根据具体业务）
     *      }
     * @callback {Function} 回调函数（可选）
     */
    setData: function(options, callback) {
        var options = options || {};
        options.method = "set";
        options.callback = options.callback || callback || noop;
        Hyperion.actions.localData(options);
    },

    /**
     * 获取本地数据
     * @key {String} 数据的 key
     * @callback {Function} 回调函数
     */
    getData: function(options, callback) {
        var opts = {};
        if (typeof options === "string") {
            opts.name = options;
            opts.callback = callback;
        } else {
            opts = options || {};
        }
        opts.method = "get";
        opts.callback = opts.callback || callback || noop;
        Hyperion.actions.localData(opts);
    },
    /**
     * 移除数据
     * @options {Object} 参数例子：
     *      {
     *          name: 'key', // 数据的 key
     *      }
     * @callback {Function} 回调函数
     */
    removeData: function(options, callback) {
        var opts = {};
        if (typeof options === "string") {
            opts.name = options;
            opts.callback = callback;
        } else {
            opts = options || {};
        }
        opts.method = "remove";
        opts.callback = opts.callback || callback || noop;
        Hyperion.actions.localData(opts);
    },

    /**
     * 清空数据
     * @callback {Function} 回调函数（可选）
     */
    clearData: function(options, callback) {
        var options = options || {};
        options.method = "clear";
        options.callback = options.callback || callback || noop;
        Hyperion.actions.localData(options);
    },
    /**
     * 存储本地数据
     * @options {Object} 参数例子：
     *      {
     *          name: 'key', // 数据的 key
     *          value: data, // 数据（格式根据具体业务）
     *      }
     * @callback {Function} 回调函数（可选）
     */
    setLocalData: function(options, callback) {
        var options = options || {};
        options.type = "long";
        options.method = "set";
        options.callback = options.callback || callback || noop;
        Hyperion.actions.localData(options);
    },
    /**
     * 获取本地数据
     * @options {Object} 参数例子：
     *      {
     *          name: 'key', // 数据的 key
     *      }
     * @callback {Function} 回调函数
     */
    getLocalData: function(options, callback) {
        var opts = {};
        if (typeof options === "string") {
            opts.name = options;
            opts.callback = callback;
        } else {
            opts = options || {};
        }
        opts.type = "long";
        opts.method = "long";
        opts.callback = opts.callback || callback || noop;
        Hyperion.actions.localData(opts);
    },
    /**
     * 移除本地数据
     * @options {Object} 参数例子：
     *      {
     *          name: 'key', // 数据的 key
     *      }
     * @callback {Function} 回调函数（可选）
     */
    removeLocalData: function(options, callback) {
        var opts = {};
        if (typeof options === "string") {
            opts.name = options;
            opts.callback = callback;
        } else {
            opts = options || {};
        }
        opts.type = "long";
        opts.method = "remove";
        opts.callback = opts.callback || callback || noop;
        Hyperion.actions.localData(opts);
    },

    /**
     * 清空本地数据
     * @callback {Function} 回调函数（可选）
     */
    clearLocalData: function(options, callback) {
        var options = options || {};
        options.type = "long";
        options.method = "clear";
        options.callback = options.callback || callback || noop;
        Hyperion.actions.localData(options);
    },
    /* //window窗口列表。
     * params{
     *    type:"tip" //tip,alert,confirm
     * }

     * data{
     *    text:""
     *    time:""
     *
     *    btnText:""
     *    TwoBtnText:""
     * }

     * callback:function(){}
     * twoCallback:function(){}
     */
    windows: function(options, callback) {
        var callback = callback || noop;
        var optsCallback = options.callback || noop;
        var optstwoCallback = options.twoCallback || noop;
        var params = options.params || "tip";
        var data = options.data || {};
        if (!(options.data && options.data.text)) {
            data.text = "";
        }
        Hyperion._call('windows', JSON.stringify(params), JSON.stringify(data), optsCallback, optstwoCallback, callback);
    },
    /**
     * 统一页面跳转方法
     * 通过模块ID和页面ID跳转指定页面和功能
     */
    startModulePage: function(options, callback) {
        if (typeof callback !== 'function') {
            callback = noop;
        }
        var moduleId = options.moduleId;
        var pageId = options.pageId;
        var data = options.data || {};
        Hyperion._call('startModulePage', moduleId, pageId, JSON.stringify(data), callback);
    }
};

/**
 * 获取 Query String
 * @param  {Object}
 * @return {Stirng} query string
 */
function getQS(param) {
    var ret = [];

    for (var key in param) {
        if (param.hasOwnProperty(key)) {
            ret.push(key + '=' + encodeURIComponent(param[key]));
        }
    }

    return ret.join('&');
};

module.exports = Hyperion;
