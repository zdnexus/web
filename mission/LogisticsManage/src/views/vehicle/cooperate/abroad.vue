<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.teamName" placeholder="请输入境外车队名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleRow('create')">
        添加境外车队信息
      </el-button>

      <el-popconfirm
        title="确认要删除吗？"
        @onConfirm="handleRow('delete')"
      >
        <el-button type="danger" icon="el-icon-delete" class="filter-item" slot="reference">
          批量删除
        </el-button>
      </el-popconfirm>
    </div>

    <el-table
      :key="listKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleIdChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="ID" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="运输队名称" prop="teamName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.teamName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="运输队人数" prop="total" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.total }}</span>
        </template>
      </el-table-column>

      <el-table-column label="运输队长名称" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="运输队长电话" prop="mobile" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="创建用户" prop="createBy" align="center" width="100">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.createBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="创建时间" prop="createTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="更新用户" prop="updateBy" align="center" width="100">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.updateBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="更新时间" prop="updateTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('update',row)">
            更新
          </el-button>

          <el-popconfirm
            title="确认要删除吗？"
            @onConfirm="handleRow('delete',row)"
          >
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="运输队名称" prop="teamName">
          <el-input v-model="temp.teamName"/>
        </el-form-item>

        <el-form-item label="运输队人数" prop="total">
          <el-input v-model="temp.total"/>
        </el-form-item>

        <el-form-item label="运输队长名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>

        <el-form-item label="运输队长电话" prop="mobile">
          <el-input v-model="temp.mobile"/>
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
  import { cooperateAbrodList, createCooperateAbrod, updateCooperateAbrod, deleteCooperateAbrod } from '@/api/vehicle/cooperate/abroad'
  import { organizationList } from '@/api/organization'
  import { TEMP_TYPE } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        TEMP_TYPE,
        listKey: 0,
        list: null,
        pmList: null,
        total: 0,
        listLoading: true,
        listQuery: {
          teamName: undefined,
          pageNum: 1,
          pageSize: 20,
        },
        ids: [],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          teamName: undefined,
          total: undefined,
          name: undefined,
          mobile: undefined
        },
        rules: {
          teamName: [{ required: true, message: '请输入运输队名称', trigger: 'blur' }],
          total: [{ required: true, message: '请输入运输队人数', trigger: 'blur' }],
          name: [{ required: true, message: '请输入运输队长名称', trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入运输队长电话', trigger: 'blur' }],
        }
      }
    },
    created() {
      this.getList()
      organizationList({ roleKeySet: 'pmanager' }).then(res => {
        this.pmList = res.data.list.map(item => ({
          label: item.userName,
          value: item.userId
        }))
      })
    },
    methods: {
      getList() {
        this.listLoading = true
        cooperateAbrodList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleIdChange(rows) {
        this.ids = rows.map(row => row.id)
      },
      resetTemp() {
        this.temp = {
          teamName: undefined,
          total: undefined,
          name: undefined,
          mobile: undefined
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createCooperateAbrod : updateCooperateAbrod
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
      deleteData(ids) {
        deleteCooperateAbrod(ids).then(() => {
          this.handleFilter()
          this.$notify({
            type: 'success',
            message: '删除成功',
            duration: 3000
          })
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
          case 'delete':
            row = row ? [row.id] : this.ids
            this.deleteData(row)
            break
        }
      },
    }
  }
</script>
