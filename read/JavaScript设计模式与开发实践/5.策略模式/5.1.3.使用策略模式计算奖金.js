/**
 * Created by zdnexus on 2018/1/20 0020.
 */
'use strict';

var performanceLevelS = function () {
};
performanceLevelS.prototype.calculate = function (salary) {
    return salary * 4;
};

var performanceLevelA = function () {
};
performanceLevelA.prototype.calculate = function (salary) {
    return salary * 3;
};

var performanceLevelB = function () {
};
performanceLevelB.prototype.calculate = function (salary) {
    return salary * 2;
};

var Bonus = function () {
    this.salary = null;
    this.strategy = null;
};
Bonus.prototype.setSalary = function (salary) {
    this.salary = salary;
};
Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy;
    // this.strategy = new strategy();
};
Bonus.prototype.getBonus = function () {
    return this.strategy.calculate(this.salary);
};

var bonus = new Bonus();

bonus.setSalary(20000);
bonus.setStrategy(new performanceLevelB());
console.log(bonus.getBonus());

bonus.setSalary(6000);
bonus.setStrategy(new performanceLevelS());
console.log(bonus.getBonus());

// bonus.setSalary(10000);
// bonus.setStrategy(performanceLevelS);
// console.log(bonus.getBonus());