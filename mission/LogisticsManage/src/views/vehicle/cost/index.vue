<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.vin" placeholder="输入车架号" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table :key="listKey" v-loading="listLoading" :data="list" border fit highlight-current-row @selection-change="handleIdChange">
      <el-table-column
        type="selection"
        width="55"
      />

      <el-table-column label="ID" prop="id" align="center" width="100">
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
        <el-table-column label="美金" prop="trimFee" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.trimFee }}</span>
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

      <el-table-column label="付款状态" prop="payStatus" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ ORDER_EXAMINE_STATUS_OBJ[row.payStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开票状态" prop="invoiceStatus" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ ORDER_EXAMINE_STATUS_OBJ[row.invoiceStatus] }}</span>
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

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="500">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="primary"
            style="margin-right: 10px"
            :disabled="[ORDER_EXAMINE_STATUS_AUDITING,ORDER_EXAMINE_STATUS_PASSED].includes(row.auditStatus)"
            @click="handleRow('update',row)"
          >
            录入费用
          </el-button>

          <el-button size="mini" type="primary" @click="handleRow('view',row)">
            费用详情
          </el-button>

          <el-popconfirm title="请确认发起审核？" @onConfirm="handleRow('audit',row)">
            <el-button
              slot="reference"
              size="mini"
              type="primary"
              :disabled="[ORDER_EXAMINE_STATUS_AUDITING,ORDER_EXAMINE_STATUS_PASSED].includes(row.auditStatus)"
            >
              发起审核
            </el-button>
          </el-popconfirm>

          <el-popconfirm title="请确认发起申请付款？" @onConfirm="handleRow('pay',row)">
            <el-button
              slot="reference"
              size="mini"
              type="primary"
              :disabled="[ORDER_EXAMINE_STATUS_AUDITING,ORDER_EXAMINE_STATUS_PASSED].includes(row.payStatus)"
            >
              申请付款
            </el-button>
          </el-popconfirm>

          <el-popconfirm title="请确认发起申请开票？" @onConfirm="handleRow('invoice',row)">
            <el-button
              slot="reference"
              size="mini"
              type="primary"
              :disabled="[ORDER_EXAMINE_STATUS_AUDITING,ORDER_EXAMINE_STATUS_PASSED].includes(row.invoiceStatus)"
            >
              申请开票
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="OPERATE_TYPE[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="200px" style="width: 600px" :disabled="viewData">
        <el-form-item label="报价" prop="vin">
          <el-input v-model="temp.vin" />
        </el-form-item>

        <el-form-item label="美元" prop="usdFee">
          <el-input v-model="temp.usdFee" />
        </el-form-item>

        <el-form-item label="汇率" prop="exchangeRate">
          <el-input v-model="temp.exchangeRate" />
        </el-form-item>

        <el-form-item label="非监管仓仓储费用凭证" prop="ncrBillVoucher">
          <Upload v-model="temp.ncrBillVoucher" />
        </el-form-item>

        <el-form-item label="非监管仓仓储费用" prop="ncrFee">
          <el-input v-model="temp.ncrFee" />
        </el-form-item>

        <el-form-item label="非监管仓基本费用" prop="ncrBasePrice">
          <el-input v-model="temp.ncrBasePrice" />
        </el-form-item>

        <el-form-item label="非监管仓基本天数" prop="ncrBaseDay">
          <el-input v-model="temp.ncrBaseDay" />
        </el-form-item>

        <el-form-item label="非监管仓超期费用/天" prop="ncrOverduePrice">
          <el-input v-model="temp.ncrOverduePrice" />
        </el-form-item>

        <el-form-item label="监管仓仓储费用凭证" prop="bwhBillVoucher">
          <Upload v-model="temp.bwhBillVoucher" />
        </el-form-item>

        <el-form-item label="监管仓仓储费用" prop="bwhFee">
          <el-input v-model="temp.bwhFee" />
        </el-form-item>

        <el-form-item label="监管仓基本费用" prop="bwhBasePrice">
          <el-input v-model="temp.bwhBasePrice" />
        </el-form-item>

        <el-form-item label="监管仓基本天数" prop="bwhBaseDay">
          <el-input v-model="temp.bwhBaseDay" />
        </el-form-item>

        <el-form-item label="监管仓超期费用/天" prop="bwhOverduePrice">
          <el-input v-model="temp.bwhOverduePrice" />
        </el-form-item>

        <el-form-item label="报关费凭证" prop="declarationBillVoucher">
          <Upload v-model="temp.declarationBillVoucher" />
        </el-form-item>

        <el-form-item label="报关费" prop="declarationFee">
          <el-input v-model="temp.declarationFee" />
        </el-form-item>

        <el-form-item label="送车费凭证" prop="driverBillVoucher">
          <Upload v-model="temp.driverBillVoucher" />
        </el-form-item>

        <el-form-item label="送车费" prop="driverFee">
          <el-input v-model="temp.driverFee" />
        </el-form-item>

        <el-form-item label="验车费凭证" prop="inspectebwhBillVoucher">
          <Upload v-model="temp.inspectebwhBillVoucher" />
        </el-form-item>

        <el-form-item label="验车费" prop="inspecteIncomeFee">
          <el-input v-model="temp.inspecteIncomeFee" />
        </el-form-item>

        <el-form-item label="整备费凭证" prop="trimBillVoucher">
          <Upload v-model="temp.trimBillVoucher" />
        </el-form-item>

        <el-form-item label="整备费" prop="trimFee">
          <el-input v-model="temp.trimFee" />
        </el-form-item>

        <div>
          <h2>境外费用列表</h2>

          <div v-if="!viewData">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="abroadTemp.name" />
            </el-form-item>

            <el-form-item label="金额" prop="free">
              <el-input v-model="abroadTemp.free" />
            </el-form-item>

            <el-form-item label="发票" prop="photoUrl">
              <Upload v-model="abroadTemp.photoUrl" />
            </el-form-item>

            <el-form-item label="成本或应收" prop="freeType">
              <el-select v-model="abroadTemp.freeType" class="filter-item" placeholder="">
                <el-option v-for="item in FREE_STATUS" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="">
              <el-button type="primary" @click="enterExpensesAbroad">
                录入费用
              </el-button>
            </el-form-item>

          </div>

          <el-table
            :key="listKey+1"
            v-loading="listLoading"
            :data="temp.vehicleAbroadFreeList"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="姓名" prop="name" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="金额" prop="free" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ row.free }}</span>
              </template>
            </el-table-column>

            <el-table-column label="发票" prop="photoUrl" align="center" width="125">
              <template slot-scope="{row}">
                <img width="100" :src="row.photoUrl">
              </template>
            </el-table-column>

            <el-table-column label="成本或应收" prop="freeType" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ FREE_STATUS_OBJ[row.freeType] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div>
          <h2>其他费用列表</h2>

          <div v-if="!viewData">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="otherTemp.name" />
            </el-form-item>

            <el-form-item label="金额" prop="free">
              <el-input v-model="otherTemp.free" />
            </el-form-item>

            <el-form-item label="发票" prop="photoUrl">
              <Upload v-model="otherTemp.photoUrl" />
            </el-form-item>

            <el-form-item label="成本或应收" prop="freeType">
              <el-select v-model="otherTemp.freeType" class="filter-item" placeholder="">
                <el-option v-for="item in FREE_STATUS" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="" prop="">
              <el-button type="primary" @click="enterExpensesOther">
                录入费用
              </el-button>
            </el-form-item>
          </div>

          <el-table
            :key="listKey+2"
            v-loading="listLoading"
            :data="temp.vehicleOtherFeeList"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="姓名" prop="name" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="金额" prop="free" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ row.free }}</span>
              </template>
            </el-table-column>

            <el-table-column label="发票" prop="photoUrl" align="center" width="125">
              <template slot-scope="{row}">
                <img width="100" :src="row.photoUrl">
              </template>
            </el-table-column>

            <el-table-column label="成本或应收" prop="freeType" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ FREE_STATUS_OBJ[row.freeType] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div>
          <h2>差旅费用列表</h2>

          <div v-if="!viewData">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="travelTemp.name" />
            </el-form-item>

            <el-form-item label="金额" prop="free">
              <el-input v-model="travelTemp.free" />
            </el-form-item>

            <el-form-item label="发票" prop="photoUrl">
              <Upload v-model="travelTemp.photoUrl" />
            </el-form-item>

            <el-form-item label="成本或应收" prop="freeType">
              <el-select v-model="travelTemp.freeType" class="filter-item" placeholder="">
                <el-option v-for="item in FREE_STATUS" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="" prop="">
              <el-button type="primary" @click="enterExpensesTravel">
                录入费用
              </el-button>
            </el-form-item>
          </div>

          <el-table
            :key="listKey+3"
            v-loading="listLoading"
            :data="temp.vehicleTravelFreeList"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="姓名" prop="name" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="金额" prop="free" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ row.free }}</span>
              </template>
            </el-table-column>

            <el-table-column label="发票" prop="photoUrl" align="center" width="125">
              <template slot-scope="{row}">
                <img width="100" :src="row.photoUrl">
              </template>
            </el-table-column>

            <el-table-column label="成本或应收" prop="freeType" align="center" width="125">
              <template slot-scope="{row}">
                <span>{{ FREE_STATUS_OBJ[row.freeType] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-form-item label="成本合计" prop="costTotalFee">
          <el-input v-model="temp.costTotalFee" />
        </el-form-item>

        <el-form-item label="应收合计" prop="quotationTotalFee">
          <el-input v-model="temp.quotationTotalFee" />
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
  // deleteOrderFee,
  viewOrderFee,
  auditOrderFee,
  paymentVehiclePayment,
  invoicingVehicleInvoice
} from '@/api/vehicle/cost/index'
import {
  OPERATE_TYPE,
  ORDER_EXAMINE_STATUS_AUDITING,
  ORDER_EXAMINE_STATUS_PASSED,
  ORDER_EXAMINE_STATUS_OBJ,
  FREE_STATUS,
  FREE_STATUS_OBJ
} from '@/constant'

export default {
  components: { Pagination, Upload },
  data() {
    return {
      OPERATE_TYPE,
      ORDER_EXAMINE_STATUS_AUDITING,
      ORDER_EXAMINE_STATUS_PASSED,
      ORDER_EXAMINE_STATUS_OBJ,
      FREE_STATUS,
      FREE_STATUS_OBJ,
      listKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        vin: undefined,
        pageNum: 1,
        pageSize: 20
      },
      ids: [],
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        vin: undefined,
        usdFee: undefined,
        exchangeRate: undefined,
        ncrFee: undefined,
        ncrBasePrice: undefined,
        ncrBaseDay: undefined,
        ncrOverduePrice: undefined,
        bwhFee: undefined,
        bwhBasePrice: undefined,
        bwhBaseDay: undefined,
        declarationFee: undefined,
        driverFee: undefined,
        inspecteIncomeFee: undefined,
        trimFee: undefined,
        vehicleAbroadFreeList: [],
        vehicleOtherFeeList: [],
        vehicleTravelFreeList: [],
        costTotalFee: undefined,
        quotationTotalFee: undefined
      },
      abroadTemp: {
        name: undefined,
        free: undefined,
        photoUrl: undefined,
        freeType: undefined
      },
      otherTemp: {
        name: undefined,
        free: undefined,
        photoUrl: undefined,
        freeType: undefined
      },
      travelTemp: {
        name: undefined,
        free: undefined,
        photoUrl: undefined,
        freeType: undefined
      },
      rules: {
        vin: [{ required: true, message: '请输入车架号', trigger: 'blur' }],
        usdFee: [{ required: true, message: '请输入美元', trigger: 'blur' }],
        exchangeRate: [{ required: true, message: '请输入汇率', trigger: 'blur' }]
      }
    }
  },
  computed: {
    viewData() {
      return this.dialogStatus === 'view'
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
    handleIdChange(rows) {
      this.ids = rows.map(row => row.id)
    },
    resetTemp() {
      this.temp = {
        vin: undefined,
        usdFee: undefined,
        exchangeRate: undefined,
        ncrFee: undefined,
        ncrBasePrice: undefined,
        ncrBaseDay: undefined,
        ncrOverduePrice: undefined,
        bwhFee: undefined,
        bwhBasePrice: undefined,
        bwhBaseDay: undefined,
        declarationFee: undefined,
        driverFee: undefined,
        inspecteIncomeFee: undefined,
        trimFee: undefined,
        vehicleAbroadFreeList: [],
        vehicleOtherFeeList: [],
        vehicleTravelFreeList: [],
        costTotalFee: undefined,
        quotationTotalFee: undefined
      }
    },
    resetAbroadTemp() {
      this.abroadTemp = {
        name: undefined,
        free: undefined,
        photoUrl: undefined,
        freeType: undefined
      }
    },
    resetOtherTemp() {
      this.otherTemp = {
        name: undefined,
        free: undefined,
        photoUrl: undefined,
        freeType: undefined
      }
    },
    resetTravelTemp() {
      this.travelTemp = {
        name: undefined,
        free: undefined,
        photoUrl: undefined,
        freeType: undefined
      }
    },
    handleData() {
      const fun = this.dialogStatus === 'create' ? createOrderFee : updateOrderFee
      this.$refs.dataForm.validate((valid) => {
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
      this.dialogStatus = type
      let reqData = null
      switch (type) {
        case 'create':
          this.resetTemp()
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs.dataForm.clearValidate()
          })
          break
        case 'update':
        case 'view':
          reqData = [row.id]
          viewOrderFee(reqData).then((res) => {
            this.temp = {
              ...res.data,
              vehicleAddAbroadFreeList: [],
              vehicleAddOtherFeeList: [],
              vehicleAddTravelFreeList: []
            }
          })
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs.dataForm.clearValidate()
          })
          break
        case 'audit':
          reqData = { id: row.id }
          auditOrderFee(reqData).then((res) => {
            this.$notify({
              type: 'success',
              title: '已提交审核',
              duration: 3000
            })
            this.handleFilter()
          })
          break
        case 'pay':
          reqData = {
            orderId: row.orderId,
            id: row.id,
            vin: row.vin
          }
          paymentVehiclePayment(reqData).then((res) => {
            this.$notify({
              type: 'success',
              title: '已提交付款',
              duration: 3000
            })
            this.handleFilter()
          })
          break
        case 'invoice':
          reqData = {
            orderId: row.orderId,
            id: row.id,
            vin: row.vin
          }
          invoicingVehicleInvoice(reqData).then((res) => {
            this.$notify({
              type: 'success',
              title: '已提交开票',
              duration: 3000
            })
            this.handleFilter()
          })
          break
      }
    },
    enterExpensesAbroad() {
      const o = {
        name: this.abroadTemp.name,
        free: this.abroadTemp.free,
        photoUrl: this.abroadTemp.photoUrl,
        freeType: this.abroadTemp.freeType
      }
      this.temp.vehicleAbroadFreeList.push(o)
      this.temp.vehicleAddAbroadFreeList.push(o)
      this.resetAbroadTemp()
    },
    enterExpensesOther() {
      const o = {
        name: this.otherTemp.name,
        free: this.otherTemp.free,
        photoUrl: this.otherTemp.photoUrl,
        freeType: this.otherTemp.freeType
      }
      this.temp.vehicleOtherFeeList.push(o)
      this.temp.vehicleAddOtherFeeList.push(o)
      this.resetOtherTemp()
    },
    enterExpensesTravel() {
      const o = {
        name: this.travelTemp.name,
        free: this.travelTemp.free,
        photoUrl: this.travelTemp.photoUrl,
        freeType: this.travelTemp.freeType
      }
      this.temp.vehicleTravelFreeList.push(o)
      this.temp.vehicleAddTravelFreeList.push(o)
      this.resetTravelTemp()
    }
  }
}
</script>
