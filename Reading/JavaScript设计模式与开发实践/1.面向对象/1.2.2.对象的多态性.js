/**
 * Created by Administrator on 2017/12/17 0017.
 */
'use strict';

var makeSound = function (animal) {
    animal.sound();
};

var Dunk = function () {
};
Dunk.prototype.name = 'dunk';
Dunk.prototype.sound = function () {
    console.log('嘎嘎嘎');
};

var Chicken = function () {
};
Chicken.prototype.name = 'chicken';
Chicken.prototype.sound = function () {
    console.log('咯咯咯');
};

makeSound(new Dunk());
makeSound(new Chicken());