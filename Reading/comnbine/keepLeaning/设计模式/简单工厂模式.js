/**
 * Created by zdnexus on 17/5/25.
 */
'use strict';

// 篮球基类
function Basketball() {
    this.intro = '篮球盛行于美国';
}
Basketball.prototype = {
    getMember: function() {
        console.log('每个队伍需要5名队员');
    },
    getBallSize: function() {
        console.log('篮球很大');
    }
};
// 足球基类
function Football() {
    this.intro = '足球盛行于美国';
}
Football.prototype = {
    getMember: function() {
        console.log('每个队伍需要11名队员');
    },
    getBallSize: function() {
        console.log('足球很大');
    }
};

// 运动工厂
var SportsFactory = function(name) {
    switch(name) {
        case 'NBA':
            return new Basketball();
        case 'wordCup':
            return new Football();
    }
};

var A = new SportsFactory('NBA');
console.log(A.intro);
A.getMember();
A.getBallSize();

var B =  new SportsFactory('wordCup');
console.log(B.intro);
B.getMember();
B.getBallSize();