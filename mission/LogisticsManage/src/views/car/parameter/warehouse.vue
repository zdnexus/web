<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="输入仓库名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleRow('create')">
        添加仓库
      </el-button>

      <el-popconfirm
        title="确认要删除吗？"
        @onConfirm="handleRow('delete')"
      >
        <el-button class="filter-item" type="danger" slot="reference" style="margin-left: 10px">
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

      <el-table-column label="仓库名称" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="仓库类型" prop="type" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ WAREHOUSE_TYPE_LIST_OBJ[row.type] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="仓库地址" prop="address" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="基础价格" prop="basePrice" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.basePrice }}</span>
        </template>
      </el-table-column>

      <el-table-column label="免费天数" prop="baseDay" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.baseDay }}</span>
        </template>
      </el-table-column>

      <el-table-column label="超时计费(元/天)" prop="overduePrice" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.overduePrice }}</span>
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

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>

        <el-form-item label="仓库类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="">
            <el-option v-for="item in WAREHOUSE_TYPE_LIST" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="仓库地址" prop="address">
          <el-input v-model="temp.address"/>
        </el-form-item>

        <el-form-item label="基础价格" prop="basePrice">
          <el-input v-model="temp.basePrice"/>
        </el-form-item>

        <el-form-item label="免费天数" prop="baseDay">
          <el-input v-model="temp.baseDay"/>
        </el-form-item>

        <el-form-item label="超时计费(元/天)" prop="overduePrice">
          <el-input v-model="temp.overduePrice"/>
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
  import { cooperateWarehouseList, createCooperateWarehouse, updateCooperateWarehouse, deleteCooperateWarehouse } from '@/api/car'
  import { WAREHOUSE_TYPE_LIST, WAREHOUSE_TYPE_LIST_OBJ } from '@/constant/car'

  export default {
    data() {
      return {
        WAREHOUSE_TYPE_LIST,
        WAREHOUSE_TYPE_LIST_OBJ,
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: undefined,
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
          address: undefined,
          basePrice: undefined,
          baseDay: undefined,
          overduePrice: undefined,
        },
        rules: {
          name: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择仓库类型', trigger: 'change' }],
          address: [{ required: true, message: '请输入仓库地址', trigger: 'blur' }],
          basePrice: [{ required: true, message: '请输入基础价格', trigger: 'blur' }],
          baseDay: [{ required: true, message: '请输入免费天数', trigger: 'blur' }],
          overduePrice: [{ required: true, message: '请输入超时计费(元/天)', trigger: 'blur' }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        cooperateWarehouseList(this.listQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSelectionChange(rows) {
        this.ids = rows.map(row => row.id)
      },
      resetTemp() {
        this.temp = {
          name: undefined,
          type: undefined,
          address: undefined,
          basePrice: undefined,
          baseDay: undefined,
          overduePrice: undefined,
        }
      },
      handleData() {
        const fun = this.dialogStatus === 'create' ? createCooperateWarehouse : updateCooperateWarehouse
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            fun(this.temp).then(() => {
              this.dialogFormVisible = false
              this.handleFilter()
              this.$notify({
                type: 'success',
                title: this.dialogStatus === 'create' ? '新增成功' : '更新成功',
                duration: 2000
              })
            })
          }
        })
      },
      deleteData(ids) {
        deleteCooperateWarehouse(ids).then(() => {
          this.handleFilter()
          this.$notify({
            type: 'success',
            message: '删除成功',
            duration: 2000
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
