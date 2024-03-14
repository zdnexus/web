/**
 * Created by zhongdong on 2024/3/10
 * Url :
 */

export const timestampToString = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}


export const getDayOfWeek = (date) => {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return days[new Date(date).getDay()]
}
