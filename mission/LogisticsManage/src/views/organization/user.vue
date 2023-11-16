<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.userName" style="width: 200px;margin-right: 10px" placeholder="用户名称" @keyup.enter.native="handleFilter"/>

      <el-input v-model="listQuery.phonenumber" style="width: 200px;margin-right: 10px" placeholder="手机号码" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.status" placeholder="用户状态" style="width: 200px;margin-right: 10px">
        <el-option v-for="item in ACCOUNT_STATUS_LIST" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" @click="handleRow(TEMP_TYPE_CREATE)">
        添加
      </el-button>

      <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(TEMP_TYPE_DELETE)">
        <el-button slot="reference" type="danger" icon="el-icon-delete">
          删除
        </el-button>
      </el-popconfirm>
    </div>

    <div style="display:flex">
      <el-tree :data="deptList" :props="defaultProps" style="width:auto;min-width:150px;margin-right: 10px" @node-click="handleNodeClick"></el-tree>

      <div style="flex: 1;overflow: scroll">
        <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row @selection-change="handleIdChange">
          <el-table-column type="selection" width="55"/>

          <el-table-column label="ID" prop="userId" align="center" width="100">
            <template slot-scope="{row}">
              <span>{{ row.userId }}</span>
            </template>
          </el-table-column>

          <el-table-column label="用户名称" prop="userName" align="center" width="100">
            <template slot-scope="{row}">
              <span>{{ row.userName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="用户昵称" prop="nickName" align="center" width="100">
            <template slot-scope="{row}">
              <span>{{ row.nickName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="手机号码" prop="phonenumber" align="center" width="100">
            <template slot-scope="{row}">
              <span>{{ row.phonenumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="部门" prop="deptName" align="center" width="100">
            <template slot-scope="{row}">
              <span>{{ row.dept && row.dept.deptName || '' }}</span>
            </template>
          </el-table-column>

          <el-table-column label="岗位" prop="postName" align="center" width="100">
            <template slot-scope="{row}">
              <span>{{ row.postName }}</span>
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

          <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button size="mini" type="primary" @click="handleRow(TEMP_TYPE_UPDATE,row)">
                更新
              </el-button>

              <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(TEMP_TYPE_DELETE,row)">
                <el-button slot="reference" size="mini" type="danger">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="temp.userName"></el-input>
        </el-form-item>

        <el-form-item label="用户密码" prop="password" v-if="dialogStatus === TEMP_TYPE_CREATE">
          <el-input v-model="temp.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="temp.nickName"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="temp.phonenumber"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="temp.sex" placeholder="">
            <el-option v-for="item in SEX_LIST" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门" prop="deptId">
          <el-select v-model="temp.deptId" placeholder="">
            <el-option v-for="item in deptList" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位" prop="postCode">
          <el-select v-model="temp.postCode" placeholder="">
            <el-option v-for="item in postList" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" placeholder="">
            <el-option v-for="item in ACCOUNT_STATUS_LIST" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
    getUserList,
    createUser,
    updateUser,
    deleteUser
  } from '@/api/organization/user'
  import {
    getDeptList,
  } from '@/api/organization/dept'
  import {
    getPostList,
  } from '@/api/organization/post'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    TEMP_TYPE,
    TEMP_TYPE_CREATE,
    TEMP_TYPE_DELETE,
    TEMP_TYPE_UPDATE,
    SEX_LIST,
    ACCOUNT_STATUS_LIST,
    ACCOUNT_STATUS_OBJ
  } from '@/constant'
  import { handleList } from './funs'

  export default {
    components: { Pagination },
    data() {
      return {
        TEMP_TYPE,
        TEMP_TYPE_CREATE,
        TEMP_TYPE_DELETE,
        TEMP_TYPE_UPDATE,
        SEX_LIST,
        ACCOUNT_STATUS_LIST,
        ACCOUNT_STATUS_OBJ,
        listQuery: {
          userName: undefined,
          phonenumber: undefined,
          status: undefined,
          deptId: undefined,
          pageNum: PAGE_NUM,
          pageSize: PAGE_SIZE
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        listLoading: false,
        listKey: 0,
        list: undefined,
        deptList: undefined,
        postList: undefined,
        ids: [],
        listTotal: PAGE_TOTAL,
        dialogFormVisible: false,
        dialogStatus: undefined,
        temp: {
          userName: undefined,
          password: undefined,
          nickName: undefined,
          phonenumber: undefined,
          email: undefined,
          sex: undefined,
          deptId: undefined,
          postCode: undefined,
          status: undefined,
          remark: undefined
        },
        rules: {
          userName: [{ required: true, message: '请选择用户名称', trigger: 'blur' }],
          password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
          nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
          phonenumber: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
          email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
          sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
          deptId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
          postCode: [{ required: true, message: '请选择职位', trigger: 'blur' }],
          status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getUserList(this.listQuery).then((res) => {
          this.list = res.data.list
          this.listTotal = res.data.total
          this.listLoading = false
        })
        getDeptList().then((res) => {
          this.deptList = handleList(res.data.list)
        })
        getPostList().then((res) => {
          this.postList = res.data.list.map((item) => ({
            label: item.postName,
            value: item.postCode
          }))
        })
      },
      handleFilter() {
        this.listQuery.pageNum = PAGE_NUM
        this.getList()
      },
      handleNodeClick(node) {
        this.listQuery.deptId = node.value
        this.listLoading = true
        getUserList(this.listQuery).then((res) => {
          this.list = res.data.list
          this.listTotal = res.data.total
          this.listLoading = false
        })
      },
      handleIdChange(rows) {
        this.ids = rows.map(row => row.userId)
      },
      resetTemp() {
        this.temp = {
          userName: undefined,
          password: undefined,
          nickName: undefined,
          phonenumber: undefined,
          email: undefined,
          sex: undefined,
          deptId: undefined,
          postCode: undefined,
          status: undefined,
          remark: undefined
        }
      },
      handleRow(type, row) {
        switch (type) {
          case TEMP_TYPE_CREATE:
          case TEMP_TYPE_UPDATE:
            this.$isCreateTemp(type) ? this.resetTemp() : this.temp = {
              ...row,
              deptId: { label: row.dept.deptName, value: row.dept.deptId },
              postCode: { label: row.postName, value: row.postCode }
            }
            this.dialogStatus = type
            this.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
            break
          case TEMP_TYPE_DELETE:
            if (!row && !this.ids.length) {
              this.$checkTable()
            } else {
              const ids = row ? [row.userId] : this.ids
              deleteUser(ids).then(() => {
                this.$deleteTempNotify()
                this.handleFilter()
              })
            }
            break
        }
      },
      handleData() {
        const isCreateTemp = this.$isCreateTemp(this.dialogStatus)
        const handleFun = isCreateTemp ? createUser : updateUser
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const deptName = this.temp.deptId.label
            const deptId = this.temp.deptId.value
            this.temp.deptName = deptName
            this.temp.deptId = deptId
            const postName = this.temp.postCode.label
            const postCode = this.temp.postCode.value
            this.temp.postName = postName
            this.temp.postCode = postCode
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
