'use strict';

// 报错
// function A() {
//     let a = 10;
//     var a = 1;
// }

// 报错
// function B() {
//     let b = 10;
//     let b = 1;
// }

function func1(arg) {
    console.log(arg);//1
    // let arg; // 报错 (暂时性死区)
}

function func2(arg) {
    console.log(arg);//2
    arg = 'a';
    console.log(arg);//a
    {
        let arg = 'b'; // 不报错
        // let arg;// 报错
    }
    console.log(arg);//a
}

func1(1);
func2(2);