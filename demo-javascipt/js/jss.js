/**
 * Created by Administrator on 2015/8/5.
 */
window.onload = function () {
    var oP = document.getElementById('fwk');
    var oDiv = document.getElementById('div1');

    oP.onmouseover = function () {
        oDiv.style.display = 'block';
    };

    oP.onmouseout = function () {
        oDiv.style.display = 'none';
    };
};