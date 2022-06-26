/**
 * Created by zhongdong on 2022/6/18
 * Url :
 */

var reg = new RegExp(/123/)
console.log(reg.test('12'))
console.log(reg.test('12345'))
console.log(reg.test(12345))

// var reg = /123/
// console.log(reg.test('12'))
// console.log(reg.test('12345'))
// console.log(reg.test(12345))

// var reg = /abc/
// console.log(reg.test('abc'))
// console.log(reg.test('abcd'))
// console.log(reg.test('aabcd'))

// // ^开头
// var reg = /^abc/
// console.log(reg.test('abc'))
// console.log(reg.test('abcd'))
// console.log(reg.test('aabcd'))

// // ^开头，$结尾
// var reg = /^abc$/
// console.log(reg.test('abc'))
// console.log(reg.test('abcd'))
// console.log(reg.test('aabcd'))
// console.log(reg.test('abbc'))

// // [] 字符集合
// var reg = /[abc]/
// console.log(reg.test('abc'))
// console.log(reg.test('abcd'))
// console.log(reg.test('aabcd'))


// - 范围
// var reg = /^[a-zA-Z0-9-]$/
// console.log(reg.test('a'))
// console.log(reg.test('A'))
// console.log(reg.test('8'))
// console.log(reg.test('-'))
// console.log(reg.test('!'))

// // [] 取反
// var reg = /^[^a-zA-Z0-9-]$/
// console.log(reg.test('a'))
// console.log(reg.test('A'))
// console.log(reg.test('8'))
// console.log(reg.test('-'))
// console.log(reg.test('!'))

// // * >=0
// var reg = /^a*$/
// console.log(reg.test(''))
// console.log(reg.test('a'))
// console.log(reg.test('aaa'))
// console.log(reg.test('aaaaaaaaaaaa'))

// // + >=1
// var reg = /^a*$/
// console.log(reg.test(''))
// console.log(reg.test('a'))
// console.log(reg.test('aaa'))
// console.log(reg.test('aaaaaaaaaaaa'))

// // ? 1||0
// var reg = /^a?$/
// console.log(reg.test(''))
// console.log(reg.test('a'))
// console.log(reg.test('aaa'))
// console.log(reg.test('aaaaaaaaaaaa'))

// // {} 量词，描述左边的字符
// var reg = /^a{3}$/
// console.log(reg.test(''))
// console.log(reg.test('a'))
// console.log(reg.test('aaa'))
// console.log(reg.test('aaaaaaaaaaaa'))


// // {3,} 重复>=3次
// var reg = /^a{3,}$/
// console.log(reg.test(''))
// console.log(reg.test('a'))
// console.log(reg.test('aaa'))
// console.log(reg.test('aaaaaaaaaaaa'))

// // {3,6} 重复>=3次，<=6次
// var reg = /^a{3,6}$/
// console.log(reg.test(''))
// console.log(reg.test('a'))
// console.log(reg.test('aaa'))
// console.log(reg.test('aaaaaa'))
// console.log(reg.test('aaaaaaaaaaaa'))

// // demo1
// var reg = /^[a-zA-Z0-9_-]{6,8}$/
// console.log(reg.test('andy-red'))
// console.log(reg.test('andy_red'))
// console.log(reg.test('andy007'))
// console.log(reg.test('andy0077'))
// console.log(reg.test('andy00777'))
// console.log(reg.test('andy007@'))

// // demo2
// var reg = /^[a-zA-Z0-9_-]{6,16}$/
// console.log(reg.test('andy-red'))
// console.log(reg.test('andy_red'))
// console.log(reg.test('andy007'))
// console.log(reg.test('andy0077'))
// console.log(reg.test('andy00777'))
// console.log(reg.test('andy007@'))

// // 预定义类
// \d 0-9
// var reg = /^[\d]{1,3}$/
// console.log(reg.test(123))
// console.log(reg.test(1234))
// console.log(reg.test('123'))
// console.log(reg.test('abc'))

// \D 非0-9
// var reg = /^[\D]{1,3}$/
// console.log(reg.test(123))
// console.log(reg.test(1234))
// console.log(reg.test('123'))
// console.log(reg.test('abc'))

// // \w 所有字母，数字，下划线
// var reg = /^[\w]{1,3}$/
// console.log(reg.test(123))
// console.log(reg.test(1234))
// console.log(reg.test('123'))
// console.log(reg.test('abc'))

// // \W 非所有字母，数字，下划线
// var reg = /^[\W]{1,3}$/
// console.log(reg.test(123))
// console.log(reg.test(1234))
// console.log(reg.test('123'))
// console.log(reg.test('abc'))
// console.log(reg.test('!'))
// console.log(reg.test('!!!'))
// console.log(reg.test('!!!!'))

// \s 空格，回车
// \S 非空格，回车的字符

// // 关键字过滤，g全局，i忽略大小写
// var str = '激情a的老师上课很有激情A'
// s = str.replace(/激情a/gi, '**')
// console.log(s)
