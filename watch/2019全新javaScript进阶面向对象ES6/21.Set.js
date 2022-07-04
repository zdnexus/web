/**
 * Created by zhongdong on 2022/7/3
 * Url :
 */

const s = new Set([1, 2, 3])
console.log(s)
console.log(s.size)
console.log(s.length)

const s2 = new Set([1, 2, 2, 3, 3])
console.log(Array.from(s2))
console.log([...s2])
s2.add(4)
console.log(s2)
s2.delete(3)
console.log(s2)
console.log(s2.has(1))
s2.clear()
console.log(s2)
console.log(s2.size)


const s3 = new Set([1, 2, 3])
s3.forEach(item => {
  console.log(item)
})