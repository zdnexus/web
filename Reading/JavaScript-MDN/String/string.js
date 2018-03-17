/**
 * Created by zdnexus on 2017/3/4 0004.
 */
'use strict';
{
    // 为什么函数声明不能放在块状作用域里？
}

{
    let s = '13';
    let s_obj = new String(s);
    let s_str = String(13);

    console.log(typeof s);      // 'string'
    console.log(typeof s_obj);  // 'object'
    console.log(typeof s_str);  // 'string'
    console.log(s === s_obj);   // false
    console.log(s === s_str);   // true
}

function showCase(value) {
    switch (value) {
        case 'A':
            console.log('Case A');
            break;
        case 'B':
            console.log('Case B');
            break;
        case undefined:
            console.log('undefined');
            break;
        default:
            console.log('Do not know!');
    }
}
showCase(new String('A')); // 'Do not know!'

function showCase2(value) {
    switch (value) {
        case 'A':
            console.log('Case A');
            break;
        case 'B':
            console.log('Case B');
            break;
        case undefined:
            console.log('undefined');
            break;
        default:
            console.log('Do not know!');
    }
}
showCase2(String('A')); // 'A'

function showCase3(value) {
    switch (value) {
        case '1':
            console.log('Case string');
            break;
        case 1:
            console.log('Case number');
            break;
        case undefined:
            console.log('undefined');
            break;
        default:
            console.log('Do not know!');
    }
}
showCase3();    // undefined
showCase3(1);   // Case number
showCase3('1'); // Case string