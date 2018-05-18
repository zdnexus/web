/**
 * Created by zdnexus on 2018/1/20 0020.
 */
'use strict';

var performanceLevelS = function (salary) {
    return salary * 4;
};

var performanceLevelA = function (salary) {
    return salary * 3;
};

var performanceLevelB = function (salary) {
    return salary * 2;
};

var calculateBonus = function (performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return performanceLevelS(salary);
    } else if (performanceLevel === 'A') {
        return performanceLevelA(salary);
    } else if (performanceLevel === 'B') {
        return performanceLevelB(salary);
    }
};

console.log(calculateBonus('B', 20000));
console.log(calculateBonus('S', 6000));