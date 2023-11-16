<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" style="width: 200px" placeholder="输入服务项" @keyup.enter.native="handleFilter" />

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" @click="handleRow(TEMP_TYPE_CREATE)">
        添加服务项
      </el-button>

      <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(TEMP_TYPE_DELETE)">
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

      <el-table-column label="服务项" prop="name" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务类型" prop="type" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ SERVE_TYPE_LIST_OBJ[row.type] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="境外目的地" prop="abroadAddress" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.abroadAddress }}</span>
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
          <el-button size="mini" type="primary" @click="handleRow(TEMP_TYPE_UPDATE,row)">
            {{ TEMP_TYPE[TEMP_TYPE_UPDATE] }}
          </el-button>

          <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(TEMP_TYPE_DELETE,row)">
            <el-button slot="reference" size="mini" type="danger">
              {{ TEMP_TYPE[TEMP_TYPE_DELETE] }}
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
        <el-form-item label="服务项名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="服务类型" prop="type">
          <el-select v-model="temp.type" placeholder="">
            <el-option v-for="item in SERVE_TYPE_LIST" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="境外目的地" prop="abroadAddress">
          <el-input v-model="temp.abroadAddress" />
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
  parameterServiceList,
  createParameterService,
  deleteParameterService,
  updateParameterService
} from '@/api/vehicle/parameter/server'
import {
  PAGE_TOTAL,
  PAGE_NUM,
  PAGE_SIZE,
  TEMP_TYPE_CREATE,
  TEMP_TYPE_DELETE,
  TEMP_TYPE_UPDATE,
  TEMP_TYPE,
  SERVE_TYPE_LIST,
  SERVE_TYPE_LIST_OBJ
} from '@/constant'

export default {
  components: { Pagination },
  data() {
    return {
      TEMP_TYPE_CREATE,
      TEMP_TYPE_DELETE,
      TEMP_TYPE_UPDATE,
      TEMP_TYPE,
      SERVE_TYPE_LIST,
      SERVE_TYPE_LIST_OBJ,
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
        name: undefined,
        type: undefined,
        abroadAddress: undefined
      },
      rules: {
        name: [{ required: true, message: '输入服务项名称', trigger: 'blur' }],
        type: [{ required: true, message: '选择服务类型', trigger: 'change' }],
        abroadAddress: [{ required: true, message: '输入境外目的地', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      parameterServiceList(this.listQuery).then((res) => {
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
            deleteParameterService(ids).then(() => {
              this.$deleteTempNotify()
              this.handleFilter()
            })
          }
          break
      }
    },
    handleData() {
      const isCreateTemp = this.$isCreateTemp(this.dialogStatus)
      const handleFun = isCreateTemp ? createParameterService : updateParameterService
      this.$refs['dataForm'].validate((valid) => {
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
