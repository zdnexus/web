<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container">
        <el-input v-model="listQuery.name" class="filter-item" style="width: 200px" placeholder="输入车辆品牌" @keyup.enter.native="handleFilter"></el-input>

        <el-button type="primary" class="filter-item" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
          查询
        </el-button>

        <el-button type="primary" class="filter-item" icon="el-icon-edit" @click="handleRow('create')">
          添加车辆品牌
        </el-button>

        <el-popconfirm title="确认要删除吗？" style="margin-left: 10px" @onConfirm="handleRow('delete')">
          <el-button type="danger" class="filter-item" icon="el-icon-delete" slot="reference">
            批量删除
          </el-button>
        </el-popconfirm>
      </div>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleIdChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="id" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车辆品牌" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
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
          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('update',row)">
            更新
          </el-button>

          <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow('delete',row)">
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px">
        <el-form-item label="车辆品牌" prop="name">
          <el-input v-model="temp.name"/>
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
  import { parameterCarBrandList, createParameterCarBrand, updateParameterCarBrand, deleteParameterCarBrand } from '@/api/vehicle/parameter/vehicle-brand'
  import { TEMP_TYPE } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        TEMP_TYPE,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          name: undefined,
        },
        tableKey: 0,
        ids: [],
        total: 0,
        listLoading: true,
        list: null,
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          name: undefined,
        },
        rules: {
          name: [{ required: true, message: '请输入车辆品牌', trigger: 'blur' }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        parameterCarBrandList(this.listQuery).then(res => {
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
          name: undefined,
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createParameterCarBrand : updateParameterCarBrand
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
          case 'delete':
            if (!row && !this.ids.length) {
              this.$message({
                showClose: true,
                message: `请勾选列表`,
                type: 'warning'
              })
              return
            }
            const ids = row ? [row.id] : this.ids
            deleteParameterCarBrand(ids).then(() => {
              this.$notify({
                type: 'success',
                message: '删除成功',
                duration: 3000
              })
              this.handleFilter()
            })
            break
        }
      },
    }
  }
</script>
