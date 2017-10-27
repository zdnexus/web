import React from 'react';
// import {
//   HashRouter,
//   Switch,
//   Route,
//   Redirect
// } from 'react-router-dom';
import {
  Router,
  Route,
  hashHistory
} from 'react-router';

import Home from 'module/home';

// import Header from 'bundle-loader?lazy!component/header';
// import header from 'bundle-loader?lazy!model/header';
// import Login from 'bundle-loader?lazy!module/login';
// // 风险评测
// import Risk from 'bundle-loader?lazy!module/risk';
// import RiskAnswer from 'bundle-loader?lazy!module/risk/answer';
// import RiskResult from 'bundle-loader?lazy!module/risk/result';
// // 开户绑卡
// import Open from 'bundle-loader?lazy!module/open';
// import OpenIdcard from 'bundle-loader?lazy!module/open/idcard';
// import OpenPass from 'bundle-loader?lazy!module/open/pass';
// // 富盈5号各个页面
// import EarnInfo from 'bundle-loader?lazy!module/templateFYWH/earnInfo';
// import DealInfo from 'bundle-loader?lazy!module/templateFYWH/dealInfo';
// import OrderDetail from 'bundle-loader?lazy!module/templateFYWH/orderDetail';
// import FYWHBuy from 'bundle-loader?lazy!module/templateFYWH/buy';
// import FYWHDetail from 'bundle-loader?lazy!module/templateFYWH/detail';
// import AgreementDemand from 'bundle-loader?lazy!module/templateFYWH/agreement';
// import Sell from 'bundle-loader?lazy!module/templateFYWH/sell';
// // import Position from 'module/templateFYWH/position';
// import PositionFuyingFive from 'bundle-loader?lazy!module/templateFYWH/asset';
// import FYWHBuyResult from 'bundle-loader?lazy!module/templateFYWH/buyResult';
// import FYWHSellResult from 'bundle-loader?lazy!module/templateFYWH/sellResult';
// // 富盈7号页面
// import FYQHDetail from 'bundle-loader?lazy!module/templateFYQH/detail';
// import FYQHBuy from 'bundle-loader?lazy!module/templateFYQH/buy';
// import FYQHBuyResult from 'bundle-loader?lazy!module/templateFYQH/buyResult';
// import AgreementRegular from 'bundle-loader?lazy!module/templateFYQH/agreement';
// // import PayRule from 'module/templateFYQH/payRule';
// import PositionFuyingSeven from 'bundle-loader?lazy!module/templateFYQH/asset';
// // 在途资金
// import FundArrival from 'bundle-loader?lazy!module/fundArrival';
// // 收银台
// import Cashier from 'bundle-loader?lazy!module/cashier';
// import Center from 'bundle-loader?lazy!module/center';
// import Property from 'bundle-loader?lazy!module/property/property';
// // 我的资产
// import PropertyMine from 'bundle-loader?lazy!module/propertyMine';
// // 我的资产订单
// import PropertyOrderList from 'bundle-loader?lazy!module/propertyOrderList';
// // 我的资产订单详情
// import PropertyOrderDetail from 'bundle-loader?lazy!module/propertyOrderDetail';
// // 注册、登录
// import WxLogin from 'bundle-loader?lazy!module/wxLogin/login';
// import WxInputpwd from 'bundle-loader?lazy!module/wxLogin/inputpwd';
// import WxRegister from 'bundle-loader?lazy!module/wxLogin/register';
// // 找回密码
// import WxResetNewPassword from 'bundle-loader?lazy!module/wxLogin/resetNewPassword';
//
// import ProductList from 'module/productList/list'; //产品列表
// import ProductListMore from 'bundle-loader?lazy!module/productList/moreList'; //平安汇金更多理财产品的分页
//
// import ProductHuiJin from 'bundle-loader?lazy!module/templateHuiJin/detail'; //平安汇金
//
// import ProductHuiJinAgreement from 'bundle-loader?lazy!module/templateHuiJin/agreement';//汇金协议
// import ProductHuiJinPosition from 'bundle-loader?lazy!module/templateHuiJin/position';//汇金的持仓
// import ProductHuiJinTransactionDetail from 'bundle-loader?lazy!module/templateHuiJin/transactionDetail'; //汇金产品交易明细
// import ProductHuiJinTransactionDetailItem from 'bundle-loader?lazy!module/templateHuiJin/payDetail';
// import ProductHuiJinBuy from 'bundle-loader?lazy!module/templateHuiJin/buy';//平安汇金买入
// import ProductHuiJinBuyResult from 'bundle-loader?lazy!module/templateHuiJin/payResult';//平安汇金买入结果页面
// //常见问题
// import FrequentlyQuestion from 'bundle-loader?lazy!module/frequentQuestion';


