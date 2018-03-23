/**
 * Created by zdnexus on 2015/10/25.
 */

//�Զ��庯��
//1.��jQuery���2��ȫ�ֺ���
jQuery.zdAlert = function (str) {
    alert(str);
};

jQuery.zdAlert2 = function (str) {
    alert(str + "!!!");
};

//2.��extend()�����ϲ������������
jQuery.extend({
    zdAlert: function (str) {
        alert(str);
    },
    zdAlert2: function (str) {
        alert(str + "!!!");
    }
});

//3.ʹ�������ռ�
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
        return obj;//����ֵ������ʽ����
    }
};


//��(function(){})��ʾһ������������function(arg){...}������һ������Ϊarg����������.
//  ʹ��(function(arg){...})(param)�����������������������param�Ǵ���������������Ĳ�����
//table�任��ɫ���
;
(function ($) {
    $.fn.tableChangeColor = function (opations) {
        //Ĭ������
        var defaults = {
            eventType_mouseOver: "mouseover",
            eventType_mouseOut: "mouseout",
            evenRowClass: "evenRow",
            oddRowClass: "oddRow",
            currentRowClass: "currentRow"
        };

        //�ϲ�Ĭ��ֵ�Ͳ�������ֵ
        var opation = $.extend(defaults, opations);//defaults�������ӳ�opations�����Ը���
        //var opation = $.extend(opations, defaults);//opations�������ӳ�defaults�����Ը���

        //���������������飬������һ��Ԫ��
        $(this).each(function () {
            $(this).find("tr:even").addClass(opation.evenRowClass).end().find("tr:odd").addClass(opation.oddRowClass);

            //����ֱ�Ӹ��趯������
            //$(this).find("tr").hover(function () {
            //    $(this).toggleClass(defaults.currentRowClass);
            //});
            $(this).find("tr").bind(opation.eventType_mouseOver, function () {
                $(this).addClass(opation.currentRowClass);
            }).bind(opation.eventType_mouseOut, function () {
                $(this).removeClass(opation.currentRowClass);
            });
        });

        return $(this);//����ֵ������ʽ����
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
                //parents() �Զ���Ѱ�� ��idΪ#tab ��classΪ.tab ��tagNameΪdiv
                $(this).parents(opation.root).find(opation.data_div).eq($(this).index()).addClass(opation.activeDiv).siblings().removeClass(opation.activeDiv);
            });
        });

        return $(this);//����ֵ������ʽ����
    }
})(jQuery);


// UlMoving JavaScript Document
(function ($) {
    $.fn.myScroll = function (options) {
        //Ĭ������
        var defaults = {
            speed: 40,  //�����ٶ�,ֵԽ���ٶ�Խ��
            rowHeight: 24 //ÿ�еĸ߶�
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

