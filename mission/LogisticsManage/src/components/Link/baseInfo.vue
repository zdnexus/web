<template>
  <div class="link-baseInfo">
    <h3>基本信息</h3>
    <el-form ref="dataForm" :rules="rules" :model="formData" label-position="left" label-width="100px" style="width: 500px">
      <el-form-item v-for="item in component" :label="item.label" :prop="item.value">
        <el-input v-if="item.type === 'input'"
                  v-model="formData[item.value]"
                  :disabled="disabled"></el-input>

        <img v-else-if="item.type === 'image'"
             :src="formData[item.value]"
             width="150"
             height="150"/>

        <img v-else-if="item.type === 'images' && formData[item.value]"
             v-for="item2 in formData[item.value].split(',')"
             :src="item2"
             width="150"
             height="150"
             style="margin-right:10px"/>

        <video v-else-if="item.type === 'video'"
               :src="formData[item.value]"
               width="300"
               height="300"
               controls></video>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'BaseInfo',
    props: {
      component: {
        type: Array,
        default: () => []
      },
      formData: {
        type: Object,
        default: () => {
        }
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

