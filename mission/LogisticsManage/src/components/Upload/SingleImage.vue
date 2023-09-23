<template>
  <div class="upload-container">
    <el-upload
      v-if="multiple || (!multiple && imageUrl.length === 0)"
      action="https://upload-z2.qiniup.com"
      :show-file-list="multiple"
      :file-list="fileList"
      list-type="picture"
      :data="addFormUpload"
      :multiple="false"
      :disabled="disabled"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      class="image-uploader"
      drag
    >
      <i class="el-icon-upload"/>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div v-if="!multiple && imageUrl.length > 1" class="image-preview">
      <div class="image-preview-wrapper">
        <img :src="imageUrl+'?imageView'">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getToken } from '@/api/qiniu'

  export default {
    name: 'SingleImageUpload',
    props: {
      value: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        addFormUpload: {
          name: '',
          key: '',
          token: '',
          domainUrl: ''
        },
        fileList: []
      }
    },
    computed: {
      imageUrl() {
        return this.value
      }
    },
    created() {
      if (this.multiple) {
        this.fileList = this.value.split(',').map((url) => ({
          name: '',
          url
        }))
      }
    },
    mounted() {
      getToken().then(res => {
        this.addFormUpload.token = res.data.token
        this.addFormUpload.key = res.data.key
        this.addFormUpload.domain = res.data.domain
      })
    },
    methods: {
      rmImage() {
        if (!this.disabled) {
          this.emitInput('')
        }
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      beforeUpload(file) {
        const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isRightType) {
          this.$Notice.warning({
            title: '文件格式出错',
            desc: '文件格式应为 jpg or png or gif.'
          })
        }
        if (!isLt2M) {
          this.$Notice.warning({
            title: '文件过大',
            desc: '文件  ' + file.name + ' 超过2M.'
          })
        }
        return isRightType && isLt2M
      },
      handleChange(file) {
        if (file.status === 'success' && file.percentage === 100) {
          this.addFormUpload.key += '.' + file.raw.type.split('/')[1]
          if (this.multiple) {
            this.fileList.push({
              name: file.name,
              url: this.value
            })
            this.emitInput(this.fileList.map(file => file.url).join(','))
          } else {
            this.emitInput(this.value)
          }
          this.$uploadImageNotify()
        }
      },
      handleRemove(file) {
        if (this.multiple && this.disabled) {
          const index = this.fileList.map(file => file.url).indexOf(file.url)
          this.fileList.splice(index, 1)
          this.emitInput(this.fileList.map(file => file.url).join(','))
        }
      },
      handleSuccess(res) {
        const url = this.addFormUpload.domain + '/' + res.key
        this.value = url
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .upload-container {
    width: 100%;
    position: relative;
    @include clearfix;
    .image-uploader {
      width: 60%;
      float: left;
    }
    .image-preview {
      width: 200px;
      height: 200px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;
        .el-icon-delete {
          font-size: 36px;
        }
      }
      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }
  }

</style>
