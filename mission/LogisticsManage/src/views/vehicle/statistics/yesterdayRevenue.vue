<template>
  <div class="app-container">
    <h5>昨日报价台计：<san class="red">{{ list.totalCost }}</san>，昨日成本台计：<san class="red">{{ list.totalQuotation }}</san>，昨日利润台计：<san class="red">{{ list.totalProfit }}</san></h5>
    <el-table v-loading="listLoading" :key="listKey" :data="list.vehicleYesterdayOrderList" border fit highlight-current-row>
      <el-table-column label="车架号" prop="vin" align="center" width="230">
        <template slot-scope="{row}">
          <span>{{ row.vin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="报价合计" prop="costFree" align="center" width="230">
        <template slot-scope="{row}">
          <span>{{ row.costFree }}</span>
        </template>
      </el-table-column>

      <el-table-column label="成本合计" prop="quotationFree" align="center" width="230">
        <template slot-scope="{row}">
          <span>{{ row.quotationFree }}</span>
        </template>
      </el-table-column>

      <el-table-column label="利润" prop="profitFree" align="center" width="230">
        <template slot-scope="{row}">
          <span>{{ row.profitFree }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { vehicleYesterdayOrder } from '@/api/vehicle/statistics'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE
  } from '@/constant'

  export default {
    data() {
      return {
        listQuery: {
          name: undefined,
          pageNum: PAGE_NUM,
          pageSize: PAGE_SIZE
        },
        listLoading: false,
        listKey: 0,
        list: undefined
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        vehicleYesterdayOrder(this.listQuery).then((res) => {
          this.list = res.data
          this.listLoading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .red {
    color: red
  }
</style>
