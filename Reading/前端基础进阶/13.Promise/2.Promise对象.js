/**
 * Created by Administrator on 2017/4/4 0004.
 */
'use strict';

//
function want(val) {
    console.log('这是你想要执行的代码', val);
}

function fn(want) {
    console.log('这里表示执行了一大堆各种代码');

    // 返回 Promise 对象
    return new Promise((resolve, reject)=> {
        if (typeof want == 'function') {
            resolve(want);
        } else {
            reject('TypeError: ' + want + ' 不是一个函数')
        }
    })
}

fn(want).then((want)=> {
    want('f1');
});

fn('999').catch((err)=> {
    console.log(err);
});

//
function fn2(want) {
    console.log('这里表示执行了一大堆各种代码');

    // 返回Promise对象
    let P = new Promise((resolve, reject)=> {
        if (typeof want == 'function') {
            resolve(want);
        } else {
            reject(want);
        }
    });

    P.then(
        (want)=> {
            want('f2');
        },
        (err)=> {
            console.log('TypeError: ' + err + ' 不是一个函数');
        }
    );

    return P;
}

fn2(want).then((want)=> {
    console.log('访问want函数: ' + want);
});

fn2('222').catch((err)=> {
    console.log(err);
});

//
function fn3(num) {
    return new Promise((resolve, reject)=> {
        if (typeof num === 'number') {
            resolve();
        } else {
            reject();
        }
    }).then(
        ()=> {
            console.log(num + ' 是一个number值');
        },
        ()=> {
            console.log(num + ' 不是一个number值');
        }
    );
}

fn3('hahha');
fn3(1234);

//
function fn4(num) {
    return new Promise((resolve, reject)=> {
        if (typeof num === 'number') {
            resolve();
        } else {
            reject();
        }
    }).then(
        ()=> {
            console.log(num + ' 是一个number值');
        }
    ).then(null, ()=> {
        console.log(num + ' 不是一个number值');
    });
}
fn4('hahha');
fn4(1234);