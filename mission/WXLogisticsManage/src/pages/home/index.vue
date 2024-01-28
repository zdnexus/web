<template>
  <view class="content">
    <canvas canvas-id="myid" id="myid" @tap="tap"></canvas>

    <view>
      <uni-section class="mb-10" title="商品车订单数据">
        <uni-table class="table" border stripe :loading="tableLoading" emptyText="暂无更多数据">
          <uni-tr>
            <uni-th width="75">昨日订单数</uni-th>
            <uni-th width="75">历史订单数</uni-th>
          </uni-tr>
          <uni-tr>
            <uni-td>{{orderNum.yesterDayOrderNum}}</uni-td>
            <uni-td>{{orderNum.tatolOrderNum}}</uni-td>
          </uni-tr>
        </uni-table>
      </uni-section>
    </view>
  </view>
</template>

<script>
  import uCharts from './u-charts.min'
  import { vehicleHalfYear, orderNum } from '@/api/index'

  const uChartsInstance = {}

  export default {
    data() {
      return {
        tableLoading: false,
        orderNum: {},
      }
    },
    onTabItemTap() {
      this.getData()
    },
    onLoad() {
      this.getData()
    },
    methods: {
      getData() {
        this.tableLoading = true
        vehicleHalfYear().then(res => {
          const data = {
            categories: res.data.map(item => item.orderYearMonth),
            series: [
              {
                name: '订单收入',
                data: res.data.map(item => item.orderIncome)
              },
              {
                name: '订单费用',
                data: res.data.map(item => item.orderCost)
              },
              {
                name: '订单利润',
                data: res.data.map(item => item.orderProfit)
              }
            ]
          }
          this.drawCharts('myid', data)
        })
        orderNum().then(res => {
          this.tableLoading = false
          this.orderNum = res.data
        })
      },
      drawCharts(id, data) {
        const ctx = uni.createCanvasContext(id, this)
        uChartsInstance[id] = new uCharts({
          type: 'column',
          context: ctx,
          width: 375,
          height: 300,
          categories: data.categories,
          series: data.series,
          animation: true,
          background: '#FFFFFF',
          color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
          padding: [15, 15, 0, 5],
          enableScroll: false,
          legend: {},
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            data: [
              {
                min: 0
              }
            ]
          },
          extra: {
            column: {
              type: 'group',
              width: 12,
              activeBgColor: '#000000',
              activeBgOpacity: 0.08
            }
          }
        })
      },
      tap(e) {
        uChartsInstance[e.target.id].touchLegend(e)
        uChartsInstance[e.target.id].showToolTip(e)
      }
    },
  }
</script>

<style lang="scss">
  .content {

    #myid {
      width: 375px;
      height: 300px;
      margin-bottom: 24px;
    }

    .uni-table {
      width: 100%;
    }
  }
</style>
