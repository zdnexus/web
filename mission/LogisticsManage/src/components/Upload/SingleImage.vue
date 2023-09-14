<template>
  <div class="upload-container">
    <el-upload
      v-show="imageUrl.length===0"
      action="https://upload-z2.qiniup.com"
      :show-file-list="false"
      :data="addFormUpload"
      :multiple="false"
      :on-change="handleChange"
      :on-success="handleSuccess"
      class="image-uploader"
      drag
    >
      <i class="el-icon-upload"/>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div v-show="imageUrl.length>1" class="image-preview">
      <div class="image-preview-wrapper">
        <img :src="imageUrl+'?imageView2/1/w/200/h/200'">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { getToken } from '@/api/qiniu'

  export default {
    name: 'SingleImageUpload',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tempUrl: '',
        dataObj: { token: '', key: '' },
        addFormUpload: {
          key: '',
          token: '',
          domainUrl: ''
        },
      }
    },
    computed: {
      imageUrl() {
        return this.value
      }
    },
    methods: {
      rmImage() {
        this.emitInput('')
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      handleImageSuccess() {
        this.emitInput(this.tempUrl)
      },
      handleChange(file) {
        getToken().then(res => {
          if (res && res.h) {
            this.$Message.error('上传出错')
            return false
          } else {
            let obj = {}
            obj.token = res.data.token
            obj.key = res.data.key
            obj.domain = res.data.domain
            this.addFormUpload = obj
            const isRightType = (file.raw.type === 'image/jpeg') || (file.raw.type === 'image/png') || (file.raw.type === 'image/gif')
            const isLt2M = file.raw.size / 1024 / 1024 < 2
            if (!isRightType) {
              this.$Notice.warning({
                title: '文件格式出错',
                desc: '文件格式应为 jpg or png or gif.'
              })
            }
            if (!isLt2M) {
              this.$Notice.warning({
                title: '文件过大',
                desc: '文件  ' + file.raw.name + ' 超过2M.'
              })
            }
            let obj1 = this.addFormUpload
            obj1.key += '.' + file.raw.type.split('/')[1]
            this.addFormUpload = obj1
            return isRightType && isLt2M
          }
        })

      },
      handleSuccess(res, file) {
        this.value = this.addFormUpload.domain + '/' + res.key
        this.emitInput(this.value)
      }
      // handleChange(file) {
      //   return new Promise((resolve, reject) => {
      //     getToken().then(res => {
      //       if (file.response && file.response.files.file) {
      //         const formData = new FormData()
      //         formData.append('token', res.data.token)
      //         formData.append('key', res.data.key)
      //         formData.append('domain', res.data.domain)
      //         formData.append('file', file.response.files.file)
      //         axios.post('https://upload-z2.qiniup.com', formData, {
      //           headers: {
      //             'Content-Type': 'multipart/form-data'
      //           }
      //         }).then(res2 => {
      //           this.value = `${res.data.domain}/${res2.data.key}`
      //         })
      //       }
      //       resolve(true)
      //     }).catch(err => {
      //       console.log(err)
      //       reject(false)
      //     })
      //   })
      // }
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
      margin-left: 50px;
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
