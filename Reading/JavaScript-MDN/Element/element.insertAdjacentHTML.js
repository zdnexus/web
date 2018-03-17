/**
 * Created by zdnexus on 2017/3/18 0018.
 */
'use strict';

// element.insertAdjacentHTML(position, text);
// insertAdjacentHTML() 将指定的文本解析为 HTML 或 XML，并将结果节点插入到 DOM 树中的指定位置。
// 它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接 innerHTML 操作更快。

//      <!-- beforebegin -->
// <p>
//      <!-- afterbegin -->
// foo
//      <!-- beforeend -->
// </p>
//      <!-- afterend -->

{
    let oP = document.createElement('p');
    oP.innerText += 'I\'m P';

    // document.body.innerText += oP;

    // document.body.innerText += '<p>I\'m P</p>';

    document.body.innerHTML += oP;

    // document.body.innerHTML += '<p>I\'m P</p>';

    // document.body.insertAdjacentHTML('afterend','<p>I\'m P</p>');
}

// 注意： beforebegin 和 afterend 位置,仅在节点在树中且节点具有一个 parent 元素时工作。
{
    let aP = document.getElementsByClassName('log');
    aP[0].insertAdjacentHTML('afterend','<span style="color:red">I\'m Span.</span>');
    // aP.insertAdjacentHTML('afterend', '<span style="color:blue">I\'m Span</span>');
}

