<template>
  <view class="content">
    <view class="user-input" v-for="item in list">
      <view v-if="item.label" class="label">{{item.label}}</view>
      <view v-for="child in item.children">
        <uni-section v-if="child.type !== 'buttons'"
                     :title="child.label"
                     type="line"
                     class="line">
          <uni-file-picker v-if="child.type === 'upload-image' || child.type === 'upload-video'"
                           v-model="temp[child.value]"
                           limit="1"
                           :fileMediatype="child.type === 'upload-image' ? 'image':'video'"
                           :image-styles="imageStyles"
                           @select="select"
                           @progress="progress"
                           @success="success"
                           @fail="fail"
          ></uni-file-picker>
          <uni-data-checkbox v-if="child.type === 'checkbox'"
                             v-model="temp[child.value]"
                             :localdata="child.options"></uni-data-checkbox>
          <uni-file-picker v-if="child.type === 'checkbox' && temp[child.value] === 1"
                           v-model="temp[child.value2]"
                           limit="1"
                           fileMediatype="image"
                           :image-styles="imageStyles"
                           @select="select"
                           @progress="progress"
                           @success="success"
                           @fail="fail"
          ></uni-file-picker>
          <uni-easyinput v-if="child.type === 'input'"
                         v-model="temp[child.value]"></uni-easyinput>
        </uni-section>
        <view v-if="child.type === 'buttons'"
              class="buttons">
          <view v-for="button in child.options"
                class="button">
            <button>{{button.label}}</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    PAGE,
    VEHICLE_INFO,
    VEHICLE_PHOTO,
    VEHICLE_OTHER1
  } from '../../constant/index'
  import {
    getToken,
    getVehicleInfo
  } from '../../api/index'

  export default {
    data() {
      return {
        VEHICLE_PHOTO,
        imageStyles: {
          width: 60,
          height: 60,
          border: {
            color: '#eee',
            width: 2,
            style: 'solid',
            radius: '2px'
          }
        },
        addFormUpload: {},
        temp: {},
        list: null,
        vin: ''
      }
    },
    onLoad(options) {
      this.getData(options.vin)
      this.temp.vin = options.vin
    },
    methods: {
      getData(vin) {
        const data = 'inspection'
        const pageList = PAGE[data]
        this.list = pageList.map((page) => {
          let obj = null
          switch (page) {
            case 'VEHICLE_INFO':
              obj = VEHICLE_INFO({ label: '接车环节' })
              obj.children.forEach((child) => {
                this.temp[child.value] = ''
              })
              return obj
            case 'VEHICLE_PHOTO':
              obj = VEHICLE_PHOTO({ label: '车辆图片' })
              obj.children.forEach((child) => {
                this.temp[child.value] = ''
              })
              return obj
            case 'VEHICLE_OTHER1':
              obj = VEHICLE_OTHER1()
              obj.children.forEach((child) => {
                this.temp[child.value] = ''
              })
              return obj
          }
        })
        getVehicleInfo({ vin }).then(res => {
          Object.keys(res.data).map((key) => {
            this.temp[key] = res.data[key]
          })
        })
      },
      select(e) {
        console.log('progress')
        getToken().then(res => {
          // this.addFormUpload.token = res.data.token
          // this.addFormUpload.key = res.data.key
          // this.addFormUpload.domain = res.data.domain
          const imgUrl = e.tempFilePaths[0]
          const formData = {
            token: res.data.token,
            key: res.data.key,
            domain: res.data.domain
          }
          wx.request({
            url: 'https://upload-z2.qiniup.com',
            filePath: imgUrl,
            data: JSON.stringify(formData),
            method: 'POST',
            success: (res) => {
              debugger
            }
          })
        })
      }
    },
  }
</script>

<style lang="scss">
  .content {
    overflow: hidden;

    .user-input {
      width: 100%;
      padding-left: 10px;
      margin-bottom: 30px;
    }

    .label {
      font-size: 18px;
      margin-bottom: 5px;
    }

    .buttons {
      margin: 20px 0;
      padding: 0 10px;
      display: flex;

      .button {
        width: 142px;
        margin-left: 20px;
      }
    }
  }
</style>
