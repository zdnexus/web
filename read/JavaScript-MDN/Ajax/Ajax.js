/**
 * Created by zdnexus on 2017/3/19 0019.
 */
let xhr = new XMLHttpRequest();
//服务器随你喜欢，你可以用php，也可以用node，只要实现了标准的GET方法即可
//对于post，put，delete等方法同理
//而很显然，假如你的数据没有必要从数据库中提取，或者长期不变，也不怕泄密
//那你完全可以在此请求一个json文件
xhr.open("GET", "https://api.douban.com/v2/movie/top250", true);
//根据情况选择是否要随get请求发送用于身份认证的信息
xhr.withCredentials = true;
xhr.send();

xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
            //你当然可以用其他方法编码你的返回信息，但是对于js的世界来说，还有什么比json更方便呢？
            let gotServices = JSON.parse(xhr.responseText)
            //好了，我们获得了service列表，使用setState方法覆盖当前元素的services数据
            console.log(gotServices);
        }
    } else {
        alert("ajax失败了")
    }
}