<template>
  <div class="link-baseInfo">
    <h1>基本信息</h1>
    <el-form ref="dataForm" :rules="rules" :model="formData" label-position="left" label-width="100px" style="width: 500px">
      <el-form-item v-for="item in component" :label="item.label" :prop="item.value">
        <el-input v-if="item.type === 'input'" v-model="formData[item.value]" :disabled="disabled"></el-input>
        <img v-if="item.type === 'image'" :src="formData[item.value]" width="150" height="150"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'baseInfo',
    props: {
      component: {
        type: Array,
        default: []
      },
      formData: {
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
        rules: {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link-baseInfo {

  }
</style>

