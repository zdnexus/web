/**
 * Created by zhongdong on 18/7/4.
 */

// String 类型
let str: String = 'muyy'

// Boolen 类型
let isBool1: boolean = false

// Number 类型
let number: number = 10

// Array 类型
let arr: number[] = [1, 2, 3, 4, 5]
let arr2: Array<number> = [1, 2, 3, 4, 5]
let arr3: string[] = ['1', '2']
let arr4: Array<string> = ['1', '2']

// Enums 类型
enum Role {Employee = 3, Manager, Admin}
let role: Role = Role.Employee

// Any 类型
let notSure: any = 10
let notSure2: any[] = [1, "2", false]

// Void 类型
function alertName(): void {
    console.log('My name is muyy')
}