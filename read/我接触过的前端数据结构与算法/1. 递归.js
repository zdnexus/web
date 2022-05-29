/**
 * Created by zdnexus on 17/8/28.
 */
'use strict';

var ids = [34112, 98325, 68125];
(function sendRequest() {
    var id = ids.shift();
    if (id) {
        console.log('id:', id);
        sendRequest();
    } else {
        console.log('finished');
    }
})();

// document.getElementById
function getElementById(node, id) {
    if (!node) {
        return null;
    }
    if (node.id === id) {
        return node;
    }

    for (var i = 0; i < node.childNodes.length; i++) {
        var found = getElementById(node.childNodes[i], id);
        if (found) {
            return found;
        }
    }

    return null;
}
console.log(getElementById(document, 'div1'));
console.log(getElementById(document, 'div2'));


function getByElementId(node, id){
    //遍历所有的Node
    while(node){
        if(node.id === id) return node;
        node = nextElement(node);
    }
    return null;
}

function nextElement(node){
    if(node.children.length) {
        return node.children[0];
    }
    if(node.nextElementSibling){
        return node.nextElementSibling;
    }
    while(node.parentNode){
        if(node.parentNode.nextElementSibling) {
            return node.parentNode.nextElementSibling;
        }
        node = node.parentNode;
    }
    return null;
}