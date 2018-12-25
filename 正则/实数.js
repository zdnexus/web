const Reg = /^(0+)?(\d{0,8})(\.(\d{1,2})?(0+?))?$/

console.log(Reg.test(''))// true
console.log(Reg.test('a'))// false
console.log(Reg.test('1a'))// false
console.log(Reg.test('a1'))// false
console.log(Reg.test('.1'))// true      .1=0.1
console.log(Reg.test('.11'))// true     .11=0.11
console.log(Reg.test('.111'))// false
console.log(Reg.test('1.'))// true      1.=1
console.log(Reg.test('11.'))// true     11.=11
console.log(Reg.test('111.'))// true    111.=111
console.log(Reg.test('1.1'))// true
console.log(Reg.test('11.11'))// true
console.log(Reg.test('111.111'))// false
console.log(Reg.test('0.1'))// true
console.log(Reg.test('0.11'))// true
console.log(Reg.test('0.111'))// false
console.log(Reg.test('01'))// true      01=1
console.log(Reg.test('011'))// true     011=11
console.log(Reg.test('0111'))// true    0111=111
console.log(Reg.test('11111111'))// true
console.log(Reg.test('11111111.'))// true
console.log(Reg.test('11111111.0'))// true
console.log(Reg.test('11111111.00'))// true
console.log(Reg.test('11111111.000'))// false
console.log(Reg.test('111111111'))// false
console.log(Reg.test('1111111111'))// false
console.log(Reg.test('11111111111'))// false
console.log(Reg.test('0111111111'))// false
console.log(Reg.test('99999999.99'))// true
console.log(Reg.test('99999999.990'))// true
console.log(Reg.test('99999999.9900'))// true
console.log(Reg.test('099999999.99'))// true
console.log(Reg.test('099999999.999'))// false


// const Reg_1 = /\d/
// console.log(Reg_1.test('1a'))
// console.log(Reg_1.test('1'))
// console.log(Reg_1.test('1.'))
// console.log(Reg_1.test('1.0'))
// console.log(Reg_1.test('1.00'))
// console.log(Reg_1.test('1.000'))
// console.log()


// const Reg_2 = /[0-9]/g
// console.log(Reg_2.test('a'))
// console.log(Reg_2.test('a1'))
// console.log(Reg_2.test('1a'))
// console.log(Reg_2.test('1'))
// console.log(Reg_2.test('1.'))
// console.log(Reg_2.test('1.0'))
// console.log(Reg_2.test('1.00'))
// console.log(Reg_2.test('1.000'))
