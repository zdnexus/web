<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" class="filter-item" style="width: 200px" placeholder="输入仓库名称" @keyup.enter.native="handleFilter"/>

      <el-button type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button type="primary" class="filter-item" icon="el-icon-edit" @click="handleRow(TEMP_TYPE_CREATE)">
        添加仓库名称
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

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 550px">
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
  import Pagination from '@/components/Pagination'
  import {
    ParameterWarehouseList,
    createParameterWarehouse,
    deleteParameterWarehouse,
    updateParameterWarehouse
  } from '@/api/vehicle/parameter/warehouse'
  import {
    PAGE_TOTAL,
    PAGE_NUM,
    PAGE_SIZE,
    TEMP_TYPE_CREATE,
    TEMP_TYPE_DELETE,
    TEMP_TYPE_UPDATE,
    TEMP_TYPE,
    WAREHOUSE_TYPE_LIST,
    WAREHOUSE_TYPE_LIST_OBJ
  } from '@/constant'

  export default {
    components: { Pagination },
    data() {
      return {
        TEMP_TYPE_CREATE,
        TEMP_TYPE_DELETE,
        TEMP_TYPE_UPDATE,
        TEMP_TYPE,
        WAREHOUSE_TYPE_LIST,
        WAREHOUSE_TYPE_LIST_OBJ,
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
          name: undefined,
          type: undefined,
          address: undefined,
          basePrice: undefined,
          baseDay: undefined,
          overduePrice: undefined
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
        ParameterWarehouseList(this.listQuery).then((res) => {
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
          type: undefined,
          address: undefined,
          basePrice: undefined,
          baseDay: undefined,
          overduePrice: undefined,
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
              deleteParameterWarehouse(ids).then(() => {
                this.$deleteTempNotify()
                this.handleFilter()
              })
            }
            break
        }
      },
      handleData() {
        const isCreateTemp = this.$isCreateTemp(this.dialogStatus)
        const fun = isCreateTemp ? createParameterWarehouse : updateParameterWarehouse
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            fun(this.temp).then(() => {
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
