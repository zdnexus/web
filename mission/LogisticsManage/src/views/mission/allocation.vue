<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" class="filter-item" style="width: 200px" placeholder="输入车架号名称" @keyup.enter.native="handleFilter"/>

      <el-button type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%">
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

      <!--<el-table-column label="创建用户" prop="createBy" align="center" width="100">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.createBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="创建时间" prop="createTime" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="更新用户" prop="updateBy" align="center" width="100">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.updateBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="更新时间" prop="updateTime" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleRow(TEMP_TYPE_ALLOCATE,row)">
            处理
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <HandleDialog v-model="dialogFormVisible"
                  :dialogStatus="dialogStatus"
                  :vehicleInfo="vehicleInfo"/>
  </div>
</template>

<script>
  import HandleDialog from './handle-dialog.vue'
  import Pagination from '@/components/Pagination'
  import {
    upcomingTaskList,
    getVehicleDeclare
  } from '@/api/mission/allocation'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    TEMP_TYPE_ALLOCATE,
    TEMP_TYPE,
    TASK_STATUS_OBJ
  } from '@/constant'

  export default {
    components: { Pagination, HandleDialog },
    data() {
      return {
        TEMP_TYPE_ALLOCATE,
        TEMP_TYPE,
        TASK_STATUS_OBJ,
        listQuery: {
          vin: undefined,
          taskStatus: 0,
          pageNum: PAGE_NUM,
          pageSize: PAGE_SIZE
        },
        listLoading: false,
        tableKey: 0,
        list: undefined,
        ids: [],
        total: PAGE_TOTAL,
        dialogFormVisible: false,
        dialogStatus: undefined,
        vehicleInfo: null
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        upcomingTaskList(this.listQuery).then((res) => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = PAGE_NUM
        this.getList()
      },
      handleRow(type, row) {
        this.dialogStatus = type
        switch (type) {
          case TEMP_TYPE_ALLOCATE:
            getVehicleDeclare(row.vin).then(res => {
              this.vehicleInfo = {
                row,
                vehicleBaseInfo: res.data.vehicleBaseInfo,
                vehiclePhoto: res.data.vehiclePhoto,
                vehicleDeclare: res.data.vehicleDeclare,
              }
            })
            this.dialogFormVisible = true
            break
        }
      }
    },
    watch: {
      dialogFormVisible: {
        handler(newVal, oldVal) {
          if (newVal !== oldVal && newVal === false) {
            this.handleFilter()
          }
        }
      }
    }
  }
</script>
