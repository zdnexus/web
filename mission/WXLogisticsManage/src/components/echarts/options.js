/**
 * Created by zhongdong on 2023/10/29
 * Url :
 */

export function getOption(points, dates) {
  dates = ['8.14', '8.15', '8.16', '8.17', '8.18', '8.19', '8.20']
  points = [356, 456, 567, 234, 345, 456, 567]
  // 指定图表的配置项和数据
  var option = {
    //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
    //用他可以配置图形在父元素中的位置
    grid: {
      top: 30,
      left: 14,
      width: '82%',
      height: '45%'
    },
    //x轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      // show: false
    },
    //y轴
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      show: false
    },
    //数据
    series: [{
      connectNulls: true,
      name: 'A',
      type: 'line',
      // smooth: true,
      data: points,
      lineStyle: {
        normal: {
          color: '#17998C',
        }
      },
      areaStyle: {
        color: '#A2F5EC',
        opacity: 0.5
      },
      label: {
        show: true,
        position: 'top',
        distance: -28,
        textStyle: {
          fontSize: 12,
          color: '#17998C',
        },
        //因为提示数值官方只能设置同一位置，而我想要一上一下，用到了格式化，其实很好理解就是换行展示
        formatter: function (value) {
          let valueType
          if (value.dataIndex % 2 != 0) {
            valueType = 'shuang'
            return value.data
          } else {
            valueType = 'dan'
            return value.data + '\n\n\n'
          }
        },
      }
    }]
  }
  return option
}
