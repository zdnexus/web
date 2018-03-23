/**
 * Created by zdnexus on 2017/12/31 0031.
 */
'use strict';

var Dunk = function () {
};
Dunk.prototype.sound = function () {
    console.log('嘎嘎嘎');
};

var Chicken = function () {
};
Chicken.prototype.sound = function () {
    console.log('咯咯咯');
};

var MakeSound = function (animal) {
    animal.sound();
};
MakeSound(new Dunk());
MakeSound(new Chicken());

var Dog = function () {
};
Dog.prototype.sound = function () {
    console.log('汪汪汪');
};

MakeSound(new Dog());