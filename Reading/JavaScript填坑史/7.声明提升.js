/**
 * Created by zhongdong on 18/5/25.
 */
'use strict';

var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
// Goodbye Jack