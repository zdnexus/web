/**
 * Created by Administrator on 2017/3/30 0030.
 */
'use strict';

// 示例
// 复制一个 object
{
    let obj = {a: 1};
    let copy = Object.assign({}, obj);

    console.log(copy);  // { a: 1 }
    console.log(obj);   // { a: 1 }
    console.log(copy == obj);                                   // false
    console.log(copy === obj);                                  // false
    console.log(JSON.stringify(copy) === JSON.stringify(obj));  // true
}

// 深度拷贝问题
// 针对深度拷贝，需要使用其他方法，因为 Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。（也就是指针）
function test() {
    let a = {
        b: {
            c: 4
        },
        d: {
            e: {
                f: 1
            }
        }
    };
    let g = Object.assign({}, a);
    let h = JSON.parse(JSON.stringify(a));
    console.log(a == g); // false
    console.log(g.d); // { e: { f: 1 } }
    g.d.e = 32;
    console.log('g.d.e set to 32.'); // g.d.e set to 32.
    console.log(g); // { b: { c: 4 }, d: { e: 32 } }
    console.log(a); // { b: { c: 4 }, d: { e: 32 } }
    console.log(h); // { b: { c: 4 }, d: { e: { f: 1 } } }
    h.d.e = 54;
    console.log('h.d.e set to 54.'); // h.d.e set to 54.
    console.log(g); // { b: { c: 4 }, d: { e: 32 } }
    console.log(a); // { b: { c: 4 }, d: { e: 32 } }
    console.log(h); // { b: { c: 4 }, d: { e: 54 } }
}
{
    test();
}

// 合并 objects
{
    let o1 = {a: 1};
    let o2 = {b: 2};
    let o3 = {c: 3};
    let obj = Object.assign(o1, o2, o3);

    console.log(obj); // { a: 1, b: 2, c: 3 }
    console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
    console.log(o2);  // { b: 2 }
    console.log(o3);  // { c: 3 }

    o1 = {a: 1};
    o2 = {b: 2};
    o3 = {c: 3};
    obj = Object.assign({}, o1, o2, o3);
    console.log(obj);   // { a: 1, b: 2, c: 3 }
    console.log(o1);    // { a: 1 }
    console.log(o2);    // { b: 2 }
    console.log(o3);    // { c: 3 }
}