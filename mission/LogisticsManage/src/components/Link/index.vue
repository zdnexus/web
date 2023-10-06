<template>
  <el-dialog v-if="formData" :title="formData.bigLinKeyLabel" :visible.sync="visible">
    <BaseInfo :component="baseComponents"
              :formData="baseInfoData"
              :disabled="disabled"></BaseInfo>
    <OperateList :list="formData.vehicleUpcomingTaskList"></OperateList>
  </el-dialog>
</template>

<script>
  import {
    DAMAGE_TYPE_LIST_OBJ
  } from '@/constant'
  // import { vehicleInfo, vehiclePhoto } from '@/constant/pageCompoent'
  import BaseInfo from './baseInfo'
  import OperateList from './operateList'

  export default {
    name: 'link',
    components: {
      BaseInfo,
      OperateList
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      baseComponents: {
        type: Object,
        default: () => null
      },
      formData: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        // baseComponents: [],
        baseInfoData: null,
        baseInfoOperateList: null,
        temp: {}
      }
    },
    created() {
    },
    watch: {
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
    }
  }
</script>

<style lang="scss" scoped>
  .link-baseInfo {

  }
</style>

