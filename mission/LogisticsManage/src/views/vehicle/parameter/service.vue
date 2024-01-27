<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" style="width: 200px" placeholder="输入服务项" @keyup.enter.native="handleFilter"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" icon="el-icon-edit" @click="handleRow(OPERATE_CREATE)">
        添加服务项
      </el-button>

      <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(OPERATE_DELETE)">
        <el-button slot="reference" type="danger" icon="el-icon-delete">
          删除
        </el-button>
      </el-popconfirm>
    </div>

    <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row @selection-change="handleIdChange">
      <el-table-column type="selection" width="55"></el-table-column>

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
          <el-button size="mini" type="primary" @click="handleRow(OPERATE_UPDATE,row)">
            {{ OPERATE_TYPE[OPERATE_UPDATE] }}
          </el-button>

          <el-popconfirm title="确认要删除吗？" @onConfirm="handleRow(OPERATE_DELETE,row)">
            <el-button slot="reference" size="mini" type="danger">
              {{ OPERATE_TYPE[OPERATE_DELETE] }}
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="listTotal > 0" :total="listTotal" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"></Pagination>

    <el-dialog :title="OPERATE_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
        <el-form-item label="服务项名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>

        <el-form-item label="服务类型" prop="type">
          <el-select v-model="temp.type" placeholder="">
            <el-option v-for="item in SERVE_TYPE_LIST" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="境外目的地" prop="abroadAddress">
          <el-input v-model="temp.abroadAddress"></el-input>
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
    serviceList,
    createService,
    deleteService,
    updateService
  } from '@/api/vehicle/parameter/service'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    OPERATE_TYPE,
    OPERATE_CREATE,
    OPERATE_DELETE,
    OPERATE_UPDATE,
    SERVE_TYPE_LIST,
    SERVE_TYPE_LIST_OBJ
  } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        OPERATE_CREATE,
        OPERATE_DELETE,
        OPERATE_UPDATE,
        OPERATE_TYPE,
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
          name: [{ required: true, message: '请输入服务项名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
          abroadAddress: [{ required: true, message: '请输入境外目的地', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        serviceList(this.listQuery).then((res) => {
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
              deleteService(ids).then(() => {
                this.$deleteTempNotify()
                this.handleFilter()
              })
            }
            break
        }
      },
      handleData() {
        const isCreateTemp = this.$isCreateTemp(this.dialogStatus)
        const handleFun = isCreateTemp ? createService : updateService
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
