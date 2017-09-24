/**
 * Hyperion Hybrid 适配
 */

define([], () => {
    window.HFEasyJS = {
        __callbacks: {},
        invokeCallback: function (cbID, removeAfterExecute) {
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            args.shift();
            for (var i = 0, l = args.length; i < l; i++) {
                args[i] = decodeURIComponent(args[i]);
            }
            var cb = HFEasyJS.__callbacks[cbID];
            if (removeAfterExecute) {
                HFEasyJS.__callbacks[cbID] = undefined;
            }
            return cb.apply(null, args);
        },
        call: function (obj, functionName, args) {
            var formattedArgs = [];
            for (var i = 0, l = args.length; i < l; i++) {
                if (typeof args[i] == "function") {
                    formattedArgs.push("f");
                    var cbID = "__cb" + (+new Date);
                    HFEasyJS.__callbacks[cbID] = args[i];
                    formattedArgs.push(cbID);
                } else {
                    formattedArgs.push("s");
                    formattedArgs.push(encodeURIComponent(args[i]));
                }
            }
            var argStr = (formattedArgs.length > 0 ? ":" + encodeURIComponent(formattedArgs.join(":")) : "");
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", "easy-js:" + obj + ":" + encodeURIComponent(functionName) + argStr);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
            var ret = HFEasyJS.retValue;
            HFEasyJS.retValue = undefined;
            if (ret) {
                return decodeURIComponent(ret);
            }
        },
        inject: function (obj, methods) {
            window[obj] = {};
            var jsObj = window[obj];
            for (var i = 0, l = methods.length; i < l; i++) {
                (function () {
                    var method = methods[i];
                    var jsMethod = method.replace(new RegExp(":", "g"), "");
                    jsObj[jsMethod] = function () {
                        return HFEasyJS.call(obj, method, Array.prototype.slice.call(arguments));
                    };
                })();
            }
        }
    };

    HFEasyJS.inject("Hyperion_NATIVE", ["call:"]);

    var global = window;
    var Hyperion = global.Hyperion || {};
    var slice = Array.prototype.slice,
        ua = global.navigator ? global.navigator.userAgent : '',
        isiOS = /iPhone|iPad|iPod|iOS/i.test(ua),
        isAndroid = /Android/i.test(ua),
        callbackId = 0;

    var noop = function () {
    };
    var getCallbackName = function (action) {
        // return action + '_' + callbackId++;
        return action + '_' + new Date().getTime() + Math.random().toString().substr(3, 8);
    };

    Hyperion._call = function (method) {
        var args = slice.call(arguments, 1),
            hasCallback = typeof args[args.length - 1] === 'function' ? true : false,
            callback = noop;

        // 调用 Native API 的统一回调，位于参数列表的最后一位，可有可无
        // 默认空操作，有回调传入则使用传入的回调
        if (hasCallback) {
            callback = args.pop();
            args.unshift(callback);
        }

        // 参数处理
        // function 类型处理为 callback name，并加入 _handlers 集，以供回调
        for (var i = 0, len = args.length; i < len; i++) {
            var arg = args[i] || '';

            if (typeof arg === 'function') {
                var cbName = getCallbackName(method);
                this._handlers[cbName] = arg;
                args[i] = cbName;
            }
        }

        var callData = JSON.stringify({
            service: 'native_call',
            method: method,
            args: args
        });

        if (isAndroid) {
            prompt(callData);
        } else if (isiOS) {
            try {
                global.Hyperion_NATIVE.call(callData);
            } catch (e) {
            }
        }
    };

// 提供给 Native 的回调入口
    Hyperion._callback = function (method) {
        var args = slice.call(arguments, 1),
            callback = Hyperion._handlers[method];

        if (callback && typeof callback === 'function') {
            callback.apply(global, args);

            // 调用完后删除该回调函数
            // delete Hyperion._handlers[method];
        }
    };

// Hyperion._notifyState = function(){
//     // var readyEvent = new Event('HyperionReady');
//     var readyEvent = new document.defaultView.CustomEvent('HyperionReady');
//     window.dispatchEvent(readyEvent);
//     Hyperion.injected = true;
// }

// 回调函数集，用于回调查找
    Hyperion._handlers = {};
// 添加onBack监听
    Hyperion._handlers.onBack = function () {
        Hyperion.eventListener && Hyperion.eventListener.onBack.apply(this, arguments);
    };

// 添加onAppear监听
    Hyperion._handlers.onAppear = function () {
        Hyperion.eventListener && Hyperion.eventListener.onAppear.apply(this, arguments);
    };

// 导出 Hyperion 对象到全局
//     global.Hyperion = Hyperion;
//     module.exports = Hyperion;
// 注入完通知 ready 事件
// 客户端必须要在 ready 状态后才能使用 Hyperion 提供的方法
// 因为此段代码是 Native 端在 webview 初始的时候注入的
// 无法保证注入完再解析执行页面的 js
// Hyperion._notifyState();

    return Hyperion;
});