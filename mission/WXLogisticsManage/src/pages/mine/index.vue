<template>
  <view class="content">
    <uni-section class="mb-10" title="账号" :sub-title="userInfo.user.userName"></uni-section>

    <uni-section class="mb-10" title="部门" :sub-title="userInfo.user.dept.deptName"></uni-section>

    <uni-section class="mb-10" title="电话" :sub-title="userInfo.user.phonenumber"></uni-section>

    <uni-section class="mb-10" title="角色" :sub-title="userInfo.user.roleKeySetName"></uni-section>

    <view class="button-group">
      <button v-if="!isEditPassword"  class="button-g" type="primary" size="mini" @click="isEditPassword = true">修改密码</button>

      <button class="button-g" type="primary" size="mini" @click="loginOut">退出账号</button>
    </view>

    <view v-if="isEditPassword">
      <uni-section title="旧密码" type="line">
        <uni-easyinput v-model="temp.oldPassword" class="input" type="password" placeholder="请输入新密码" @input="($event)=>userInput('oldPassword',$event)"></uni-easyinput>
      </uni-section>

      <uni-section title="新密码" type="line">
        <uni-easyinput v-model="temp.newPassword" class="input" type="password" placeholder="请输入新密码" @input="($event)=>userInput('newPassword',$event)"></uni-easyinput>
      </uni-section>

      <uni-section title="确认密码" type="line">
        <uni-easyinput v-model="temp.newPassword2" class="input" type="password" placeholder="请输入新密码" @input="($event)=>userInput('newPassword2',$event)"></uni-easyinput>
      </uni-section>

      <button class="button" type="primary" size="mini" @click="updatePassword">确认修改</button>
    </view>
  </view>
</template>

<script>
  import { userInfo, updatePwd } from '@/api/index'
  
  export default {
    data() {
      return {
        userInfo: {
          user: {
            dept: {}
          }
        },
        isEditPassword: false,
        temp: {
          oldPassword: '',
          newPassword: '',
          newPassword2: '',
        }
      }
    },
    onTabItemTap() {
      this.getData()
    },
    onLoad() {
      this.getData()
    },
    methods: {
      getData() {
        userInfo().then(res => {
          this.userInfo = res.data
        })
      },
      userInput(key, val) {
        this.temp[key] = val
      },
      loginOut() {
        const app = getApp()
        app.globalData.token = ''
        wx.navigateTo({
          url: `../login/index`
        })
      },
      updatePassword() {
        const { oldPassword, newPassword, newPassword2 } = this.temp
        if (oldPassword === '') {
          uni.showToast({
            icon: 'none',
            title: '请输入旧密码',
            duration: 3000
          })
          return
        } else if (newPassword === '') {
          uni.showToast({
            icon: 'none',
            title: '请输入新密码',
            duration: 3000
          })
          return
        } else if (newPassword2 === '') {
          uni.showToast({
            icon: 'none',
            title: '请输入确认密码',
            duration: 3000
          })
          return
        } else if (newPassword !== newPassword2) {
          uni.showToast({
            icon: 'none',
            title: '新密码和确认密码不同',
            duration: 3000
          })
          return
        }
        updatePwd({
          oldPassword,
          newPassword,
        }).then(res => {
          uni.showToast({
            title: '修改密码成功',
            duration: 3000
          })
          this.isEditPassword = true
          this.temp = {
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
          }
          setTimeout(() => {
            this.loginOut()
          }, 3000)
        })
      }
    },
  }
</script>

<style lang="scss">
  .content {
    width: 100%;
    min-height: 100vh;
    position: relative;

    .input {
      width: 200px;
    }

    .button-group {
      width: 100%;
      position: fixed;
      bottom: 0;
      padding: 5px 10px;
      box-sizing: border-box;

      .button-g {
        width: 100%;
        height: 30px;
        margin-top: 12px;
        background-color: #d0d0d0;
        color: #000;
      }
    }

    .button {
      width: 100%;
      height: 30px;
      margin: 24px 0;
      background-color: #007aff;
      color: #fff;
    }
  }
</style>
