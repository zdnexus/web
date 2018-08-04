/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};

var renderMap = function (map) {
    // Q:type of map && map.show === 'function'
    if (map && map.show instanceof Function) {
        map.show();
    }
};

renderMap(googleMap);
renderMap(baiduMap);

var sosoMap = {
    show: function () {
        console.log('开始渲染搜搜地图');
    }
};

renderMap(sosoMap);