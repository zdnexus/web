<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" class="filter-item" style="width: 200px" placeholder="请输入钥匙位置" @keyup.enter.native="handleFilter"/>

      <el-button type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" class="filter-item" icon="el-icon-edit" @click="handleRow(TEMP_TYPE_CREATE)">
        添加钥匙位置
      </el-button>

      <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(TEMP_TYPE_DELETE)">
        <el-button type="danger" class="filter-item" icon="el-icon-delete" slot="reference">
          批量删除
        </el-button>
      </el-popconfirm>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleIdChange">
      <el-table-column type="selection" width="55"></el-table-column>

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

      <el-table-column label="钥匙数量" prop="nums" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.nums }}</span>
        </template>
      </el-table-column>

      <el-table-column label="钥匙位置" prop="keysPosition" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="存放图片" prop="photoUrl" align="center" width="150">
        <template slot-scope="{row}">
          <img width="100" height="100" :src="row.photoUrl"/>
        </template>
      </el-table-column>

      <el-table-column label="创建用户" prop="userName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" prop="createTime" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" prop="updateTime" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleRow(TEMP_TYPE_UPDATE,row)">
            更新
          </el-button>

          <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(TEMP_TYPE_DELETE,row)">
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="temp.vin"/>
        </el-form-item>

        <el-form-item label="钥匙数量" prop="nums">
          <el-input v-model="temp.nums"/>
        </el-form-item>

        <el-form-item label="钥匙位置" prop="keysPosition">
          <el-input v-model="temp.keysPosition"/>
        </el-form-item>

        <el-form-item label="存放图片" prop="photoUrl">
          <Upload v-model="temp.photoUrl"/>
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
  import Upload from '@/components/Upload/SingleImage'
  import {
    parameterkeysPositionList,
    createParameterkeysPosition,
    deleteParameterkeysPosition,
    updateParameterkeysPosition
  } from '@/api/vehicle/parameter/keysPosition'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    TEMP_TYPE_CREATE,
    TEMP_TYPE_DELETE,
    TEMP_TYPE_UPDATE,
    TEMP_TYPE
  } from '@/constant'

  export default {
    components: { Pagination, Upload },
    data() {
      return {
        TEMP_TYPE_CREATE,
        TEMP_TYPE_DELETE,
        TEMP_TYPE_UPDATE,
        TEMP_TYPE,
        listQuery: {
          name: undefined,
          pageNum: PAGE_NUM,
          pageSize: PAGE_SIZE,
        },
        listLoading: false,
        tableKey: 0,
        list: undefined,
        ids: [],
        total: PAGE_TOTAL,
        dialogFormVisible: false,
        dialogStatus: undefined,
        temp: {
          vin: undefined,
          nums: undefined,
          keysPosition: undefined,
          photoUrl: undefined
        },
        rules: {
          vin: [{ required: true, message: '请输入车架号', trigger: 'blur' }],
          nums: [{ required: true, message: '请输入钥匙数量', trigger: 'blur' }],
          keysPosition: [{ required: true, message: '请输入钥匙位置', trigger: 'blur' }],
          photoUrl: [{ required: true, message: '请上传存放图片', trigger: 'blur' }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        parameterkeysPositionList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = PAGE_NUM
        this.getList()
      },
      handleIdChange(rows) {
        this.ids = rows.map(row => row.id)
      },
      resetTemp() {
        this.temp = {
          name: undefined,
          vin: undefined,
          keysPosition: undefined,
          photoUrl: undefined,
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createParameterkeysPosition : updateParameterkeysPosition
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
        deleteParameterkeysPosition(ids).then(() => {
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
