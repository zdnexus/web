/**
 * Created by Administrator on 2016/9/22 0022.
 */


let url = 'http://sjdkf-:3012023/jsljksdk?payState=123213&code=123&message=2的数据库及';


function cutBind(str) {
    let ob = {};
    let cutStr = str.substr(url.indexOf('?') + 1);
    let cutArr = cutStr.split('&');

    cutArr.map((cutItem)=> {
        let index = cutItem.indexOf('=');
        let key = cutItem.substr(0, index);
        let value = cutItem.substr(index + 1);

        ob[key] = value;
    });
    return ob;
}


let s = cutBind(url);
console.log(s);