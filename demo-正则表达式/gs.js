const Reg = /(^.*)(a|b)+(.*$)/;

var s = 'a';
console.log(Reg.test(s));
var s = 'b';
console.log(Reg.test(s));
var s = 'ab';
console.log(Reg.test(s));
var s = 'ba';
console.log(Reg.test(s));

var s = 'ccc'
console.log(Reg.test(s));
var s = 'ccca'
console.log(Reg.test(s));