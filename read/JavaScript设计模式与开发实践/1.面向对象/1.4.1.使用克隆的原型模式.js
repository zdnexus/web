/**
 * Created by zdnexus on 2017/12/17 0017.
 */
'use strict';

var Plane = function () {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
};

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

var clonePlane = Object.create(plane);
console.log(clonePlane);// {}
console.log(clonePlane.__proto__);// { blood: 500, attackLevel: 10, defenseLevel: 7 }

clonePlane.__proto__.blood = 400;
console.log(plane);// { blood: 400, attackLevel: 10, defenseLevel: 7 }
console.log(clonePlane);// {}
console.log(clonePlane.__proto__);// { blood: 400, attackLevel: 10, defenseLevel: 7 }

plane.blood = 300;
console.log(plane);// { blood: 300, attackLevel: 10, defenseLevel: 7 }
console.log(clonePlane);// {}
console.log(clonePlane.__proto__);// { blood: 300, attackLevel: 10, defenseLevel: 7 }

Object.create = Object.create || function (obj) {
        var F = function () {
        };
        F.prototype = obj;
        return new F();
    };