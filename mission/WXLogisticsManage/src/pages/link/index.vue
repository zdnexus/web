<template>
  <view class="content">
    <uni-section :title="temp.smallLinkConvert" type="circle" titleFontSize="20px"></uni-section>
    <view class="user-input" v-for="item in list">
      <uni-section v-if="item.type !== 'buttons'" :title="item.label" type="line">
        <uni-file-picker v-if="item.type === 'upload-image' || item.type === 'upload-video'"
                         v-model="temp[item.value]"
                         :fileMediatype="item.type === 'upload-image' ? 'image':'video'"
                         :limit="item.limit ? item.limit: 1"
                         mode="grid"
                         :auto-upload="false"
                         @select="($event)=>handleSelect($event,item.value)"
                         @delete="($event)=>handleDelete($event,item.value)"></uni-file-picker>

        <uni-data-checkbox v-else-if="item.type === 'checkbox'"
                           v-model="temp[item.value]"
                           :localdata="item.options"></uni-data-checkbox>

        <uni-easyinput v-else-if="item.type === 'input'"
                       v-model="temp[item.value]"></uni-easyinput>

        <uni-data-checkbox v-else-if="item.type === 'checkbox'"
                           v-model="temp[item.value]"
                           :localdata="item.options"></uni-data-checkbox>

        <uni-file-picker v-if="item.type === 'checkbox' && temp[item.value] === 1"
                         v-model="temp[item.value2]"
                         fileMediatype="image"
                         limit="10"
                         :auto-upload="false"
                         @select="($event)=>handleSelect($event,item.value)"
                         @delete="($event)=>handleDelete($event,item.value)"></uni-file-picker>
      </uni-section>
      <view v-else class="buttons">
        <button v-for="item2 in item.array" class="button" @click="postData(item2.func)">{{item2.label}}</button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getToken,
    getVehicleInfo
  } from '../../api/index'
  import {
    PAGE
  } from '../../constant/index'

  export default {
    data() {
      return {
        // imageStyles: {
        //   width: 60,
        //   height: 60,
        //   border: {
        //     color: '#eee',
        //     width: 2,
        //     style: 'solid',
        //     radius: '2px'
        //   }
        // },
        temp: {},
        list: null,
        urls: {}
      }
    },
    onLoad(options) {
      this.temp.vin = options.vin
      this.temp.smallLink = options.smallLink
      this.temp.smallLinkConvert = options.smallLinkConvert
      this.getData(this.temp)
    },
    methods: {
      getData(temp) {
        const vin = temp.vin
        const smallLink = temp.smallLink
        const pageList = PAGE[smallLink] || []
        this.list = pageList.map((item) => {
          this.temp[item.value] = item.type === 'upload-image' || item.type === 'upload-video' ? [] : ''
          return item
        })
        getVehicleInfo({ vin }).then(res => {
          Object.keys(res.data).map((key) => {
            this.temp[key] = res.data[key]
          })
        })
      },
      async handleSelect(data, key) {
        getToken().then(async (res) => {
          const formData = {
            token: res.data.token,
            key: res.data.key,
            domain: res.data.domain
          }
          await this.uploadImg(data.tempFilePaths, formData, key)
        })
      },
      async uploadImg(tempFilePaths, formData, key) {
        if (!tempFilePaths.length) return

        tempFilePaths.map(async () => {
          const path = tempFilePaths.pop()
          const res = await uni.uploadFile({
            url: 'https://upload-z2.qiniup.com',
            filePath: path,
            name: 'file',
            formData: formData
          })
          const url = formData.domain + '/' + JSON.parse(res.data).key
          this.urls[key] = url
          this.temp[key].push({
            url,
            name: ''
          })
        })
      },
      async handleDelete(err, key) {
        this.urls[key] = ''
        this.temp[key] = []
      },
      postData(func) {
        const data = {
          ...this.temp,
          ...this.urls,
          vehiclePhoto: {
            ...this.urls
          }
        }
        func(data).then((res) => {
          uni.showToast({
            title: '提交成功',
            duration: 3000
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../mission/index'
            })
          }, 3000)
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
      padding: 0 5px;

      &:last-of-type {
        padding: 0;
      }
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
        flex: 1;
        width: 140px;
        margin-left: 10px;

        &:last-of-type {
          color: #fff;
          background-color: #46a6ff;
        }
      }
    }
  }
</style>
