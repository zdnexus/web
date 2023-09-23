<template>
  <el-dialog :title="TEMP_TYPE[dialogStatus]" :visible.sync="value">
    <el-form v-if="vehicleInfo"
             ref="dataForm"
             :rules="rules"
             :model="vehicleInfo"
             :disabled="disabled"
             label-position="left" label-width="150px" style="width: 550px">
      <el-form-item label="车架号" prop="vehicleBaseInfo.vin">
        <el-input v-model="vehicleInfo.vehicleBaseInfo.vin" :disabled="true"/>
      </el-form-item>

      <el-form-item label="类型" prop="vehicleBaseInfo.type">
        <el-input v-model="vehicleInfo.vehicleBaseInfo.type" :disabled="true"/>
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
        <el-image v-else-if="key ==='demage'"
                  v-for="img2 in vehicleInfo.vehiclePhoto.demage.split(',')"
                  style="width: 100px; height: 100px;margin-right: 10px"
                  :src="img2"
        />
        <el-image v-else
                  style="width: 100px; height: 100px"
                  :src="vehicleInfo.vehiclePhoto[key]"/>
      </el-form-item>

      <div v-if="isDeclareUpload">
        <el-form-item label="上传报关资料" prop="vehicleDeclare.declareUrl">
          <Upload v-model="vehicleInfo.vehicleDeclare.declareUrl"
                  :multiple="true"
                  :disabled="isDeclareCheck"/>
        </el-form-item>
      </div>

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
          <Upload v-model="vehicleInfo.vehicleDeclare.recordUrl"
                  :multiple="true"
                  :disabled="isRecordCheck"/>
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
          <Upload v-model="vehicleInfo.vehicleDeclare.customUrl"
                  :multiple="true"/>
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
  </el-dialog>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import {
    uploadVehicleDeclare,
    uploadVehicleRecord,
    uploadCustomCar
  } from '@/api/mission/allocation'
  import {
    TEMP_TYPE,
    TEMP_TYPE_UPDATE,
    DAMAGE_TYPE_LIST_OBJ,
    VEHICLE_PHOTO_OBJ,
    TASK_STATUS_OBJ,
    DECLARE_UPLOAD,
    DECLARE_CHECK,
    RECORD_UPLOAD,
    RECORD_CHECK,
    CUSTOM_CAR,
    CHECK_STATUS_PASS,
    CHECK_STATUS_REJECT,
    CHECK_STATUS,
  } from '@/constant'

  export default {
    name: 'HandleDialog',
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
        default: null
      }
    },
    components: { Upload },
    computed: {
      isDeclareUpload() {
        return [DECLARE_UPLOAD, DECLARE_CHECK, RECORD_UPLOAD, RECORD_CHECK, CUSTOM_CAR].includes(this.vehicleInfo.row.smallLink)
      },
      isDeclareCheck() {
        return [DECLARE_CHECK].includes(this.vehicleInfo.row.smallLink)
      },
      isRecordUpload() {
        return [RECORD_UPLOAD, RECORD_CHECK, CUSTOM_CAR].includes(this.vehicleInfo.row.smallLink)
      },
      isRecordCheck() {
        return [RECORD_CHECK].includes(this.vehicleInfo.row.smallLink)
      },
      isCustomCar() {
        return [CUSTOM_CAR].includes(this.vehicleInfo.row.smallLink)
      }
    },
    data() {
      return {
        DAMAGE_TYPE_LIST_OBJ,
        VEHICLE_PHOTO_OBJ,
        TEMP_TYPE,
        CHECK_STATUS_REJECT,
        CHECK_STATUS,
        rules: {
          'vehicleDeclare.declareUrl': [{ required: true, message: '请上传报关资料', trigger: 'blur' }],
          'vehicleDeclare.declareCheck': [{ required: true, message: '请审批报关审核', trigger: 'blur' }],
          'vehicleDeclare.recordUrl': [{ required: true, message: '请上传预录单资料', trigger: 'blur' }],
          'vehicleDeclare.recordCheck': [{ required: true, message: '请审批预录单', trigger: 'blur' }]
        }
      }
    },
    methods: {
      handleData(vehicleInfo) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            switch (vehicleInfo.row.smallLink) {
              case DECLARE_UPLOAD:
              case DECLARE_CHECK: {
                const declareUrl = vehicleInfo.vehicleDeclare.declareUrl
                const declareCheck = vehicleInfo.vehicleDeclare.declareCheck
                if (declareCheck === CHECK_STATUS_PASS && !declareUrl) {
                  this.$msgNotify('请上传报关材料')
                }
                const data = {
                  vin: vehicleInfo.row.vin,
                  taskId: vehicleInfo.row.id,
                  orderId: vehicleInfo.row.orderId,
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
                  vin: vehicleInfo.row.vin,
                  taskId: vehicleInfo.row.id,
                  orderId: vehicleInfo.row.orderId,
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
                  vin: vehicleInfo.row.vin,
                  taskId: vehicleInfo.row.id,
                  orderId: vehicleInfo.row.orderId,
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
            }
          }
        })
      }
    }
  }
</script>
