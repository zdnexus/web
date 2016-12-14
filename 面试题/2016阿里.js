/**
 * Created by Administrator on 2016/12/13 0013.
 */


var a = [1, 2, 3];
a.splice(1, 1, 1, 2, 3);
console.log(a);

var foo = 1;
function main() {
    console.log(foo);//undefined
    var foo = 2;
    console.log(this.foo);//undefined
    this.foo = 3;
}
main();//undefined undefined
new main();//undefined undefined