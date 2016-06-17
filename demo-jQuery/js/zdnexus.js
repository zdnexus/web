/**
 * Created by hasee on 2015/10/25.
 */

//自定义函数
//1.用jQuery添加2个全局函数
jQuery.zdAlert = function (str) {
    alert(str);
};

jQuery.zdAlert2 = function (str) {
    alert(str + "!!!");
};

//2.用extend()方法合并多个函数对象
jQuery.extend({
    zdAlert: function (str) {
        alert(str);
    },
    zdAlert2: function (str) {
        alert(str + "!!!");
    }
});

//3.使用命名空间
jQuery.zd = {
    zdAlert: function (str) {
        alert(str);
    },
    zdAlert2: function (str) {
        alert(str + "!!!");
    },
    centerDiv: function (obj) {
        obj.css({
            "position": "absolute",
            "top": (($(window).height() - obj.height()) / 2) + "px",
            "left": (($(window).width() - obj.width()) / 2) + "px"
        });
        return obj;//返回值供给链式操作
    }
};


//　(function(){})表示一个匿名函数。function(arg){...}定义了一个参数为arg的匿名函数.
//  使用(function(arg){...})(param)来调用这个匿名函数。其中param是传入这个匿名函数的参数。
//table变换颜色插件
;
(function ($) {
    $.fn.tableChangeColor = function (opations) {
        //默认配置
        var defaults = {
            eventType_mouseOver: "mouseover",
            eventType_mouseOut: "mouseout",
            evenRowClass: "evenRow",
            oddRowClass: "oddRow",
            currentRowClass: "currentRow"
        };

        //合并默认值和参数带入值
        var opation = $.extend(defaults, opations);//defaults的属性延长opations的属性覆盖
        //var opation = $.extend(opations, defaults);//opations的属性延长defaults的属性覆盖

        //主参数可能是数组，可能是一个元素
        $(this).each(function () {
            $(this).find("tr:even").addClass(opation.evenRowClass).end().find("tr:odd").addClass(opation.oddRowClass);

            //不能直接赋予动作函数
            //$(this).find("tr").hover(function () {
            //    $(this).toggleClass(defaults.currentRowClass);
            //});
            $(this).find("tr").bind(opation.eventType_mouseOver, function () {
                $(this).addClass(opation.currentRowClass);
            }).bind(opation.eventType_mouseOut, function () {
                $(this).removeClass(opation.currentRowClass);
            });
        });

        return $(this);//返回值供给链式操作
    }
})(jQuery);


(function ($) {
    $.fn.tabChange = function (opations) {
        var defaults = {
            root: ".tab",
            data_li: ".tabNav > li",
            data_div: ".tabContent > div",
            eventType_click: "click",
            activeLi: "activeLi",
            activeDiv: "activeDiv"
        };

        var opation = $.extend(defaults, opations);

        $(this).each(function () {
            $(this).find(opation.data_li).bind(opation.eventType_click, function () {
                $(this).addClass(opation.activeLi).siblings().removeClass(opation.activeLi);
                //parents() 自定义寻找 找id为#tab 找class为.tab 找tagName为div
                $(this).parents(opation.root).find(opation.data_div).eq($(this).index()).addClass(opation.activeDiv).siblings().removeClass(opation.activeDiv);
            });
        });

        return $(this);//返回值供给链式操作
    }
})(jQuery);


// UlMoving JavaScript Document
(function ($) {
    $.fn.myScroll = function (options) {
        //默认配置
        var defaults = {
            speed: 40,  //滚动速度,值越大速度越慢
            rowHeight: 24 //每行的高度
        };

        var opts = $.extend({}, defaults, options), intId = [];

        function marquee(obj, step) {

            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function (i) {
            var sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
            intId[i] = setInterval(function () {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);
            });

        });

    }

})(jQuery);

