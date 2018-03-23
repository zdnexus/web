/**
 * Created by zdnexus on 2017/3/14 0014.
 */
'use strict';

// arguments 对象是所有函数中可用的局部变量。
// 你可以使用 arguments 对象在函数中引用函数的参数。此对象包含传递给函数的每个参数的条目，第一个条目的索引从0开始。
// 例如，如果一个函数传递了三个参数，你可以参考它们如下：

function f1() {
    console.log(arguments);         // [1,2,3]
    console.log(arguments.length);  // 3
    console.log(arguments[0]);      // 1
    console.log(arguments[1]);      // 2
    console.log(arguments[2]);      // 3
    console.log(typeof arguments);  // 'object'

    // arguments对象不是一个 Array 。它类似于数组，但除了 长度之外没有任何数组属性。
    // Uncaught TypeError: arguments.map is not a function
    // arguments.map(()=> {
    // });

    // 它没有 map 方法。但是它可以被转换为一个真正的数组：
    // 方法一
    let args = Array.prototype.slice.call(arguments);
    args.map(()=> {
    });
    // 方法二
    let args2 = [].slice.call(arguments);
    args2.map(()=> {
    });
    // 方法三
    let args3 = Array.from(arguments);
    args3.map(()=> {
    });
    // 方法四
    let args4 = [...arguments];
    args4.map(()=> {
    });
    // 还需要研究
    // 方法五
    let args5 = Array.prototype.concat.call(arguments);
    args5.map((val)=> {
        console.log(val)
    });
    // 方法六
    let args6 = [].concat.call(arguments);
    args6.map((val)=> {
        console.log(val)
    });
}
{
    f1(1, 2, 3);
}

// 例子
// 定义一个连接几个字符串的函数
function myConcat(separator) {
    var args = Array.prototype.slice.call(arguments, 1);
    return args.join(separator);
}
{
    console.log(myConcat(', ', 'red', 'orange', 'blue'));
    console.log(myConcat('; ', 'elephant', 'giraffe', 'lion', 'cheetah'));
    console.log(myConcat('. ', 'sage', 'basil', 'oregano', 'pepper', 'parsley'));
}

// 定义一个创建HTML列表的方法
function list(type) {
    let result = '<' + type + '><li>';
    let args = Array.prototype.slice.call(arguments, 1);
    result += args.join('</li><li>');
    result += '</li></' + type + '>'; // end list
    return result;
}
{
    var listHTML = list('ul', 'One', 'Two', 'Three');
    document.body.append(listHTML);

    var pN = document.createElement('p');
    pN.append(123);
    document.body.appendChild(pN);
}

// 