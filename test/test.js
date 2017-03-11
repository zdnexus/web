var str = 'https://maam-dmzstg3.pingan.com.cn:56443/cmnres/gold/index.html#/orderDetail/20170309015155731?pluginId=PA02100000000_02_SWJ&extraParamValue=%7B%22orderNo%22%3A%2220170309015155731%22,%22payOrderNo%22%3A%222017030901433165%22,%22code%22%3A%22248999%22%7D';

var s = str.substr(str.indexOf('?') + 1);

console.log(s);

console.log(encodeURIComponent(str))

console.log(encodeuricomponent(s))