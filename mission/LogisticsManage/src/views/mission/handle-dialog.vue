<template>
  <el-dialog :title="vehicleInfo && vehicleInfo.smallLinkConvert" :visible.sync="value">
    <div v-if="isDeclareUpload">
      <el-form ref="dataForm" :rules="rules" :model="vehicleInfo" :disabled="disabled" label-position="left" label-width="150px" style="width: 550px">
        <el-form-item label="车架号" prop="vehicleBaseInfo.vin">
          <el-input v-model="vehicleInfo.vehicleBaseInfo.vin" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="vehicleBaseInfo.type">
          <el-select v-model="vehicleInfo.vehicleBaseInfo.type" class="filter-item" :disabled="true">
            <el-option v-for="item in vehicleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否有损" prop="vehicleBaseInfo.isDamage">
          <el-input v-model="DAMAGE_TYPE_LIST_OBJ[vehicleInfo.vehicleBaseInfo.isDamage]" :disabled="true"/>
        </el-form-item>

        <el-form-item label="品牌" prop="vehicleBaseInfo.branding">
          <el-input v-model="vehicleInfo.vehicleBaseInfo.branding" :disabled="true"/>
        </el-form-item>

        <el-form-item label="型号" prop="vehicleBaseInfo.vehicleModel">
          <el-input v-model="vehicleInfo.vehicleBaseInfo.vehicleModel" :disabled="true"/>
        </el-form-item>

        <el-form-item label="颜色" prop="vehicleBaseInfo.vehicleColor">
          <el-input v-model="vehicleInfo.vehicleBaseInfo.vehicleColor" :disabled="true"/>
        </el-form-item>

        <el-form-item label="钥匙数量" prop="vehicleBaseInfo.vehicleKey">
          <el-input v-model="vehicleInfo.vehicleBaseInfo.vehicleKey" :disabled="true"/>
        </el-form-item>

        <el-form-item label="随车配件" prop="vehicleBaseInfo.carAccessories">
          <el-input v-model="vehicleInfo.vehicleBaseInfo.carAccessories" :disabled="true"/>
        </el-form-item>

        <h2>车辆图片</h2>

        <el-form-item v-for="(value,key) in VEHICLE_PHOTO_OBJ" :label="value" :prop="key">
          <video v-if="key === 'video'" width="300" height="300" :src="vehicleInfo.vehiclePhoto[key]" controls/>
          <el-image
            v-for="img2 in vehicleInfo.vehiclePhoto.demage.split(',')"
            v-else-if="key ==='demage'"
            style="width: 100px; height: 100px;margin-right: 10px"
            :src="img2"
          />
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :src="vehicleInfo.vehiclePhoto[key]"
          />
        </el-form-item>

        <el-form-item label="上传报关资料" prop="vehicleDeclare.declareUrl">
          <Upload
            v-model="vehicleInfo.vehicleDeclare.declareUrl"
            :multiple="true"
            :disabled="isDeclareCheck"
          />
        </el-form-item>

        <div v-if="isDeclareCheck">
          <el-form-item label="审核报关资料" prop="vehicleDeclare.declareCheck">
            <el-select v-model="vehicleInfo.vehicleDeclare.declareCheck" placeholder="">
              <el-option v-for="item in CHECK_STATUS" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>

          <el-form-item v-if="vehicleInfo.vehicleDeclare.declareCheck === CHECK_STATUS_REJECT" label="驳回备注" prop="vehicleDeclare.remark">
            <el-input v-model="vehicleInfo.vehicleDeclare.remark"/>
          </el-form-item>
        </div>

        <div v-if="isRecordUpload">
          <el-form-item label="上传预录单" prop="vehicleDeclare.recordUrl">
            <Upload
              v-model="vehicleInfo.vehicleDeclare.recordUrl"
              :multiple="true"
              :disabled="isRecordCheck"
            />
          </el-form-item>
        </div>

        <div v-if="isRecordCheck">
          <el-form-item label="审核预录单" prop="vehicleDeclare.recordCheck">
            <el-select v-model="vehicleInfo.vehicleDeclare.recordCheck" placeholder="">
              <el-option v-for="item in CHECK_STATUS" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>

          <el-form-item v-if="vehicleInfo.vehicleDeclare.recordCheck === CHECK_STATUS_REJECT" label="驳回备注" prop="vehicleDeclare.remark">
            <el-input v-model="vehicleInfo.vehicleDeclare.remark"/>
          </el-form-item>
        </div>

        <div v-if="isCustomCar">
          <el-form-item label="上传报关单" prop="vehicleDeclare.customUrl">
            <Upload
              v-model="vehicleInfo.vehicleDeclare.customUrl"
              :multiple="true"
            />
          </el-form-item>
        </div>

        <div v-if="isCustomCar">
          <el-form-item label="是否放行" prop="vehicleDeclare.isGo">
            <el-checkbox v-model="vehicleInfo.vehicleDeclare.isGo"/>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="value = false">取消</el-button>

        <el-button type="primary" @click="handleData(vehicleInfo)">确认</el-button>
      </div>
    </div>

    <div v-if="isFA">
      <el-form ref="dataForm" :model="vehicleInfo" :disabled="disabled" label-position="left" label-width="150px" style="width: 550px">
        <el-form-item label="车架号" prop="vehicleBaseInfo.vin">
          <el-input v-model="vehicleInfo.vin" :disabled="true"/>
        </el-form-item>

        <el-form-item label="类型" prop="vehicleBaseInfo.type">
          <el-select v-model="vehicleInfo.type" class="filter-item" :disabled="true">
            <el-option v-for="item in vehicleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户姓名" prop="vehicleBaseInfo.clientName">
          <el-input v-model="vehicleInfo.clientName"/>
        </el-form-item>

        <el-form-item label="电话" prop="vehicleBaseInfo.mobile">
          <el-input v-model="vehicleInfo.mobile"/>
        </el-form-item>

        <el-form-item label="公司" prop="vehicleBaseInfo.company">
          <el-input v-model="vehicleInfo.company"/>
        </el-form-item>

        <el-form-item label="报价" prop="vehicleBaseInfo.quotationFee">
          <el-input v-model="vehicleInfo.quotationFee"/>
        </el-form-item>

        <el-form-item label="美元" prop="vehicleBaseInfo.usdFee">
          <el-input v-model="vehicleInfo.usdFee"/>
        </el-form-item>

        <el-form-item label="汇率" prop="vehicleBaseInfo.exchangeRate">
          <el-input v-model="vehicleInfo.exchangeRate"/>
        </el-form-item>

        <el-form-item label="非监管仓仓储费用凭证" prop="vehicleBaseInfo.ncrBillVoucher">
          <Upload v-model="vehicleInfo.ncrBillVoucher"/>
        </el-form-item>

        <el-form-item label="非监管仓仓储费用" prop="vehicleBaseInfo.ncrFee">
          <el-input v-model="vehicleInfo.ncrFee"/>
        </el-form-item>

        <el-form-item label="非监管仓基本费用" prop="vehicleBaseInfo.ncrBasePrice">
          <el-input v-model="vehicleInfo.ncrBasePrice"/>
        </el-form-item>

        <el-form-item label="非监管仓基本天数" prop="vehicleBaseInfo.ncrBaseDay">
          <el-input v-model="vehicleInfo.ncrBaseDay"/>
        </el-form-item>

        <el-form-item label="非监管仓超期天数" prop="vehicleBaseInfo.ncrOverduePrice">
          <el-input v-model="vehicleInfo.ncrOverduePrice"/>
        </el-form-item>

        <el-form-item label="监管仓仓储费用凭证" prop="vehicleBaseInfo.bwhBillVoucher">
          <Upload v-model="vehicleInfo.bwhBillVoucher"/>
        </el-form-item>

        <el-form-item label="监管仓仓储费用" prop="vehicleBaseInfo.bwhFee">
          <el-input v-model="vehicleInfo.bwhFee"/>
        </el-form-item>

        <el-form-item label="监管仓基本费用" prop="vehicleBaseInfo.bwhBasePrice">
          <el-input v-model="vehicleInfo.bwhBasePrice"/>
        </el-form-item>

        <el-form-item label="监管仓基本天数" prop="vehicleBaseInfo.bwhBaseDay">
          <el-input v-model="vehicleInfo.bwhBaseDay"/>
        </el-form-item>

        <el-form-item label="监管仓超期天数" prop="vehicleBaseInfo.bwhOverduePrice">
          <el-input v-model="vehicleInfo.bwhOverduePrice"/>
        </el-form-item>

        <el-form-item label="报关费凭证" prop="vehicleBaseInfo.declarationBillVoucher">
          <Upload v-model="vehicleInfo.declarationBillVoucher"/>
        </el-form-item>

        <el-form-item label="报关费" prop="vehicleBaseInfo.declarationFee">
          <el-input v-model="vehicleInfo.declarationFee"/>
        </el-form-item>

        <el-form-item label="送车费凭证" prop="vehicleBaseInfo.driverBillVoucher">
          <Upload v-model="vehicleInfo.driverBillVoucher"/>
        </el-form-item>

        <el-form-item label="送车费" prop="vehicleBaseInfo.driverFee">
          <el-input v-model="vehicleInfo.driverFee"/>
        </el-form-item>

        <el-form-item label="验车费凭证" prop="vehicleBaseInfo.inspectebwhBillVoucher">
          <Upload v-model="vehicleInfo.inspectebwhBillVoucher"/>
        </el-form-item>

        <el-form-item label="验车费" prop="vehicleBaseInfo.inspecteIncomeFee">
          <el-input v-model="vehicleInfo.inspecteIncomeFee"/>
        </el-form-item>

        <el-form-item label="整备费凭证" prop="vehicleBaseInfo.trimBillVoucher">
          <Upload v-model="vehicleInfo.trimBillVoucher"/>
        </el-form-item>

        <el-form-item label="整备费" prop="vehicleBaseInfo.trimFee">
          <el-input v-model="vehicleInfo.trimFee"/>
        </el-form-item>

        <h2>境外费用列表</h2>

        <el-table :key="listKey" :data="vehicleInfo.vehicleAbroadFreeList" border fit highlight-current-row>
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

        <h2>其他费用列表</h2>

        <el-table :key="listKey+1" :data="vehicleInfo.vehicleOtherFeeList" border fit highlight-current-row>
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

        <h2>差旅费用列表</h2>

        <el-table :key="listKey+2" :data="vehicleInfo.vehicleTravelFreeList" border fit highlight-current-row>
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

        <el-form-item label="成本合计" prop="costTotalFee" style="margin-top: 20px">
          <el-input v-model="vehicleInfo.costTotalFee"/>
        </el-form-item>

        <el-form-item label="应收合计" prop="quotationTotalFee">
          <el-input v-model="vehicleInfo.quotationTotalFee"/>
        </el-form-item>

        <el-form-item label="利润合计" prop="costTotalFee">
          <el-input v-model="vehicleInfo.costTotalFee"/>
        </el-form-item>

        <el-form-item label="审批" prop="result">
          <el-select v-model="vehicleInfo.result" placeholder="">
            <el-option v-for="item in CHECK_STATUS" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item v-if="vehicleInfo.result === CHECK_STATUS_REJECT" label="驳回备注" prop="remark">
          <el-input v-model="vehicleInfo.remark"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleData(vehicleInfo)">同意</el-button>
      </div>
    </div>

    <el-form v-if="isNUMS_WARN" ref="dataForm" :model="vehicleInfo" :disabled="disabled" label-position="left" label-width="150px" style="width: 550px">
      <el-form-item label="车架号" prop="vehicleBaseInfo.vin">
        <el-input v-model="vehicleInfo.vin" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="vehicleBaseInfo.type">
        <el-select v-model="vehicleInfo.type" class="filter-item">
          <el-option v-for="item in vehicleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="客户姓名" prop="vehicleBaseInfo.clientName">
        <el-input v-model="vehicleInfo.clientName"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="vehicleBaseInfo.mobile">
        <el-input v-model="vehicleInfo.mobile"></el-input>
      </el-form-item>

      <el-form-item label="公司" prop="vehicleBaseInfo.company">
        <el-input v-model="vehicleInfo.company"></el-input>
      </el-form-item>

      <el-form-item label="出库" prop="result">
        <el-select v-model="vehicleInfo.result" placeholder="">
          <el-option v-for="item in CHECK_STATUS" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="vehicleInfo.result === CHECK_STATUS_REJECT" label="驳回备注" prop="remark">
        <el-input v-model="vehicleInfo.remark"></el-input>
      </el-form-item>
    </el-form>

    <div v-if="isNUMS_WARN" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleData(vehicleInfo)">同意</el-button>
    </div>

    <el-form v-if="isTRACK" ref="dataForm" :model="vehicleInfo" :disabled="disabled" label-position="left" label-width="100px" style="width: 500px">
      <el-form-item label="车架号" prop="vin">
        <el-input v-model="vehicleInfo.vin" :disabled="true"/>
      </el-form-item>

      <el-form-item label="类型" prop="vehicleBaseInfo.type">
        <el-select v-model="vehicleInfo.type" class="filter-item" :disabled="true">
          <el-option v-for="item in vehicleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="客户姓名" prop="clientName">
        <el-input v-model="vehicleInfo.clientName"/>
      </el-form-item>

      <el-form-item label="电话" prop="mobile">
        <el-input v-model="vehicleInfo.mobile"/>
      </el-form-item>

      <el-form-item label="公司" prop="company">
        <el-input v-model="vehicleInfo.company"/>
      </el-form-item>

      <el-form-item label="途径地列表" prop="vehicleInfo.vehicleTrackRecordList">
        <el-table :key="listKey" :data="vehicleInfo.vehicleTrackRecordList" border fit highlight-current-row>
          <el-table-column label="车架号" prop="vin" align="center" width="133">
            <template slot-scope="{row}">
              <span>{{ row.vin }}</span>
            </template>
          </el-table-column>

          <el-table-column label="到达地" prop="trackPlace" align="center" width="133">
            <template slot-scope="{row}">
              <span>{{ row.trackPlace }}</span>
            </template>
          </el-table-column>

          <el-table-column label="更新时间" prop="updateTime" align="center" width="133">
            <template slot-scope="{row}">
              <span>{{ row.updateTime }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="途径地" prop="trackPlace">
        <el-input v-model="vehicleInfo.trackPlace"/>
      </el-form-item>
    </el-form>

    <div v-if="isTRACK" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleData(vehicleInfo)">运踪更新</el-button>
    </div>

    <el-form v-if="isARRIVE" ref="dataForm" :model="vehicleInfo" :disabled="disabled" label-position="left" label-width="150px" style="width: 550px">
      <el-form-item label="车架号" prop="vehicleBaseInfo.vin">
        <el-input v-model="vehicleInfo.vin" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="vehicleBaseInfo.type">
        <el-select v-model="vehicleInfo.type" class="filter-item">
          <el-option v-for="item in vehicleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="客户姓名" prop="vehicleBaseInfo.clientName">
        <el-input v-model="vehicleInfo.clientName"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="vehicleBaseInfo.mobile">
        <el-input v-model="vehicleInfo.mobile"></el-input>
      </el-form-item>

      <el-form-item label="公司" prop="vehicleBaseInfo.company">
        <el-input v-model="vehicleInfo.company"></el-input>
      </el-form-item>
    </el-form>

    <div v-if="isARRIVE" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleData(vehicleInfo)">确认到达</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { parameterVehicleTypeList } from '@/api/vehicle/parameter/vehicle-type'
  import Upload from '@/components/Upload/SingleImage'
  import {
    uploadVehicleDeclare,
    uploadVehicleRecord,
    uploadCustomCar,
    addDmFaTask,
    addFmFaTask,
    addCmFaTask,
    addCmNumberTask,
    passNumberTask,
    trackRecordInfo,
    trackRecord,
    arriveInfo,
    arrive
  } from '@/api/mission/allocation'
  import {
    TEMP_TYPE,
    TEMP_TYPE_UPDATE,
    DAMAGE_TYPE_LIST_OBJ,
    VEHICLE_PHOTO_OBJ,
    TASK_STATUS_OBJ,
    FREE_STATUS_OBJ,
    CHECK_STATUS_PASS,
    CHECK_STATUS_REJECT,
    CHECK_STATUS,
    DECLARE_UPLOAD,
    DECLARE_CHECK,
    RECORD_UPLOAD,
    RECORD_CHECK,
    CUSTOM_CAR,
    DMFA,
    FMFA,
    CMFA,
    DM_NUMS_WARN,
    CM_NUMS_WARN,
    TRACK,
    ARRIVE
  } from '@/constant'

  export default {
    name: 'HandleDialog',
    components: { Upload },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      dialogStatus: {
        type: String,
        default: ''
      },
      vehicleInfo: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        DAMAGE_TYPE_LIST_OBJ,
        VEHICLE_PHOTO_OBJ,
        TEMP_TYPE,
        CHECK_STATUS_REJECT,
        CHECK_STATUS,
        FREE_STATUS_OBJ,
        listKey: 0,
        vehicleTypeList: [],
        rules: {
          'vehicleDeclare.declareUrl': [{ required: true, message: '请上传报关资料', trigger: 'blur' }],
          'vehicleDeclare.declareCheck': [{ required: true, message: '请审批报关审核', trigger: 'blur' }],
          'vehicleDeclare.recordUrl': [{ required: true, message: '请上传预录单资料', trigger: 'blur' }],
          'vehicleDeclare.recordCheck': [{ required: true, message: '请审批预录单', trigger: 'blur' }]
        }
      }
    },
    computed: {
      isDeclareUpload() {
        return [DECLARE_UPLOAD, DECLARE_CHECK, RECORD_UPLOAD, RECORD_CHECK, CUSTOM_CAR].includes(this.vehicleInfo.smallLink)
      },
      isDeclareCheck() {
        return [DECLARE_CHECK].includes(this.vehicleInfo.smallLink)
      },
      isRecordUpload() {
        return [RECORD_UPLOAD, RECORD_CHECK, CUSTOM_CAR].includes(this.vehicleInfo.smallLink)
      },
      isRecordCheck() {
        return [RECORD_CHECK].includes(this.vehicleInfo.smallLink)
      },
      isCustomCar() {
        return [CUSTOM_CAR].includes(this.vehicleInfo.smallLink)
      },
      isFA() {
        return [DMFA, FMFA, CMFA].includes(this.vehicleInfo.smallLink)
      },
      isNUMS_WARN() {
        return [DM_NUMS_WARN, CM_NUMS_WARN].includes(this.vehicleInfo.smallLink)
      },
      isTRACK() {
        return [TRACK].includes(this.vehicleInfo.smallLink)
      },
      isARRIVE() {
        return [ARRIVE].includes(this.vehicleInfo.smallLink)
      }
    },
    mounted() {
      parameterVehicleTypeList().then(res => {
        this.vehicleTypeList = res.data.list.map(item => ({
          label: item.typeName,
          value: item.typeName
        }))
      })
    },
    methods: {
      handleData(vehicleInfo) {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            switch (vehicleInfo.smallLink) {
              case DECLARE_UPLOAD:
              case DECLARE_CHECK: {
                const declareUrl = vehicleInfo.vehicleDeclare.declareUrl
                const declareCheck = vehicleInfo.vehicleDeclare.declareCheck
                if (declareCheck === CHECK_STATUS_PASS && !declareUrl) {
                  this.$msgNotify('请上传报关材料')
                }
                const data = {
                  vin: vehicleInfo.vin,
                  taskId: vehicleInfo.id,
                  orderId: vehicleInfo.orderId,
                  declareUrl,
                  declareCheck
                }
                uploadVehicleDeclare(data).then((res) => {
                  this.$handleTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
              case RECORD_UPLOAD:
              case RECORD_CHECK: {
                const recordUrl = vehicleInfo.vehicleDeclare.recordUrl
                const recordCheck = vehicleInfo.vehicleDeclare.recordCheck
                if (recordCheck === CHECK_STATUS_PASS && !recordUrl) {
                  this.$msgNotify('请上传预录单材料')
                }
                const data = {
                  vin: vehicleInfo.vin,
                  taskId: vehicleInfo.id,
                  orderId: vehicleInfo.orderId,
                  recordUrl,
                  recordCheck
                }
                uploadVehicleRecord(data).then((res) => {
                  this.$handleTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
              case CUSTOM_CAR: {
                const customUrl = vehicleInfo.vehicleDeclare.customUrl
                const isGo = vehicleInfo.vehicleDeclare.isGo
                if (isGo && !customUrl) {
                  this.$msgNotify('请上传报关单材料')
                }
                const data = {
                  vin: vehicleInfo.vin,
                  taskId: vehicleInfo.id,
                  orderId: vehicleInfo.orderId,
                  customUrl,
                  isGo
                }
                uploadCustomCar(data).then((res) => {
                  this.$handleTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
              case DMFA: {
                const data = {
                  vin: vehicleInfo.vin,
                  taskId: vehicleInfo.id,
                  orderId: vehicleInfo.orderId,
                  result: vehicleInfo.result,
                  remark: vehicleInfo.remark
                }
                addDmFaTask(data).then((res) => {
                  this.$approveTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
              case FMFA: {
                const data = {
                  vin: vehicleInfo.vin,
                  taskId: vehicleInfo.id,
                  orderId: vehicleInfo.orderId,
                  result: vehicleInfo.result,
                  remark: vehicleInfo.remark
                }
                addFmFaTask(data).then((res) => {
                  this.$approveTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
              case CMFA: {
                const data = {
                  vin: vehicleInfo.vin,
                  taskId: vehicleInfo.id,
                  orderId: vehicleInfo.orderId,
                  result: vehicleInfo.result,
                  remark: vehicleInfo.remark
                }
                addCmFaTask(data).then((res) => {
                  this.$approveTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
              case DM_NUMS_WARN: {
                const data = {
                  vin: vehicleInfo.vin,
                  taskId: vehicleInfo.id,
                  orderId: vehicleInfo.orderId,
                  result: vehicleInfo.result,
                  remark: vehicleInfo.remark
                }
                addCmNumberTask(data).then((res) => {
                  this.$approveTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
              case CM_NUMS_WARN: {
                const data = {
                  vin: vehicleInfo.vin,
                  taskId: vehicleInfo.id,
                  orderId: vehicleInfo.orderId,
                  result: vehicleInfo.result,
                  remark: vehicleInfo.remark
                }
                passNumberTask(data).then((res) => {
                  this.$approveTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
              case TRACK : {
                const data = {
                  vin: vehicleInfo.vin,
                  orderId: vehicleInfo.orderId,
                  trackPlace: vehicleInfo.trackPlace
                }
                trackRecord(data).then((res) => {
                  trackRecordInfo(vehicleInfo.vin).then((res) => {
                    this.vehicleInfo = {
                      ...vehicleInfo,
                      ...res.data
                    }
                    this.$updateTempNotify()
                  })
                })
              }
                break
              case ARRIVE: {
                const data = {
                  taskId: vehicleInfo.id
                }
                arrive(data).then((res) => {
                  this.$updateTempNotify()
                  this.value = false
                  this.emitInput(false)
                })
              }
                break
            }
          }
        })
      }
    }
  }
</script>
