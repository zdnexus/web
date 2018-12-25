/**
 * Created by zhongdong on 18/7/4.
 */
// String 类型
var str = 'muyy';
// Boolen 类型
var isBool1 = false;
// Number 类型
var number = 10;
// Array 类型
var arr = [1, 2, 3, 4, 5];
var arr2 = [1, 2, 3, 4, 5];
var arr3 = ['1', '2'];
var arr4 = ['1', '2'];
// Enums 类型
var Role;
(function (Role) {
    Role[Role["Employee"] = 3] = "Employee";
    Role[Role["Manager"] = 4] = "Manager";
    Role[Role["Admin"] = 5] = "Admin";
})(Role || (Role = {}));
var role = Role.Employee;
// Any 类型
var notSure = 10;
var notSure2 = [1, "2", false];
// Void 类型
function alertName() {
    console.log('My name is muyy');
}
//# sourceMappingURL=1.数据类型.js.map