/**
 * Created by zhongdong on 2022/6/18
 * Url :
 */

function fb(n) {
  if (n === 1 || n === 2) {
    return 1
  }
  return fb(n - 1) + fb(n - 2)
}

console.log(fb(4))