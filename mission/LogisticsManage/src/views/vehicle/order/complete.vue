<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" class="filter-item" style="width: 200px" placeholder="输入车架号" @keyup.enter.native="handleFilter"></el-input>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table
      :key="listKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车架号" prop="vin" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.vin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户姓名" prop="clientName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.clientName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="接车验车" prop="inspection" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'inspection')">{{ NODE_LIST_OBJ[row.inspection] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="非监管仓" prop="ncr" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'ncr')">{{ NODE_LIST_OBJ[row.ncr] }}</a>
        </template>
      </el-table-column>
      <el-table-column label="报关" prop="declaration" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'declaration')">{{ NODE_LIST_OBJ[row.declaration] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="监管仓" prop="bwh" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'bwh')">{{ NODE_LIST_OBJ[row.bwh] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="司机送车" prop="edv" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'edv')">{{ NODE_LIST_OBJ[row.edv] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="出境" prop="ed" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'ed')">{{ NODE_LIST_OBJ[row.ed] }}</a>
        </template>
      </el-table-column>

      <el-table-column label="境外" prop="oec" align="center" width="100">
        <template slot-scope="{row}">
          <a @click="reqDetail(row,'oec')">{{ NODE_LIST_OBJ[row.oec] }}</a>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <Link :visible="linkFormVisible"
          :disabled="true"
          :baseComponents="baseComponents"
          :formData="linkData"></Link>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import Link from '@/components/Link'
  import {
    vehicleOrderList,
    orderBigLinklnfo
  } from '@/api/vehicle/order'
  import {
    TEMP_TYPE,
    TREE_DATA,
    NODE_LIST_OBJ,
    VEHICLE_INFO_OBJ,
    VEHICLE_PHOTO_OBJ,
    ORDER_STATUS_OBJ,
  } from '@/constant'
  import {
    TREE_DATA_BIG_NODE_OBJ,
    INSPECTION,
    NCR,
    DECLARATION,
    BWH,
    EDV,
    ED,
    OEC
  } from '@/constant/pageCompoent'

  export default {
    components: { Pagination, Link },
    data() {
      return {
        TEMP_TYPE,
        NODE_LIST_OBJ,
        listKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          status: 2,
          vin: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {},
        linkFormVisible: false,
        baseComponents: [],
        linkData: null
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
      },
      reqDetail(row, bigLinKey) {
        orderBigLinklnfo({
          vin: row.vin,
          orderId: row.id,
          bigLinKey,
        }).then(res => {
          switch (bigLinKey) {
            case 'inspection':
              this.baseComponents = INSPECTION
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data.vehicleBaseInfo,
                ...res.data.vehiclePhoto,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'ncr':
              this.baseComponents = NCR
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data.ncrBigLinkBaseInfoItem,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'declaration':
              this.baseComponents = DECLARATION
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'bwh':
              this.baseComponents = BWH
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data.ncrBigLinkBaseInfoItem,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'edv':
              this.baseComponents = EDV
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'ed':
              this.baseComponents = ED
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
            case 'oec':
              this.baseComponents = OEC
              this.linkData = {
                bigLinKeyLabel: TREE_DATA_BIG_NODE_OBJ[bigLinKey],
                ...row,
                ...res.data,
                vehicleTrackRecordList: res.data.vehicleTrackRecordList,
                vehicleUpcomingTaskList: res.data.vehicleUpcomingTaskList
              }
              break
          }
          this.linkFormVisible = true
        })
      }
    }
  }
</script>
