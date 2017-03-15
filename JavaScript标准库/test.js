/**
 * Created by Administrator on 2017/3/12 0012.
 */
'use strict';

//map 的this指向
{
    let arr = [1, 2, 3];
    arr.map(
        ()=> {
            console.log(this);
        }, arr
    );

    arr.map(
        function () {
            console.log(this);
        }, arr
    );
}

//
{
    console.log(Math.pow(2, 53) === (Math.pow(2, 53) + 1));
    console.log(Math.pow(2, 53) === (Math.pow(2, 53) + 2));
}

//
{
    console.log(null == undefined);
    console.log(undefined == 0);
    console.log(null == 0);
}

{
    let arr = [1, 2, 3];
    arr[10] = 10;
    console.log(0 in arr);
    console.log(3 in arr);
    console.log(10 in arr);
}

{
    console.log([] == []);
    console.log({} == {});
}