<template>
  <el-dialog v-if="formData" :title="formData.bigLinKeyLabel" :visible.sync="value">
    <BaseInfo
      :component="baseComponents"
      :form-data="baseInfoData"
      :disabled="disabled"
    />
    <div v-if="formData.vehicleTrackRecordList">
      <h3>追综记录</h3>
      <el-table
        :key="formData.vehicleTrackRecordList.length"
        :data="formData.vehicleTrackRecordList"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="追综更新地点" prop="trackPlace" align="center" width="300">
          <template slot-scope="{row}">
            <span>{{ row.trackPlace }}</span>
          </template>
        </el-table-column>

        <el-table-column label="时间" prop="updateTime" align="center" width="300">
          <template slot-scope="{row}">
            <span>{{ row.updateTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <OperateList :list="formData.vehicleUpcomingTaskList"/>
  </el-dialog>
</template>

<script>
  import {
    DAMAGE_TYPE_LIST_OBJ
  } from '@/constant'
  import BaseInfo from './baseInfo'
  import OperateList from './operateList'

  export default {
    name: 'Link',
    components: {
      BaseInfo,
      OperateList
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      baseComponents: {
        type: Object,
        default: () => []
      },
      formData: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        baseInfoData: null,
        baseInfoOperateList: null,
        temp: {}
      }
    },
    watch: {
      value: function (newVal, oldVal) {
        if (!newVal && newVal !== oldVal) {
          this.$emit('input', false)
        }
      },
      formData(newValue, preValue) {
        if (newValue !== preValue && newValue) {
          const baseInfoData = {}
          this.baseComponents.forEach((key) => {
            if (key.key) {
              switch (key.key) {
                case 'DAMAGE_TYPE_LIST_OBJ':
                  baseInfoData[key.value] = DAMAGE_TYPE_LIST_OBJ[this.formData[key.value]]
              }
            } else {
              baseInfoData[key.value] = this.formData[key.value]
            }
          })
          this.baseInfoData = baseInfoData
        }
      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  .link-baseInfo {

  }
</style>