function lazyLoadComponent(lazyModule) {
  return (location, cb) => {
    lazyModule(module => cb(null, module.default));
  };
}

export default function App() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Home} title="项目名称" />
      <Route path="/login" getComponent={lazyLoadComponent(Login)} />
      {/*<Route path="/payrule" component={PayRule} title="交易规则" />*/}
      {/* /risk* query { back: 完成后跳转到的地址 } , 其他参数参考 risk/index.js 注释 */}
      <Route path="/risk" getComponent={lazyLoadComponent(Risk)} title="风险评测" />
      <Route path="/risk/answer" getComponent={lazyLoadComponent(RiskAnswer)} title="风险评测" />
      <Route path="/risk/result" getComponent={lazyLoadComponent(RiskResult)} title="风险评测结果" />
      {/* /open* query { back: 完成后跳转到的地址 } */}
      <Route path="/open" getComponent={lazyLoadComponent(Open)} title="开户" />
      <Route path="/open/idcard" getComponent={lazyLoadComponent(OpenIdcard)} title="身份验证" />
      <Route path="/open/pass" getComponent={lazyLoadComponent(OpenPass)} title="" />
	    <Route path="/center" getComponent={lazyLoadComponent(Center)} />
      <Route path="/property" getComponent={lazyLoadComponent(Property)} title="资产中心"/>
      {/* /wxlogin* query { backUrl: 完成后跳转到的地址 } */}
      <Route path="/wxlogin" getComponent={lazyLoadComponent(WxLogin)} title="验证手机号" />
      <Route path="/wxinputpwd" getComponent={lazyLoadComponent(WxInputpwd)} title="登录" />
      <Route path="/wxregister" getComponent={lazyLoadComponent(WxRegister)} title="设置登录密码" />
      <Route path="/wxresetNewPassword" getComponent={lazyLoadComponent(WxResetNewPassword)} title="设置一个新密码" />

      {/* 我的订单部分 */}
      <Route path="/propertyMine" getComponent={lazyLoadComponent(PropertyMine)} />
      <Route path="/propertyOrderList" getComponent={lazyLoadComponent(PropertyOrderList)} />
      <Route path="/propertyOrderDetail/:orderDetail" getComponent={lazyLoadComponent(PropertyOrderDetail)} />

      {/* 收银台 */}
      <Route path="/cashier" getComponent={lazyLoadComponent(Cashier)} />
  
      {/* 亿超市首页 */}
        <Route path="/product(/:code)" component={ProductList} title="金融亿超市"/>
      {/* 亿超市首页 --> 更多产品 */}
        <Route path="/product/list/:type" getComponent={lazyLoadComponent(ProductListMore)} title="更多理财产品" />
      {/* 亿超市首页 --> 产品详情 */}
        <Route path="/product/detail/:productCode/:tempId" getComponent={lazyLoadComponent(ProductHuiJin)} title="平安汇金" />
      {/* 亿超市首页 --> 产品详情 --> 产品相关协议 */}
        <Route path="/product/agreement/:productCode/:type" getComponent={lazyLoadComponent(ProductHuiJinAgreement)} title="产品相关协议"/>
      {/* 亿超市首页 --> 产品详情 --> 买入 */}
        <Route path="/product/buy/:productCode/:tempId" getComponent={lazyLoadComponent(ProductHuiJinBuy)} title="汇金买入"/>
      {/* 亿超市首页 --> 产品详情 --> 买入 --> 收银台(诗沂)--> 买入结果页面 */}
        <Route path="/product/buyResult/:productCode/:tempId/:payStatus/:payOrderNo/:orderNo/:amount" getComponent={lazyLoadComponent(ProductHuiJinBuyResult)} title="汇金买入结果"/>
      {/* 亿超市首页 --> 资产中心 --> 产品持仓详情 */}
        <Route path="/product/position/:productCode/:tempId" getComponent={lazyLoadComponent(ProductHuiJinPosition)} title="汇金产品持仓页面"/>
      {/* 亿超市首页 --> 资产中心 --> 产品持仓详情 --> 产品交易明细列表 */}
      {/* 亿超市首页 --> 资产中心 --> 产品持仓在途资金 --> 产品交易明细列表 */}
        <Route path="/product/transactionDetail/:productCode(/:flag)" getComponent={lazyLoadComponent(ProductHuiJinTransactionDetail)} title="汇金交易明细"/>
      {/* 亿超市首页 --> 资产中心 --> 产品持仓详情 --> 产品交易明细列表 --> 产品交易详情 */}
        <Route path="/product/transactionDetailItem/:productCode/:lv2CatogoryCode/:productCatogoryCode/:orderNo" getComponent={lazyLoadComponent(ProductHuiJinTransactionDetailItem)} title="汇金的交易明细的详情"/>
      {/* end 平安汇金产品相关协议*/}
      <Route path="/faq" getComponent={lazyLoadComponent(FrequentlyQuestion)} title="常见问题" />
      
      {/*富盈5号详情页*/}
      <Route path="/detail/fywh/:productCode/:tempId" getComponent={lazyLoadComponent(FYWHDetail)} title="富盈5号" />
      {/*富盈5号协议页*/}
      <Route path='/agreement/:productCode' getComponent={lazyLoadComponent(AgreementDemand)} title="产品相关协议" />
      {/*富盈5号买入页*/}
      <Route path="/buyfywh/:productCode/:tempId" getComponent={lazyLoadComponent(FYWHBuy)} title="买入" />
      {/*富盈5号买入结果页*/}
      <Route path="/buy/demand-result" getComponent={lazyLoadComponent(FYWHBuyResult)} title="买入结果" />
      {/*富盈5号卖出结果页*/}
      <Route path="/sell-result/fywh/:productCode/:tempId" getComponent={lazyLoadComponent(FYWHSellResult)} title="卖出结果" />
      {/*富盈5号持仓页*/}
      <Route path="/position/fywh/:productCode/:tempId" getComponent={lazyLoadComponent(PositionFuyingFive)} title="富盈5号持仓页" />
      {/*富盈5号收益明细*/}
      <Route path="/earninfo/:productCode" getComponent={lazyLoadComponent(EarnInfo)} title="收益明细" />
      {/*富盈5号订单列表*/}
      <Route path="/dealinfo/:productCode" getComponent={lazyLoadComponent(DealInfo)} title="交易明细"/>
      {/*富盈5号订单详情*/}
      <Route path="/orderdetail/:orderDetail" getComponent={lazyLoadComponent(OrderDetail)} title="交易明细" />
      {/*富盈5号卖出页*/}
      <Route path="/fywh/sell/:productCode/:totalAmount/:tempId" getComponent={lazyLoadComponent(Sell)} title="卖出页" />

      {/*富盈7号详情页*/}
      <Route path="/detail/fyqh/:productCode/:tempId" getComponent={lazyLoadComponent(FYQHDetail)} title="" />
      {/*富盈7号买入页*/}
      <Route path="/buyfyqh/:productCode/:tempId" getComponent={lazyLoadComponent(FYQHBuy)} title="买入" />
      {/*富盈7号相关协议*/}
      <Route path='/agreement-regular/:productCode' getComponent={lazyLoadComponent(AgreementRegular)} title="产品相关协议" />
      {/*富盈7号买入结果页*/}
      <Route path="/buy/regular-result" getComponent={lazyLoadComponent(FYQHBuyResult)} title="买入结果" />
      {/*富盈7号持仓页*/}
      <Route path="/position/fyqh/:productCode/:tempId" getComponent={lazyLoadComponent(PositionFuyingSeven)} title="富盈7号持仓页" />

      {/*在途资金页*/}
      <Route path="/fundArrival/:productCode" getComponent={lazyLoadComponent(FundArrival)} title="资产动态" />
    </Router>
  );
};
