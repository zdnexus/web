<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" style="width: 200px" placeholder="输入车辆品牌" @keyup.enter.native="handleFilter" />

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" @click="handleRow(TEMP_TYPE_CREATE)">
        添加车辆品牌
      </el-button>

      <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(TEMP_TYPE_DELETE)">
        <el-button slot="reference" type="danger" icon="el-icon-delete">
          批量删除
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

      <el-table-column label="车辆品牌" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ carBardListObj[row.brandId] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车型型号" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
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
        <template slot-scope="{row,$index}">
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

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
        <el-form-item label="车辆品牌" prop="brandId">
          <el-select v-model="temp.brandId" placeholder="">
            <el-option v-for="item in carBardList" :key="item.value" :label="item.label" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="车型型号" prop="name">
          <el-input v-model="temp.name" />
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
  parameterCarBrandList
} from '@/api/vehicle/parameter/vehicle-brand'
import {
  parameterCarModelList,
  createParameterCarModel,
  updateParameterCarModel,
  deleteParameterCarModel
} from '@/api/vehicle/parameter/vehicle-model'
import {
  PAGE_TOTAL,
  PAGE_NUM,
  PAGE_SIZE,
  TEMP_TYPE_CREATE,
  TEMP_TYPE_DELETE,
  TEMP_TYPE_UPDATE,
  TEMP_TYPE
} from '@/constant'
import { listToObj } from '@/utils'

export default {
  components: { Pagination },
  data() {
    return {
      TEMP_TYPE_CREATE,
      TEMP_TYPE_DELETE,
      TEMP_TYPE_UPDATE,
      TEMP_TYPE,
      carBardList: null,
      carBardListObj: null,
      listQuery: {
        name: undefined,
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
        brandId: undefined,
        name: undefined
      },
      rules: {
        brandId: [{ required: true, message: '选择车辆品牌', trigger: 'blur' }],
        name: [{ required: true, message: '输入车型型号', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getList()
    parameterCarBrandList().then((res) => {
      this.carBardList = res.data.list.map(item => ({
        label: item.name,
        value: item.id
      }))
      this.carBardListObj = listToObj(this.carBardList)
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      parameterCarModelList(this.listQuery).then((res) => {
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
        name: undefined,
        type: undefined,
        abroadAddress: undefined
      }
    },
    handleRow(type, row) {
      switch (type) {
        case TEMP_TYPE_CREATE:
        case TEMP_TYPE_UPDATE:
          this.$isCreateTemp(type) ? this.resetTemp() : this.temp = { ...row }
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
            const ids = row ? [row.id] : this.ids
            deleteParameterCarModel(ids).then(() => {
              this.$deleteTempNotify()
              this.handleFilter()
            })
          }
          break
      }
    },
    handleData() {
      const isCreateTemp = this.$isCreateTemp(this.dialogStatus)
      const handleFun = isCreateTemp ? createParameterCarModel : updateParameterCarModel
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const brandId = this.temp.brandId.value
          const brandName = this.temp.brandId.label
          this.temp.brandId = brandId
          this.temp.brandName = brandName
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
