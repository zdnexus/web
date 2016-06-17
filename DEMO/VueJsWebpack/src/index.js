'use strict';

// 引入vue以及vue-router
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 引入组件！直接使用es6的语法
import zl from './components/zl.vue';
import zd from './components/zd.vue';
import zs from './components/zs.vue';
import hello from './components/hello.vue';

//开启debug模式
Vue.config.debug = true;

// new Vue(app);//这是上一篇用到的，新建一个vue实例，现在使用vue-router就不需要了。
// 路由器需要一个根组件。
var App = Vue.extend({});

// 创建一个路由器实例
var router = new VueRouter();

// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({//定义路由映射
    '/index':{
        name:'zd',
        component:zd,
        subRoutes:{
            // 当匹配到/index/hello时，会在index的<router-view>内渲染
            '/hello':{
                name:'hello',
                component:hello
            }
        }
    },
    '/zl':{//访问地址
        name:'zl',//定义路由的名字。方便使用。
        component:zl//引用的组件名称，对应上面使用`import`导入的组件
        //component:require("components/app.vue")//还可以直接使用这样的方式也是没问题的。不过会没有import集中引入那么直观
    },
    '/zs': {
        name:'zs',
        component: zs
    },
    '/hello': {
        name:'hello',
        component: hello
    }
});

router.redirect({//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*':'/index'//重定向任意未匹配路径到/zl
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app');