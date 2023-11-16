<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.postName" style="width: 200px;margin-right: 10px" placeholder="岗位名称" @keyup.enter.native="handleFilter"></el-input>

      <el-select v-model="listQuery.status" placeholder="岗位状态" style="width: 200px;margin-right: 10px">
        <el-option v-for="item in ACCOUNT_STATUS_LIST" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" @click="handleRow(TEMP_TYPE_CREATE)">
        添加
      </el-button>
    </div>

    <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row @selection-change="handleIdChange">
      <el-table-column label="ID" prop="postId" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.postId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="岗位名称" prop="postName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.postName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="岗位编码" prop="postCode" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.postCode }}</span>
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

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">

        <el-form-item label="岗位名称" prop="postName">
          <el-input v-model="temp.postName"></el-input>
        </el-form-item>

        <el-form-item label="岗位编码" prop="postCode">
          <el-input v-model="temp.postCode"></el-input>
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
    getPostList,
    createPost,
    updatePost,
    deletePost,
  } from '@/api/organization/post'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    TEMP_TYPE,
    TEMP_TYPE_CREATE,
    TEMP_TYPE_DELETE,
    TEMP_TYPE_UPDATE,
    ACCOUNT_STATUS_LIST,
    ACCOUNT_STATUS_OBJ
  } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        TEMP_TYPE,
        TEMP_TYPE_CREATE,
        TEMP_TYPE_DELETE,
        TEMP_TYPE_UPDATE,
        ACCOUNT_STATUS_LIST,
        ACCOUNT_STATUS_OBJ,
        listQuery: {
          postName: undefined,
          status: undefined,
          pageNum: PAGE_NUM,
          pageSize: PAGE_SIZE
        },
        listLoading: false,
        listKey: 0,
        list: undefined,
        listTotal: PAGE_TOTAL,
        dialogFormVisible: false,
        dialogStatus: undefined,
        temp: {
          postName: undefined,
          postCode: undefined,
          status: undefined,
          remark: undefined
        },
        defaultProps: {
          emitPath: false,
          checkStrictly: true
        },
        rules: {
          postName: [{ required: true, message: '请选择岗位名称', trigger: 'blur' }],
          postCode: [{ required: true, message: '请选择岗位编码', trigger: 'blur' }],
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
        getPostList(this.listQuery).then((res) => {
          this.list = res.data.list
          this.listTotal = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = PAGE_NUM
        this.getList()
      },
      resetTemp() {
        this.temp = {
          postName: undefined,
          postCode: undefined,
          status: undefined,
          remark: undefined
        }
      },
      handleRow(type, row) {
        switch (type) {
          case TEMP_TYPE_CREATE:
          case TEMP_TYPE_UPDATE:
            this.$isCreateTemp(type) ? this.resetTemp() : this.temp = { ...row, }
            this.dialogStatus = type
            this.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
            break
          case TEMP_TYPE_DELETE:
            const ids = [row.postId]
            deletePost(ids).then(() => {
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
        const handleFun = isCreateTemp ? createPost : updatePost
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.postSort = 0
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
