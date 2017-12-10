/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

// 命令模式
// 闭包改写
var Div = {
    element: document.getElementById('div1'),
    changeBlue: function () {
        this.element.style.backgroundColor = 'blue';
    },
    changeRed: function () {
        this.element.style.backgroundColor = 'red';
    },
    changeFontSize50: function () {
        this.element.style.fontSize = '50px';
    }
};

var ChangeDivCommand = function (receiver) {
    var commandOne = function () {
        receiver.changeBlue();
    };

    var commandTwo = function () {
        receiver.changeRed();
        receiver.changeFontSize50();
    };

    return {
        commandOne: commandOne,
        commandTwo: commandTwo
    };
};

var setCommand = function (command) {
    document.getElementById('btn1').onclick = function () {
        command.commandOne();
    };
    document.getElementById('btn2').onclick = function () {
        command.commandTwo();
    };
};

setCommand(ChangeDivCommand(Div));
