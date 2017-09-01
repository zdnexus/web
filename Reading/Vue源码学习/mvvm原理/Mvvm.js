/**
 * Created by Administrator on 2017/3/8 0008.
 */
'use strict';

function MVVM(options) {
    this.$options = options;
    var data = this._data = this.$options.data;
    var me = this;
    // 属性代理，实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function (key) {
        me._proxy(key);
    });
    //
    observe(data);
    //
    this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {

    _proxy: function (key) {
        var me = this;
        Object.defineProperty(this, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function proxyGetter() {
                console.log('proxy get');
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                console.log('proxy set');
                me._data[key] = newVal;
            }
        });
    }
};