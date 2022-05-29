var ul = document.querySelector('#ul');
var li = ul.querySelectorAll('li');
var arr = [];
arr[0] = 0;
arr[1] = 200;
arr[2] = 400;
li[0].style.left = arr[0] + 'px';
li[1].style.left = arr[1] + 'px';
li[2].style.left = arr[2] + 'px';
var dis = 600;
// li[0].style.transform = 'translate3d(0,0,0)';
// li[1].style.transform = 'translate3d(210px,0,0)';
// li[2].style.transform = 'translate3d(420px,0,0)';
var currentIndex = 0;
document.querySelector('#button').onclick = function () {
    arr[0] -= 200;
    arr[1] -= 200;
    arr[2] -= 200;
    li[0].style.left = arr[0] + 'px';
    li[1].style.left = arr[1] + 'px';
    li[2].style.left = arr[2] + 'px';
    // currentIndex += 1;
    if (arr[2] === 0) {
        arr[0] += dis;
        li[0].style.left = arr[0] + 'px';
        arr[0] = 0;
        arr[1] = 200;
        arr[2] = 400;
    }
};