<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.deptName" style="width: 200px;margin-right: 10px" placeholder="部门名称" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.status" placeholder="部门状态" style="width: 200px;margin-right: 10px">
        <el-option v-for="item in ACCOUNT_STATUS_LIST" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" @click="handleRow(OPERATE_CREATE)">
        添加
      </el-button>
    </div>

    <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row>
      <el-table-column label="ID" prop="deptId" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.deptId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门名称" prop="deptName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.deptName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="status" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ ACCOUNT_STATUS_OBJ[row.status] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" prop="createTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handleRow(OPERATE_UPDATE,row)">
            更新
          </el-button>

          <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(OPERATE_DELETE,row)">
            <el-button slot="reference" size="mini" type="danger">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="OPERATE_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">

        <el-form-item label="上级部门" prop="parentId">
          <el-cascader v-model="temp.parentId"
                       :props="defaultProps"
                       :options="deptList"
                       clearable="true"
                       style="width: 100%"
                       ref="cascader"
                       placeholder=""
                       @change="handleChange"></el-cascader>
        </el-form-item>

        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="temp.deptName"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" placeholder="">
            <el-option v-for="item in ACCOUNT_STATUS_LIST" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="负责人" prop="leader">
          <el-input v-model="temp.leader"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email"></el-input>
        </el-form-item>

        <el-form-item label="电话号码" prop="phonenumber">
          <el-input v-model="temp.phonenumber"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark"></el-input>
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
  import {
    getDeptList,
    createDept,
    updateDept,
    deleteDept,
  } from '@/api/organization/dept'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    OPERATE_TYPE,
    OPERATE_CREATE,
    OPERATE_DELETE,
    OPERATE_UPDATE,
    ACCOUNT_STATUS_LIST,
    ACCOUNT_STATUS_OBJ
  } from '@/constant'
  import { handleDeptList } from './funs'

  export default {
    components: { Pagination },
    data() {
      return {
        OPERATE_TYPE,
        OPERATE_CREATE,
        OPERATE_DELETE,
        OPERATE_UPDATE,
        ACCOUNT_STATUS_LIST,
        ACCOUNT_STATUS_OBJ,
        userList: null,
        listQuery: {
          deptName: undefined,
          status: undefined,
          pageNum: PAGE_NUM,
          pageSize: PAGE_SIZE
        },
        listLoading: false,
        listKey: 0,
        list: undefined,
        deptList: undefined,
        listTotal: PAGE_TOTAL,
        dialogFormVisible: false,
        dialogStatus: undefined,
        temp: {
          parentId: undefined,
          deptName: undefined,
          leader: undefined,
          email: undefined,
          phonenumber: undefined,
          status: undefined
        },
        defaultProps: {
          emitPath: false,
          checkStrictly: true
        },
        rules: {
          parentId: [{ required: true, message: '请选择上级部门', trigger: 'change' }],
          deptName: [{ required: true, message: '请选择输入部门名称', trigger: 'blur' }],
          status: [{ required: true, message: '请选择状态', trigger: 'change' }]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getDeptList(this.listQuery).then((res) => {
          this.list = res.data.list
          this.listTotal = res.data.total
          this.listLoading = false
          this.deptList = handleDeptList(res.data.list)
        })
      },
      handleFilter() {
        this.listQuery.pageNum = PAGE_NUM
        this.getList()
      },
      resetTemp() {
        this.temp = {
          deptId: undefined,
          status: undefined
        }
      },
      handleRow(type, row) {
        switch (type) {
          case OPERATE_CREATE:
          case OPERATE_UPDATE:
            this.$isCreateTemp(type) ? this.resetTemp() : this.temp = { ...row, }
            this.dialogStatus = type
            this.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs.dataForm.clearValidate()
            })
            break
          case OPERATE_DELETE:
            const ids = [row.deptId]
            deleteDept(ids).then(() => {
              this.$deleteTempNotify()
              this.handleFilter()
            })
            break
        }
      },
      handleChange() {
      },
      handleData() {
        const isCreateTemp = this.$isCreateTemp(this.dialogStatus)
        const handleFun = isCreateTemp ? createDept : updateDept
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.temp.parentName = this.$refs["cascader"].getCheckedNodes()[0].label
            handleFun(this.temp).then(() => {
              isCreateTemp ? this.$createTempNotify() : this.$updateTempNotify()
              this.dialogFormVisible = false
              this.handleFilter()
            })
          }
        })
      }
    }
  }
</script>
