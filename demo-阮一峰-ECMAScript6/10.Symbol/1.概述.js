/**
 * Created by zdnexus on 17/9/4.
 */
'use strict';

// ES5 的对象属性名都是字符串，这容易造成属性名的冲突。
// 比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。
// 如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

// ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
// 它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

// Symbol 值通过Symbol函数生成。
// 这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。
// 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

let s = Symbol();

console.log(typeof (s));// 'symbol'
// 上面代码中，变量s就是一个独一无二的值。typeof运算符的结果，表明变量s是 Symbol 数据类型，而不是字符串之类的其他类型。

// 注意，Symbol函数前不能使用new命令，否则会报错。
// 这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。
// 基本上，它是一种类似于字符串的数据类型。

// Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
var s1 = Symbol('foo');
var s2 = Symbol('bar');

console.log(s1); // Symbol(foo)
console.log(s2); // Symbol(bar)

console.log(s1.toString()); // 'Symbol(foo)'
console.log(s2.toString()); // 'Symbol(bar)'

// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)

