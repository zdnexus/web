<template>
  <el-dialog :visible.sync="visible">
    <BaseInfo :component="baseComponents"
              :data="data"
              :disabled="disabled"></BaseInfo>
    <OperateList :data="data && data.vehicleUpcomingTaskList"></OperateList>
  </el-dialog>
</template>

<script>
import BaseInfo from "./baseInfo";
import OperateList from "./operateList";
import { vehicleInfo, vehiclePhoto } from "@/constant/pageCompoent";

export default {
  name: "link",
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
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      baseComponents: [],
      baseInfoData: null,
      baseInfoOperateList: null,
      temp: {}
    };
  },
  created() {
    this.baseComponents = this.baseComponents.concat(vehicleInfo, vehiclePhoto);
  },
  watch: {
    data(newValue, preValue) {
      if (newValue !== preValue && newValue) {
        // this.baseInfoData = newValue
        // this.baseInfoOperateList = newValue.vehicleUpcomingTaskList
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.link-baseInfo {

}
</style>

