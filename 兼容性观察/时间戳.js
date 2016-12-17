/**
 * Created by Administrator on 2016/12/16 0016.
 */
'use strict';
//                问题：toLocaleString存在bug问题，00:00：00到00:59:59都显示早上12:00:00至12:59:59
//                问题：Date.parse的兼容问题
console.log('2016-11-17', Date.parse('2016-11-17'));
console.log('2016/11/17', Date.parse('2016/11/17'));
console.log('2016-11-17 00:00:00', Date.parse('2016-11-17 00:00:00'));
console.log('2016/11/17 00:00:00', Date.parse('2016/11/17 00:00:00'));
//                兼容问题：chrome解析的是2016-11-17，Safari解析的是2016/11/17，'-'时间不够准确差8个小时而且Safari中无法转换为时间戳
//                解决：'-'全部转换为'/'