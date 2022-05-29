/**
 * Created by zhongdong on 18/6/6.
 */
'use strict';

// 函数节流
// 在每隔一段时间之内，只能运行一次函数
const throttle = (fun, delay) => {
    let last = null;
    return () => {
        const now = +new Date();
        if (now - last > delay) {
            fun();
            last = now;
        }
    }
};
// 实例
const throttleExample = throttle(() => console.log(1), 1000);
// 调用
throttleExample();
throttleExample();
throttleExample();


// 函数防抖
// 多次并发调用同一个函数，只有最后一次生效
const debouce = (fun, delay) => {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun();
        }, delay);
    }
};
// 实例
const debouceExample = debouce(() => console.log(1), 1000);
// 调用
debouceExample();
debouceExample();
debouceExample();