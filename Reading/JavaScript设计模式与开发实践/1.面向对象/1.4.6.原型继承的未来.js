/**
 * Created by zdnexus on 2017/12/17 0017.
 */
'use strict';

class Animal {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

class Dog extends Animal {
    constructor(name, id) {
        super(name);
        this.id = id;
    }

    getId() {
        return this.id;
    }

    getALL() {
        return this.name + ' ' + this.id;
    }
}

var dog = new Dog('sven', 1);
console.log(dog.getName());// sven
console.log(dog.getId());// 1
console.log(dog.getALL());// sven 1