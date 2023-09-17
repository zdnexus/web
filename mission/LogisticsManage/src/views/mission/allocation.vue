<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" placeholder="输入车架号名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
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

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('update',row)">
            处理
          </el-button>

          <el-popconfirm
            title="确认要驳回吗？"
            @onConfirm="handleRow('delete',row)"
          >
            <el-button size="mini" type="danger" slot="reference">
              驳回
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="temp.vin"/>
        </el-form-item>

        <el-form-item label="事务" prop="bigLink">
          <el-select v-model="temp.bigLink" class="filter-item" placeholder="">
            <el-option v-for="item in SERVE_TYPE_LIST" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="境外目的地" prop="abroadAddress">
          <el-input v-model="temp.abroadAddress"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>

        <el-button type="primary" @click="handleData">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { upcomingTaskList, createUpcomingTask, updateUpcomingTask, deleteUpcomingTask } from '@/api/mission/allocation'
  import { TEMP_TYPE, TASK_STATUS_OBJ } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        TEMP_TYPE,
        TASK_STATUS_OBJ,
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          vin: undefined,
          pageNum: 1,
          pageSize: 20,
        },
        ids: [],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          vin: undefined,
          bigLink: undefined,
          abroadAddress: undefined,
        },
        rules: {
          vin: [{ required: true, message: '请输入车架号名称', trigger: 'blur' }],
          bigLink: [{ required: true, message: '请选择服务事务', trigger: 'change' }],
          abroadAddress: [{ required: true, message: '请输入境外目的地', trigger: 'blur' }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        upcomingTaskList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      resetTemp() {
        this.temp = {
          vin: undefined,
          bigLink: undefined,
          abroadAddress: undefined
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createUpcomingTask : updateUpcomingTask
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            fun(this.temp).then(() => {
              this.dialogFormVisible = false
              this.handleFilter()
              this.$notify({
                type: 'success',
                title: this.dialogStatus === 'create' ? '新增成功' : '更新成功',
                duration: 3000
              })
            })
          }
        })
      },
      handleRow(type, row) {
        switch (type) {
          case 'create':
          case 'update':
            type === 'create' ? this.resetTemp() : this.temp = { ...row }
            this.dialogStatus = type
            this.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
            break
        }
      },
    }
  }
</script>
