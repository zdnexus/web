<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.typeName" style="width: 200px" placeholder="输入车辆类型" @keyup.enter.native="handleFilter" />

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" @click="handleRow(OPERATE_CREATE)">
        添加车辆类型
      </el-button>

      <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(OPERATE_DELETE)">
        <el-button slot="reference" type="danger" icon="el-icon-delete">
          删除
        </el-button>
      </el-popconfirm>
    </div>

    <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row @selection-change="handleIdChange">
      <el-table-column type="selection" width="55" />

      <el-table-column label="ID" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车辆类型" prop="typeName" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.typeName }}</span>
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

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="OPERATE_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
        <el-form-item label="车型类型" prop="typeName">
          <el-input v-model="temp.typeName" />
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
  parameterVehicleTypeList,
  createParameterVehicleType,
  updateParameterVehicleType,
  deleteParameterVehicleType
} from '@/api/vehicle/parameter/vehicle-type'
import {
  PAGE_TOTAL,
  PAGE_NUM,
  PAGE_SIZE,
  OPERATE_CREATE,
  OPERATE_DELETE,
  OPERATE_UPDATE,
  OPERATE_TYPE
} from '@/constant'

export default {
  components: { Pagination },
  data() {
    return {
      OPERATE_CREATE,
      OPERATE_DELETE,
      OPERATE_UPDATE,
      OPERATE_TYPE,
      listQuery: {
        typeName: undefined,
        pageNum: PAGE_NUM,
        pageSize: PAGE_SIZE
      },
      listLoading: false,
      listKey: 0,
      list: undefined,
      ids: [],
      listTotal: PAGE_TOTAL,
      dialogFormVisible: false,
      dialogStatus: undefined,
      temp: {
        typeName: undefined
      },
      rules: {
        typeName: [{ required: true, message: '输入车型类型', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      parameterVehicleTypeList(this.listQuery).then((res) => {
        this.list = res.data.list
        this.listTotal = res.data.total
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
        type: undefined
      }
    },
    handleRow(type, row) {
      switch (type) {
        case OPERATE_CREATE:
        case OPERATE_UPDATE:
          this.$isCreateTemp(type) ? this.resetTemp() : this.temp = { ...row }
          this.dialogStatus = type
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs.dataForm.clearValidate()
          })
          break
        case OPERATE_DELETE:
          if (!row && !this.ids.length) {
            this.$checkTable()
          } else {
            const ids = row ? [row.id] : this.ids
            deleteParameterVehicleType(ids).then(() => {
              this.$deleteTempNotify()
              this.handleFilter()
            })
          }
          break
      }
    },
    handleData() {
      const isCreateTemp = this.$isCreateTemp(this.dialogStatus)
      const handleFun = isCreateTemp ? createParameterVehicleType : updateParameterVehicleType
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
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
