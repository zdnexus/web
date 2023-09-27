<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :key="listKey" :data="list" border fit highlight-current-row>
      <el-table-column label="仓库名" prop="warehouseName" align="center" width="500">
        <template slot-scope="{row}">
          <span>{{ row.warehouseName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="库存车数量" prop="number" align="center" width="500">
        <template slot-scope="{row}">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { vehicleTotalNumber } from '@/api/vehicle/statistics'
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
        vehicleTotalNumber(this.listQuery).then((res) => {
          this.list = res.data
          this.listLoading = false
        })
      }
    }
  }
</script>
