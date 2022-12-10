/**
 * Created by zdnexus on 2017/3/8 0008.
 */
'use strict';

function MVVM(options) {
    var data = this._data = options.data;
    var self = this;
    
    // 属性代理，实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function (key) {
        self._proxy(key);
    });
    observe(data);
    this.$compile = new Compile(options.el || document.body, self);
}

MVVM.prototype = {
    _proxy: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function proxyGetter() {
                console.log('proxy get');
                return self._data[key];
            },
            set: function proxySetter(newVal) {
                console.log('proxy set');
                self._data[key] = newVal;
            }
        });
    }
};