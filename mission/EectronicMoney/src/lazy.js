/**
 * Created by zhongdong on 2023/3/5
 * Url :
 */

const lazy = document.querySelectorAll('[data-lazy]')
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((dom) => {
    if (dom.isIntersecting) {
      dom.target.removeAttribute('data-lazy')
    }
  })
})
lazy.forEach((el) => {
  intersectionObserver.observe(el)
})