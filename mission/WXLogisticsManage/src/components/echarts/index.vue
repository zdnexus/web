<template>
  <ec-canvas style="width: 100%; height: 200px;" id="mychart_bloodPressure" canvas-id="mychart-line" ec="{{ ec }}"></ec-canvas>
</template>

<script>
  import * as echarts from './echarts.min'
  import { getOption } from './options'

  export default {
    data() {
      return {}
    },
    onLoad() {
      this.getData()
    },
    methods: {
      getData() {
        //小程序的仿dom操作获取元素
        this.echartsComponnet = this.selectComponent('#mychart')
        this.echartsComponnet.init((canvas, width, height) => {
          // 初始化图表
          const Chart = echarts.init(canvas, null, {
            width: width,
            height: height
          })
          //处理数据我放到了一个单独的js
          Chart.setOption(getOption(this.data.pointsA, this.data.dates))
          // 注意这里一定要返回 chart 实例，否则会影响事件处理等
          return Chart
        })
      },
    },
  }
</script>

<style lang="scss">
</style>
