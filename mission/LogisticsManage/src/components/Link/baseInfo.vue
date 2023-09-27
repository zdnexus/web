<template>
  <div class="link-baseInfo">
    <h1>基本信息</h1>
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px">
      <el-form-item v-for="item in component" :label="item.label" :prop="item.value">
        <el-input v-if="item.type === 'input'" v-model="temp[item.value]" :disabled="disabled"></el-input>
        <image v-if="item.type === 'image'" :src="temp[item.value]" width="150" height="150"></image>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'linkBaseInfo',
    props: {
      component: {
        type: Array,
        default: []
      },
      baseInfoData: {
        type: Object,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        temp: {},
        rules: {}
      }
    },
    beforeUpdate() {
      debugger
    },
    watch: {
      baseInfoData(newValue, preValue) {
        if (newValue !== preValue && newValue) {
          this.component.forEach((key) => {
            this.temp[key.value] = this.baseInfoData[key.value]
            this.rules[key.value] = [{ required: true, message: '输入' + key.label, trigger: 'blur' }]
            console.log(this.temp)
          })
          console.log(this.temp)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .link-baseInfo {

  }
</style>

