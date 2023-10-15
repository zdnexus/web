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

        <uni-file-picker v-if="item.value2 && item.type === 'checkbox' && temp[item.value] === '1'"
                         v-model="temp[item.value2]"
                         fileMediatype="image"
                         limit="10"
                         :auto-upload="false"
                         @select="($event)=>handleSelect($event,item.value)"
                         @delete="($event)=>handleDelete($event,item.value)"></uni-file-picker>

        <view v-else-if="item.type === 'table'">
          <uni-table class="table" border stripe emptyText="暂无更多数据">
            <uni-tr>
              <uni-th width="120">车架号</uni-th>
              <uni-th width="120">到达点</uni-th>
              <uni-th width="120">更新时间</uni-th>
            </uni-tr>
            <uni-tr v-for="(item2, index) in temp[item.value]" :key="index">
              <uni-td>{{item2.vin}}</uni-td>
              <uni-td>{{item2.trackPlace}}</uni-td>
              <uni-td>{{item2.updateTime}}</uni-td>
            </uni-tr>
          </uni-table>
          <uni-section title="到达点" type="line">
            <uni-easyinput v-model="temp.trackPlace"></uni-easyinput>
          </uni-section>
        </view>
      </uni-section>
      <view v-else class="buttons">
        <button v-for="item3 in item.array" class="button" @click="postData(item3.func)">{{item3.label}}</button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getToken,
    getVehicleInfo,
    inWarehouseInfo,
    cardInfo,
    trimInfo,
    sealInfo,
    driveInfo,
    outboundInfo,
    handoverInfo,
    trackRecordInfo,
    arriveInfo,
  } from '../../api/index'
  import {
    INSPECTION,
    INWAREHOUSE,
    STORAGE,
    CARD,
    OUTWAREHOUSE,
    OUTCONFIRM,
    TRIM,
    SWTRIM,
    SEAL,
    DRIVE,
    LEAVECOUNTRY,
    HANDOVER,
    TRACK,
    ARRIVE,
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
        temp: {
          trackPlace: ''
        },
        list: null,
        urls: {}
      }
    },
    onLoad(options) {
      this.temp.vin = options.vin
      this.temp.smallLink = options.smallLink
      this.temp.smallLinkConvert = options.smallLinkConvert
      this.temp.taskId = options.taskId
      this.getData()
    },
    methods: {
      getData() {
        const vin = this.temp.vin
        const smallLink = this.temp.smallLink
        const pageList = PAGE[smallLink] || []
        this.list = pageList.map((item) => {
          this.temp[item.value] = item.type === 'upload-image' || item.type === 'upload-video' ? [] : ''
          return item
        })
        let func
        switch (this.temp.smallLink) {
          case INSPECTION:
          case INWAREHOUSE:
          case OUTWAREHOUSE:
          case OUTCONFIRM:
            func = getVehicleInfo
            break
          case STORAGE:
            func = inWarehouseInfo
            break
          case CARD:
            func = cardInfo
            break
          case TRIM:
          case SWTRIM:
            func = trimInfo
            break
          case SEAL:
            func = sealInfo
            break
          case DRIVE:
            func = driveInfo
            break
          case LEAVECOUNTRY:
            func = outboundInfo
            break
          case HANDOVER:
            func = handoverInfo
            break
          case TRACK:
            func = trackRecordInfo
            break
          case ARRIVE:
            func = arriveInfo
            break
        }
        func({ vin, smallLink }).then((res) => {
          const data = {
            ...res.data,
            ...res.data.vehiclePhoto
          }
          Object.keys(data).map((key) => {
            const flag = String(data[key]).indexOf('http') === 0
            if (flag) {
              this.temp[key] = []
              data[key].split(',').forEach((url) => {
                this.temp[key].push({
                  url,
                  name: ''
                })
              })
              this.urls[key] = data[key]
            } else {
              this.temp[key] = data[key]
            }
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
          this.temp[key].push({
            url,
            name: ''
          })
          this.urls[key] = this.temp[key].map(item => item.url).join(',')
        })
      },
      async handleDelete(err, key) {
        this.temp[key] = []
        this.urls[key] = ''
      },
      postData(func) {
        let data = {
          ...this.temp,
          ...this.urls,
          vehiclePhoto: {
            ...this.urls
          }
        }
        func(data).then((res) => {
          uni.showToast({
            title: res.msg,
            duration: 3000
          })
          switch (this.temp.smallLink) {
            case TRACK:
              const vin = this.temp.vin
              const smallLink = this.temp.smallLink
              trackRecordInfo({ vin, smallLink }).then((res) => {
                this.temp = {
                  ...this.temp,
                  ...res.data
                }
              })
              break
            default:
              setTimeout(() => {
                wx.navigateBack()
              }, 3000)
          }
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
