<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="输入服务项名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleRow('create')">
        添加服务项
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
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="id" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务项" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" prop="type" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ SERVE_TYPE_LIST_OBJ[row.type] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="境外目的地" prop="abroadAddress" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.abroadAddress }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="创建用户" prop="createBy" align="center" width="150">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.createBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="创建时间" prop="createTime" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="更新用户" prop="updateBy" align="center" width="150">-->
      <!--<template slot-scope="{row}">-->
      <!--<span>{{ row.updateBy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="更新时间" prop="updateTime" align="center" width="150">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="服务项名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>

        <el-form-item label="服务类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="">
            <el-option v-for="item in SERVE_TYPE_LIST" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="境外目的地" prop="abroadAddress">
          <el-input v-model="temp.abroadAddress"/>
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
  import { parameterServiceList, createParameterService, updateParameterService, deleteParameterService } from '@/api/vehicle/parameter/server'
  import { SERVE_TYPE_LIST, SERVE_TYPE_LIST_OBJ } from '@/constant/vehicle'

  export default {
    components: { Pagination },
    data() {
      return {
        SERVE_TYPE_LIST,
        SERVE_TYPE_LIST_OBJ,
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          name: undefined,
          pageNum: 1,
          pageSize: 20,
        },
        ids: [],
        dialogFormVisible: false,
        textMap: {
          create: '新增',
          update: '更新'
        },
        dialogStatus: '',
        temp: {
          name: undefined,
          type: undefined,
          abroadAddress: undefined,
        },
        rules: {
          name: [{ required: true, message: '请输入服务项名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
          abroadAddress: [{ required: true, message: '请输入境外目的地', trigger: 'blur' }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        parameterServiceList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleSelectionChange(rows) {
        this.ids = rows.map(row => row.id)
      },
      resetTemp() {
        this.temp = {
          name: undefined,
          type: undefined,
          abroadAddress: undefined
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createParameterService : updateParameterService
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
        deleteParameterService(ids).then(() => {
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
