/**
 * Created by zdnexus on 17/12/13.
 */
'use strict';

let start = null;
let element = document.getElementById('div1');
let id;
let step = (timestamp) => {
    if (!start) {
        start = timestamp;
    }
    let progress = timestamp - start;
    element.style.left = Math.min(progress / 10, 200) + 'px';
    console.log('dis', Math.min(progress / 10, 200))
    console.log('time', progress);
    if (progress < 1670) {
        id = window.requestAnimationFrame(step);
    }
    else {
        window.cancelAnimationFrame(id);
    }
};

window.requestAnimationFrame(step);