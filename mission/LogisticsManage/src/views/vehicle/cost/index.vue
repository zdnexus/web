<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" placeholder="输入车架号" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleRow('create')">
        添加订单费用
      </el-button>

      <el-popconfirm title="确认要删除吗？" style="margin-left: 10px" @onConfirm="handleRow('delete')">
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
      style="width: 100%"
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

      <el-table-column label="车架号" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.vin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="合计成本" prop="costTotalFree" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.costTotalFree }}</span>
        </template>
      </el-table-column>

      <el-table-column label="实际仓储费用" prop="strageFree" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.strageFree }}</span>
        </template>
      </el-table-column>

      <el-table-column label="整备费用" prop="trimFree" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.trimFree }}</span>
        </template>
      </el-table-column>

      <el-table-column label="境外费用" prop="abroadFree" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.abroadFree }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="报价费用" prop="quotationFree" align="center" width="100">-->
        <!--<template slot-scope="{row}">-->
          <!--<span>{{ row.quotationFree }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="监管仓仓储费用" prop="bwhFree" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.bwhFree }}</span>
        </template>
      </el-table-column>

      <el-table-column label="非监管仓仓储费用" prop="ncrFree" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.ncrFree }}</span>
        </template>
      </el-table-column>

      <el-table-column label="送车费用" prop="driverFree" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.driverFree }}</span>
        </template>
      </el-table-column>

      <el-table-column label="其他费用" prop="otherFree" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.otherFree }}</span>
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

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="300">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('update',row)">
            更新
          </el-button>

          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('view',row)">
            费用明细
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="temp.vin"/>
        </el-form-item>

        <el-form-item label="实际仓储费用" prop="strageFree">
          <el-input v-model="temp.strageFree"/>
        </el-form-item>

        <el-form-item label="整备费用" prop="trimFree">
          <el-input v-model="temp.trimFree"/>
        </el-form-item>

        <el-form-item label="境外费用" prop="abroadFree">
          <el-input v-model="temp.abroadFree"/>
        </el-form-item>

        <el-form-item label="监管仓仓储费用" prop="bwhFree">
          <el-input v-model="temp.bwhFree"/>
        </el-form-item>

        <el-form-item label="非监管仓仓储费用" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="送车费用" prop="driverFree">
          <el-input v-model="temp.driverFree"/>
        </el-form-item>

        <el-form-item label="其他费用" prop="otherFree">
          <el-input v-model="temp.otherFree"/>
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
    orderFeeList,
    createOrderFee,
    updateOrderFee,
    viewOrderFee,
    deleteOrderFee
  } from '@/api/vehicle/cost/index'

  export default {
    components: { Pagination },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          vin: undefined,
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
          vin: [{ required: true, message: '请输入车架号', trigger: 'blur' }],
          strageFree: [{ required: true, message: '请输入实际仓储费用', trigger: 'blur' }],
          trimFree: [{ required: true, message: '请输入整备费用', trigger: 'blur' }],
          abroadFree: [{ required: true, message: '请输入境外费用', trigger: 'blur' }],
          bwhFree: [{ required: true, message: '请输入监管仓仓储费用', trigger: 'blur' }],
          ncrFree: [{ required: true, message: '请输入非监管仓仓储费用', trigger: 'blur' }],
          driverFree: [{ required: true, message: '请输入送车费用', trigger: 'blur' }],
          otherFree: [{ required: true, message: '请输入其他费用', trigger: 'blur' }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        orderFeeList(this.listQuery).then(res => {
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
        const fun = this.dialogStatus === 'create' ? createOrderFee : updateOrderFee
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
        deleteOrderFee(ids).then(() => {
          this.handleFilter()
          this.$notify({
            type: 'success',
            message: '删除成功',
            duration: 3000
          })
        })
      },
      viewData(ids) {
        viewOrderFee(ids).then((res) => {
          debugger
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
          case 'view':
            this.viewData([row.id])
            break
        }
      }
    }
  }
</script>
