/**
 * Created by Administrator on 2017/4/21 0021.
 */
'use strict';

// Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

// Object.defineProperty(obj, prop, descriptor)
// obj
// 要在其上定义属性的对象。
// prop
// 要定义或修改的属性的名称。
// descriptor
// 将被定义或修改的属性的描述符。

// 该方法允许精确添加或修改对象的属性。
// 一般情况下，我们为对象添加属性是通过赋值来创建并显示在属性枚举中（for...in 或 Object.keys 方法），
// 但这种方式添加的属性值可以被改变，也可以被删除。
// 而使用 Object.defineProperty() 则允许改变这些额外细节的默认设置。
// 例如，默认情况下，使用  Object.defineProperty() 增加的属性值是不可改变的。

// configurable
// 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。

// enumerable
// 当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。

// 数据描述符同时具有以下可选键值：
// value
// 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。

// writable
// 当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变。默认为 false。

// 存取描述符同时具有以下可选键值：
// get
// 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。

// set
// 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。

{
    // let obj = {};
    // // 使用 __proto__
    // Object.defineProperty(obj, 'key', {
    //     __proto__: null,
    //     value: 'static'
    // });
    // console.log(obj);
    // console.log(obj.key);
}

// defineProperty 配置情况
// 默认
{
    console.log('default:');
    let obj = {};
    Object.defineProperty(obj, 'key', {
        configurable: false,    //
        enumerable: false,      // key 值不显示
        writable: false,        // value 值不可改变
        value: 'static'
    });
    console.log(obj);
    console.log(obj.key);

    // ERROR：不可重新设置
    try {
        Object.defineProperty(obj, 'key', {
            value: 'absolute'
        });
        console.log(obj);
        console.log(obj.key);
    } catch (error) {
        console.log('configurable = false ERROR:' + error);
    }

    // ERROR: delete key
    try {
        delete obj.key;
        console.log(obj);
        console.log(obj.key);
    } catch (error) {
        console.log('delete key ERROR:' + error);
    }

    // enumerable = false，不显示
    // console.log('enumerable = false:');
    // console.log(obj);
    // console.log(obj.key);

    // ERROR：不可更改 key 对应的 value 值
    // 在严格模式下会抛出，即使之前已经有相同的值）
    try {
        obj.key = 'absolute';
        console.log(obj);
        console.log(obj.key);
    } catch (error) {
        console.log('writable = false ERROR:' + error);
    }
}

// configurable = true
{
    console.log('\nconfigurable = true:');
    let obj = {};
    Object.defineProperty(obj, 'key', {
        configurable: true, //
        enumerable: false,  // key 值不显示
        writable: false,    // value 值不可改变
        value: 'static'
    });
    console.log(obj);
    console.log(obj.key);

    // 重设 key - value 值
    Object.defineProperty(obj, 'key', {
        value: 'absolute'
    });
    console.log(obj);
    console.log(obj.key);

    // delete key
    delete obj.key;
    console.log(obj);
    console.log(obj.key);
}

// enumerable = true
{
    console.log('\nenumerable = true:');
    let obj = {};
    Object.defineProperty(obj, 'key', {
        configurable: false,// key 值不可改变
        enumerable: true,// key 值显示
        writable: false, // val 不可改变
        value: 'static'
    });
    console.log(obj);
    console.log(obj.key);
}

// writable = true
{
    console.log('\nenumerable = true:');
    let obj = {};
    Object.defineProperty(obj, 'key', {
        configurable: false,// key 值可改变
        enumerable: false,// key-value 值不显示
        writable: true, // value 可改变
        value: 'static'
    });
    console.log(obj);
    console.log(obj.key);

    // 重写 value 值
    obj.key = 'absolute';
    console.log(obj);
    console.log(obj.key);
}

// 循环使用同一对象
function withValue(value) {
    var d = withValue.d || (
            withValue.d = {
                enumerable: false,// key 值不可改变
                writable: false,// key-value 值不显示
                configurable: false,// value 不可改变
                value: null
            }
        );
    d.value = value;
    return d;
}
{
    console.log('\nfunction:');
    let obj = {};
    Object.defineProperty(obj, 'key', withValue('static'));
    console.log(obj);
    console.log(obj.key);
}

// 实例：
{
    console.log('\nexample:');
    let o = {}; // 创建一个新对象
    var bValue;

    Object.defineProperty(o, 'a', {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('get方法被调用了。');
        },
        set: function (newValue) {
            console.log('set方法被调用了，newValue = ' + newValue);
            bValue = newValue;
        }
    });
    console.log(bValue);
    o.a = 1;
    console.log(bValue);
}