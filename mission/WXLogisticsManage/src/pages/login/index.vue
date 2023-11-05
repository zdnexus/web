<template>
  <view class="content">
    <text class="uni-h6">速通科技</text>

    <uni-section title="账号" type="line">
      <uni-easyinput v-model="temp.username" class="input" placeholder="请输入账号" @input="($event)=>userInput('username',$event)"></uni-easyinput>
    </uni-section>

    <uni-section title="密码" type="line">
      <uni-easyinput v-model="temp.password" type="password" class="input" placeholder="请输入密码" @input="($event)=>userInput('password',$event)"></uni-easyinput>
    </uni-section>

    <button class="button" type="primary" size="mini" @click="userLogin">登录</button>
  </view>
</template>

<script>
  import { login } from '../../api/index'

  export default {
    data() {
      return {
        temp: {
          username: 'admin',
          password: 'admin123'
        }
      }
    },
    onLoad() {
      const app = getApp()
      if (app.globalData.token) {
        wx.switchTab({
          url: `../mine/index`
        })
      }
    },
    methods: {
      userInput(key, val) {
        this.temp[key] = val
      },
      userLogin() {
        login({
          username: this.temp.username,
          password: this.temp.password
        }).then(res => {
          uni.showToast({
            title: '登录成功',
            duration: 3000
          })
          setTimeout(() => {
            const app = getApp()
            app.globalData.token = res.data.token
            wx.switchTab({
              url: `../mine/index`
            })
          }, 3000)
        })
      }
    },
  }
</script>

<style lang="scss">
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .uni-h6 {
      margin: 20px 0;
    }

    .input {
      width: 100%;
      margin: 10px 0;
    }

    .button {
      margin-top: 24px;
    }
  }
</style>
