/**
 * Created by Administrator on 2015/12/17.
 */


(function ($) {
    $.fn.adaptAuto = function (opations) {

        //默认配置
        var defaults = {
            fontSize: 12
        };

        //合并默认值和参数带入值
        var opation = $.extend(defaults, opations);

        $(this).each(function () {
            $(this).css({
                width: "100%",
                height: "100%",
                display: "block",
                overflow: "hidden",
                "font-size": opation.fontSize
            })
        });

        return $(this);//返回供给链式操作
    };

    $.fn.scrollY=function(opations){


    }
})(jQuery);