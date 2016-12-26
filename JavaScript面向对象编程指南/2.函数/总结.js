/**
 * Created by Administrator on 2016/12/24 0024.
 */

console.log(parseInt(1e1));

console.log(parseInt('1e1'));

console.log(parseFloat('1e1'));

console.log(isFinite(0 / 10));

console.log(isFinite(20 / 0));

console.log(isNaN(parseInt(isNaN)));

var a = 1;
function f() {
    function n() {
        console.log(a);
    }
    var a = 2;
    n();
}
f();