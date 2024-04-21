<template>
  <view class="content">
    <uni-section :title="temp.smallLinkConvert" type="circle" titleFontSize="20px"></uni-section>
    <view class="user-input" v-for="item in list">
      <uni-section v-if="item.type !== 'buttons' && (!item.visible || (item.visible && temp[item.visible] === item.visibleValue))"
                   :title="item.label"
                   type="line">
        <view v-if="['upload-image', 'upload-video'].includes(item.type)">
          <uni-file-picker v-model="temp[item.value]"
                           :disabled="isDisabled(item.value)"
                           :file-mediatype="item.type === 'upload-image' ? 'image':'video'"
                           :limit="item.limit || 1"
                           mode="grid"
                           :auto-upload="false"
                           @select="($event)=>handleSelect($event,item.value)"
                           @delete="($event)=>handleDelete($event,item.value)"></uni-file-picker>

          <video v-if="item.type === 'upload-video' && urls[item.value]"
                 :src="urls[item.value]"
                 controls></video>
        </view>

        <uni-data-checkbox v-else-if="item.type === 'checkbox'"
                           v-model="temp[item.value]"
                           :disabled="isDisabled(item.value)"
                           :localdata="item.options"></uni-data-checkbox>

        <uni-easyinput v-else-if="item.type === 'input'"
                       v-model="temp[item.value]"
                       :disabled="isDisabled(item.value)"></uni-easyinput>

        <uni-data-checkbox v-else-if="item.type === 'checkbox'"
                           v-model="temp[item.value]"
                           :disabled="isDisabled(item.value)"
                           :localdata="item.options"></uni-data-checkbox>

        <view v-else-if="item.type === 'table' && item.value === 'vehicleTrackRecordList'">
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
            <uni-easyinput v-model="temp.trackPlace"
                           :disabled="isDisabled(item.value)"></uni-easyinput>
          </uni-section>
        </view>

        <view v-else-if="item.type === 'table' && item.value === 'otherFeeList'">
          <uni-table class="table" border stripe emptyText="暂无更多数据">
            <uni-tr>
              <uni-th width="75">名称</uni-th>
              <uni-th width="75">金额</uni-th>
              <uni-th width="75">票据照片</uni-th>
              <uni-th width="75">成本/应收</uni-th>
            </uni-tr>
            <uni-tr v-for="(item2, index) in temp[item.value]" :key="index">
              <uni-td>{{item2.name}}</uni-td>
              <uni-td>{{item2.free}}</uni-td>
              <uni-td>
                <image style="width:70px;height:70px" :src="item2.photoUrl"></image>
              </uni-td>
              <uni-td>{{item2.freeType}}</uni-td>
            </uni-tr>
          </uni-table>
        </view>

        <!--<uni-file-picker v-if="item.value2 && item.type === 'checkbox' && temp[item.value] === '0'"-->
        <!--v-model="temp[item.value2]"-->
        <!--fileMediatype="image"-->
        <!--limit="10"-->
        <!--:auto-upload="false"-->
        <!--@select="($event)=>handleSelect($event,item.value)"-->
        <!--@delete="($event)=>handleDelete($event,item.value)"></uni-file-picker>-->
      </uni-section>

      <view v-else-if="item.type === 'buttons' && this.temp.taskStatus === '0'" class="buttons">
        <button v-for="item3 in item.array" class="button" :style="{backgroundColor:item3.label === '费用确认' ? '#d0d0d0' : 'none'}" @click="postData(item3.func)">
          {{item3.label}}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getToken,
    trackRecordInfo,
    otherFeeList,
    addOtherFee
  } from '@/api/index'
  import {
    DRIVE,
    TRACK,
    RECORDCHECK,
    DEALINWAREHOUSE,
    DEALDRIVE,
    PAGE,
    DRIVE_FOOTER,
    RECORDCHECK_FOOTER,
    DEALINWAREHOUSE_FOOTER,
    DEALDRIVE_FOOTER
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
      this.temp.orderId = options.orderId
      this.temp.taskStatus = options.taskStatus
      this.getData()
    },
    computed: {
      isDisabled() {
        return (value) => {
          if (this.temp.taskStatus === '1') return true
          else if (this.temp.smallLink) {
            return (this.temp.smallLink === DRIVE && !DRIVE_FOOTER.map(item => item.value).includes(value) ||
              this.temp.smallLink === RECORDCHECK && !RECORDCHECK_FOOTER.map(item => item.value).includes(value) ||
              this.temp.smallLink === DEALINWAREHOUSE && !DEALINWAREHOUSE_FOOTER.map(item => item.value).includes(value) ||
              this.temp.smallLink === DEALDRIVE && !DEALDRIVE_FOOTER.map(item => item.value).includes(value)
            )
          }
          return false
        }
      }
    },
    methods: {
      getData() {
        const { vin, smallLink, taskId, orderId } = this.temp
        let func
        const pageList = PAGE[smallLink] || []
        this.list = pageList.filter((item) => {
          if (item.API) {
            func = item.API
            return false
          } else {
            this.temp[item.value] = ['upload-image', 'upload-video'].includes(item.type) ? [] : ''
            return true
          }
        })
        func({ vin, smallLink, taskId }).then((res) => {
          otherFeeList({ vin, smallLink, orderId }).then((res2) => {
            const data = {
              ...res.data,
              ...res.data.vehicleBaseInfo,
              ...res.data.vehiclePhoto,
              ...res.data.vehicleDeclare,
              otherFeeList: res2.data.list
            }
            Object.keys(data).map((key) => {
              if (['upload-image', 'upload-video'].includes(pageList.find(item => item.value === key)?.type)) {
                this.temp[key] = []
                if (data[key]) {
                  data[key].split(',').forEach((url) => {
                    if (url) {
                      this.temp[key].push({
                        name: 'video.mp4',
                        url
                      })
                    }
                  })
                }
                this.urls[key] = data[key]
              } else {
                this.temp[key] = data[key]
              }
            })
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
          await this.uploadImg(data, formData, key)
        })
      },
      async uploadImg(data, formData, key) {
        if (!data.tempFilePaths.length) return

        data.tempFilePaths.map(async () => {
          const path = data.tempFilePaths.pop()
          const res = await uni.uploadFile({
            url: 'https://upload-z2.qiniup.com',
            filePath: path,
            name: 'file',
            formData: formData
          })
          const name = data.tempFiles[0].cloudPath
          const url = formData.domain + '/' + JSON.parse(res.data).key
          this.temp[key].push({
            name,
            url
          })
          this.urls[key] = this.temp[key].map(item => item.url).join(',')
        })
      },
      async handleDelete(data, key) {
        // if (this.temp.taskStatus === '1') return false
        // else if ([DRIVE, RECORDCHECK, DEALINWAREHOUSE, DEALDRIVE].includes(this.temp.smallLink)) {
        //   if (['recordCheck', 'remark', 'rejectRemark', 'reviewRemark'].includes(key)) {
        //     this.temp[key] = []
        //     this.urls[key] = ''
        //   }
        // }
        // this.temp[key] = []
        // this.urls[key] = ''
      },
      postData(func) {
        if (func.name === addOtherFee.name) {
          const { name, free, photoUrl, freeType } = this.temp
          if (!name || !free || !photoUrl || !freeType) {
            uni.showToast({
              icon: 'none',
              title: '请输入名称,金额,票据,成本/应收',
              duration: 3000
            })
            return
          }
        }
        let data = {
          ...this.temp,
          ...this.urls,
          vehicleBaseInfo: {
            ...this.temp,
            ...this.urls
          },
          vehiclePhoto: {
            ...this.urls
          },
          vehicleDeclare: {
            ...this.urls
          }
        }
        func(data).then((res) => {
          if (func.name === addOtherFee.name) {
            const { vin, smallLink, orderId } = this.temp
            otherFeeList({ vin, smallLink, orderId }).then((res) => {
              this.temp = {
                ...this.temp,
                otherFeeList: res.data.list,
                name: '',
                free: '',
                photoUrl: '',
                freeType: '',
              }
            })
          } else {
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
