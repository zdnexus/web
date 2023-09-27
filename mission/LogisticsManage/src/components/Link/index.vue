<template>
  <el-dialog :visible.sync="linkFormVisible">
    <BaseInfo :component="baseInfoComponents"
              :baseInfoData="baseInfoData"
              :disabled="disabled"></BaseInfo>
    <OperateList :list="baseInfoOperateList"></OperateList>
  </el-dialog>
</template>

<script>
  import BaseInfo from './baseInfo'
  import OperateList from './operateList'
  import { vehicleInfo, vehiclePhoto } from '@/constant/pageCompoent'

  export default {
    name: 'linkBaseInfo',
    components: {
      BaseInfo,
      OperateList
    },
    props: {
      linkFormVisible: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      linkData: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        baseInfoComponents: [],
        baseInfoData: null,
        baseInfoOperateList: null,
        temp: {}
      }
    },
    created() {
      this.baseInfoComponents = this.baseInfoComponents.concat(vehicleInfo, vehiclePhoto)
    },
    watch: {
      linkData(newValue, preValue) {
        if (newValue !== preValue && newValue) {
          this.baseInfoData = { ...newValue }
          this.baseInfoOperateList = newValue.vehicleUpcomingTaskList
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .link-baseInfo {

  }
</style>

