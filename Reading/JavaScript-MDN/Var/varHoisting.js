/**
 * Created by zdnexus on 2017/3/4 0004.
 */
'use strict';

{
    var name = 'World!';
    (function () {
        if (typeof name === 'undefined') {
            var name = 'Jack';
            console.log('Goodbye ' + name);
        } else {
            console.log('Hello ' + name);
        }
    })();
    // 'Goodbye Jack'
}

{

}
