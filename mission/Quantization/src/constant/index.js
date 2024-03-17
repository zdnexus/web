/**
 * Created by zhongdong on 2024/3/9
 * Url :
 */

export const BaseURL = 'https://zdnexus.com/gp'

export const options = [
  {
    label: '当日涨停',
    value: 'fullUp'
  },
  {
    label: '当日中途涨停',
    value: 'fullUpTop'
  },
  {
    label: '60日内高位涨停',
    value: 'fullUpOnlyHighest'
  },
  {
    label: '60日内低位涨停',
    value: 'fullUpOnlyLowest'
  },
  {
    label: '20日内回到涨停前',
    value: 'fullUpRestart'
  }
]
