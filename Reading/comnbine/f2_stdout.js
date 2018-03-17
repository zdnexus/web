/**
 * Created by zdnexus on 17/5/10.
 */

// f2();
//
// console.log(f2_str);


function f1() {
    function f2() {
        console.log(1);
    }
}

function f2() {
    console.log(2);
}

f1();
f2();