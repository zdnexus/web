<template>
  <view class="content">
    <echarts/>
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
</template>

<script>
  import echarts from '../../components/echarts/index'
  import { vehicleHalfYear, orderNum } from '../../api/index'

  export default {
    components: {
      echarts
    },
    data() {
      return {
        tableLoading: false,
        orderNum: {},
      }
    },
    onTabItemTap(e) {
      this.getData()
    },
    onLoad() {
      this.getData()
    },
    methods: {
      getData() {
        this.tableLoading = true
        vehicleHalfYear().then(res => {

        })
        orderNum().then(res => {
          this.tableLoading = false
          this.orderNum = res.data
        })
      },
    },
  }
</script>

<style lang="scss">
  .content {
    display: flex;

    .uni-table {
      width: 100%;
    }
  }
</style>
