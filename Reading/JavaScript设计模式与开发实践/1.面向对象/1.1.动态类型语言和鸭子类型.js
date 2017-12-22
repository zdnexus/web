/**
 * Created by Administrator on 2017/12/16 0016.
 */
'use strict';

var dunk = {
    name: 'dunk',
    sing: function () {
        return '嘎嘎嘎';
    }
};

var chicken = {
    name: 'chicken',
    sing: function () {
        return '嘎嘎嘎';
    }
};

var choir = [];// 合唱团

var joinChoir = function (animal) {
    if (animal && animal.sing && animal.sing() === '嘎嘎嘎') {
        choir.push(animal);
        console.log('恭喜' + animal.name + '加入合唱团');
        console.log('合唱团已有成员数量:' + choir.length);
    }
};

joinChoir(dunk);
joinChoir(chicken);