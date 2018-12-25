/**
 * Created by zhongdong on 18/8/8.
 */

// var s = 'applyFormInfo.9.taxInfo.imageInfo.0.extInfo';
//
// console.log(s.replace(/\.+[\d{2,}]/g, ''))
//
//
// var s_2 = 'applyFormInfo.9.taxInfo.imageInfo.0'
//
// console.log(s_2.replace(/\.+[\d{2,}]/g, ''))


var s_3 = 'applyFormInfo.10.taxInfo.imageInfo.0.extInfo';

console.log(s_3.replace(/\.+\d/g, ''))
console.log(s_3.replace(/\.+\d{2,}/g, ''))
console.log(s_3.replace(/\.+[\d]{1,}/g, ''))


// var s_4 = 'applyFormInfo.10.taxInfo.imageInfo.0'
//
// console.log(s_4.replace(/\.+[\d{2,}]/g, ''))
//
//
// var s_5 = 'applyFormInfo.100.taxInfo.imageInfo.0.extInfo';
//
// console.log(s_5.replace(/\.+\d/g, ''))
// console.log(s_5.replace(/\.+[\d{2,}]/g, ''))