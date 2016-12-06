;(function(window,undefined){
    var App = window.App = {
            callbacks: {}
        },
        slice = Array.prototype.slice;
    /**
     * 常量定义
     */
    var ua = navigator.userAgent.toUpperCase();
    // 当前环境是否为Android平台
    App.IS_ANDROID = ua.indexOf('ANDROID') != -1;
    // 当前环境是否为IOS平台
    App.IS_IOS = ua.indexOf('IPHONE OS') != -1;
    // 当前环境是否为WP平台
    App.IS_WP = ua.indexOf('WINDOWS') != -1 && ua.indexOf('PHONE') != -1;

    App.callbacks.__leftAction__ = function() {
        var haveLeftAction = typeof App.callbacks.leftAction === 'function',
            args = slice.call(arguments);
        if(haveLeftAction) {
            setTimeout(function() {
                App.callbacks.leftAction.apply(App.callbacks, args);
            },0);
            if(App.IS_ANDROID) {
                App.call(["called"]);
            } else if(App.IS_IOS) {
                return true;
            }
        }
    };


    //=======================Native 相关================================

    var callindex = 0, toString = Object.prototype.toString;
    /**
     * 调用一个Native方法
     * @param {String} name 方法名称
     */
    App.call = function(name) {
        // 获取传递给Native方法的参数
        var args = slice.call(arguments, 1);
        var successCallback = '' , errorCallback = '' , item = null ,returnArg;
        var methodName = name[name.length-1];

        if(App.IS_ANDROID){
            if(window.HostApp){
                var _str = "", newArguments = [];
                for(var i=0;i<args.length;i++){
                    if(typeof args[i] === 'function'){
                        var callbackName = methodName+'Callback'+callindex ;
                        window[callbackName] = args[i] ;
                        newArguments.push(callbackName);
                        callindex++ ;
                    }else if(typeof args[i] === 'object'){
                        newArguments.push( JSON.stringify( args[i] ) ) ;
                    }else{
                        newArguments.push(args[i]) ;
                    }
                }
                try{
                    HostApp[methodName].apply(window.HostApp,newArguments);
                }catch(e){
                    var params = slice.call(arguments, 0);
                    setTimeout(function(){
                        App["call"].apply(window.App,params);
                    },300);
                }
            }else{
                var params = slice.call(arguments, 0);
                setTimeout(function(){
                    App["call"].apply(window.App,params);
                },1000);
            }

        }else if(App.IS_IOS){
            var newArguments = "" , tempArgument = [];
            for(var i=0;i<args.length;i++ ){
//                tempArgument = args[i];
                if(typeof args[i] === 'function'){
                    var callbackName = methodName+'Callback'+callindex ;
                    window[callbackName] = args[i] ;
                    tempArgument.push(callbackName);
                    callindex++ ;
                }else{
                    tempArgument.push(args[i]);
                }

            }
            //newArguments = '[' + Array.prototype.join.apply(tempArgument) + ']';
            callindex++;
            var iframe = document.createElement("iframe");
            console.log("tempArgument"+tempArgument);
            var _src = 'callnative://'+methodName+'/'+encodeURIComponent(JSON.stringify(tempArgument)) + '/' + callindex;
            console.log(_src);
//            console.log(encodeURIComponent(_src));
            iframe.src = _src;
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe= null;
        }
        /*try {
         var len = name.length,temp = window.navigator, temp1;

         for(var i=0;i<len;i++){
         if(i === len -1) {
         temp1 = temp;
         }
         temp = temp[name[i]];

         }
         if(typeof temp === 'function'){
         returnArg = temp.apply(temp1,args);
         }else if(typeof temp !== 'function' && args.length == 0){
         returnArg = temp;
         }

         } catch(e) {
         console.log(e)
         }*/
    }

}(window));