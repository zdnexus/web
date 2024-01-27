<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" style="width: 200px" placeholder="输入车架号" @keyup.enter.native="handleFilter"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row>
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

      <el-table-column label="事务" prop="bigLinkConvert" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.bigLinkConvert }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务名称" prop="smallLinkConvert" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.smallLinkConvert }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务状态" prop="taskStatus" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ TASK_STATUS_OBJ[row.taskStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="项目经理" prop="pmName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.pmName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务人" prop="userName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" prop="createTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" prop="updateTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="missionShowHandle(row.smallLink)" size="mini" type="primary" @click="handleRow(OPERATE_HANDLE,row)">
            {{ OPERATE_TYPE[OPERATE_HANDLE] }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getData"/>

    <HandleDialog v-model="dialogFormVisible"
                  :vehicle-info="vehicleInfo"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import {
    upcomingTaskList,
    getVehicleDeclare,
    vehiclesNumberInfo,
    trackRecordInfo,
    arriveInfo
  } from '@/api/mission/allocation'
  import {
    viewOrderFeeDeatail
  } from '@/api/vehicle/cost/index'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    OPERATE_TYPE,
    OPERATE_HANDLE,
    TASK_STATUS_OBJ,
    DMFA,
    FMFA,
    CMFA,
    DM_NUMS_WARN,
    CM_NUMS_WARN,
    TRACK,
    ARRIVE
  } from '@/constant'
  import { missionShowHandle } from '@/utils/filterData'
  import HandleDialog from './handle-dialog.vue'

  export default {
    components: {
      Pagination,
      HandleDialog
    },
    data() {
      return {
        OPERATE_TYPE,
        OPERATE_HANDLE,
        TASK_STATUS_OBJ,
        listQuery: {
          vin: undefined,
          taskStatus: 0,
          pageNum: PAGE_NUM,
          pageSize: PAGE_SIZE
        },
        listLoading: false,
        listKey: 0,
        list: undefined,
        listTotal: PAGE_TOTAL,
        dialogFormVisible: false,
        dialogStatus: undefined,
        vehicleInfo: undefined
      }
    },
    watch: {
      dialogFormVisible(newVal, oldVal) {
        if (!newVal && newVal !== oldVal) {
          this.handleFilter()
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      missionShowHandle,
      getData() {
        this.listLoading = true
        upcomingTaskList(this.listQuery).then((res) => {
          this.list = res.data.list
          this.listTotal = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = PAGE_NUM
        this.getData()
      },
      handleRow(type, row) {
        this.dialogStatus = type
        switch (type) {
          case OPERATE_HANDLE:
            switch (row.smallLink) {
              case DMFA:
              case FMFA:
              case CMFA:
                viewOrderFeeDeatail([row.orderId]).then((res) => {
                  this.vehicleInfo = {
                    ...row,
                    ...res.data
                  }
                })
                break
              case DM_NUMS_WARN:
              case CM_NUMS_WARN:
                vehiclesNumberInfo([row.orderId]).then((res) => {
                  this.vehicleInfo = {
                    ...row,
                    ...res.data
                  }
                })
                break
              case TRACK:
                trackRecordInfo(row.vin).then((res) => {
                  this.vehicleInfo = {
                    ...row,
                    ...res.data
                  }
                })
                break
              case ARRIVE:
                arriveInfo(row.vin).then((res) => {
                  this.vehicleInfo = {
                    ...row,
                    ...res.data
                  }
                })
                break
              default:
                getVehicleDeclare(row.vin).then((res) => {
                  this.vehicleInfo = {
                    ...row,
                    vehicleBaseInfo: res.data.vehicleBaseInfo,
                    vehiclePhoto: res.data.vehiclePhoto,
                    vehicleDeclare: res.data.vehicleDeclare
                  }
                })
                break
            }
            this.dialogFormVisible = true
            break
        }
      }
    }
  }
</script>
