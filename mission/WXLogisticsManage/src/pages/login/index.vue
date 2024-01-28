<template>
  <view class="content">
    <image src="https://pic.616pic.com/ys_bnew_img/00/11/35/GTrEbdgLSB.jpg" mode="aspectFit"></image>

    <uni-title type="h1" title="速通科技"></uni-title>

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
  import { login } from '@/api/index'

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
        const { username, password } = this.temp
        if (username === '') {
          uni.showToast({
            icon: 'none',
            title: '请输入账号',
            duration: 3000
          })
          return
        } else if (password === '') {
          uni.showToast({
            icon: 'none',
            title: '请输入密码',
            duration: 3000
          })
          return
        }
        login({
          username,
          password
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

    .title {
      margin: 20px 0;
    }

    .input {
      width: 100%;
      margin: 10px 0;
    }

    .button {
      background-color: #007aff;
      color: #fff;
      margin-top: 24px;
    }
  }
</style>
