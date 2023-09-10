<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" class="filter-item" style="width: 200px" placeholder="输入车架号" @keyup.enter.native="handleFilter"></el-input>

      <el-button type="primary" icon="el-icon-search" class="filter-item" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="id" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车架号" prop="vin" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.vin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车辆类型" prop="vehicleType" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.vehicleType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户姓名" prop="clientName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商" prop="supplierName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.supplierName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务项" prop="serviceName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.serviceName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="orderStatus" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ ORDER_EXAMINE_STATUS_OBJ[row.orderStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" prop="remark" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { vehicleOrderList, } from '@/api/vehicle/order'
  import { NODE_LIST, NODE_LIST_OBJ } from '@/constant/vehicle'

  export default {
    components: { Pagination },
    data() {
      return {
        NODE_LIST,
        NODE_LIST_OBJ,
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          status: 3,
          vin: undefined
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        vehicleOrderList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      }
    }
  }
</script>
