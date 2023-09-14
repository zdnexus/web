<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" placeholder="输入车架号" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleFilter">
        查询
      </el-button>
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

      <el-table-column label="成本合计" prop="costTotalFee" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.costTotalFee }}</span>
        </template>
      </el-table-column>

      <el-table-column label="应收合计" prop="quotationTotalFee" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.quotationTotalFee }}</span>
        </template>
      </el-table-column>

      <el-table-column label="报价" align="center">
        <el-table-column label="报价" prop="quotationFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.quotationFee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="美金" prop="usdFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.usdFee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="汇率" prop="exchangeRate" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.exchangeRate }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="接车验车" align="center">
        <el-table-column label="验车费（应收）" prop="inspecteIncomeFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.inspecteIncomeFee }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="非监管仓" align="center">
        <el-table-column label="仓储费（成本）" prop="ncrFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.ncrFee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整备费用（应收）" prop="trimFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.trimFee }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="监管仓" align="center">
        <el-table-column label="仓储费（成本）" prop="bwhFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.bwhFee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="整备费用（应收）" prop="trimFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.trimFee }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="报关环节" align="center">
        <el-table-column label="报关费用（成本）" prop="declarationFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.declarationFee }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="司机燃车费用" align="center">
        <el-table-column label="送车费（成本）" prop="driverFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.driverFee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="差旅费（成本）" prop="travelFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.travelFee }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="境外费用" align="center">
        <el-table-column label="成本" prop="abroadFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.abroadFee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应收" prop="abroadIncomeFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.abroadIncomeFee }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="其他费用" align="center">
        <el-table-column label="成本" prop="otherFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.otherFee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应收" prop="otherIncomeFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.otherIncomeFee }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="利润合计" prop="profitFee" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.profitFee }}</span>
        </template>
      </el-table-column>

      <el-table-column label="审核状态" prop="auditStatus" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ ORDER_EXAMINE_STATUS_OBJ[row.auditStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="审核备注" prop="remark" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
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

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="400">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('update',row)">
            录入费用
          </el-button>

          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('view',row)">
            费用详情
          </el-button>

          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('view',row)">
            申请开票
          </el-button>

          <el-button size="mini" type="primary" style="margin-right: 10px" @click="handleRow('view',row)">
            申请付款
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:10px;">
        <el-form-item label="报价" prop="vin">
          <el-input v-model="temp.vin"/>
        </el-form-item>

        <el-form-item label="美元" prop="strageFree">
          <el-input v-model="temp.strageFree"/>
        </el-form-item>

        <el-form-item label="汇率" prop="trimFree">
          <el-input v-model="temp.trimFree"/>
        </el-form-item>

        <el-form-item label="非监管仓仓储费用" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="非监管仓基本费用" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="非监管仓基本天数" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="非监管仓超期天数" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="监管仓仓储费用" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="监管仓基本费用" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="监管仓基本天数" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="监管仓超期天数" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="报关费" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="送车费" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="差旅费" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="验车费" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="整备费" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
        </el-form-item>

        <el-form-item label="监管仓超期天数" prop="ncrFree">
          <el-input v-model="temp.ncrFree"/>
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
    orderFeeList,
    createOrderFee,
    updateOrderFee,
    viewOrderFee,
    deleteOrderFee
  } from '@/api/vehicle/cost/index'
  import { ORDER_EXAMINE_STATUS_OBJ } from '@/constant/vehicle'

  export default {
    components: { Pagination, Upload },
    data() {
      return {
        ORDER_EXAMINE_STATUS_OBJ,
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
