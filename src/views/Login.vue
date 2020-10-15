<template>
  <div class="login-container">
    <h1 class="title">欢迎使用金塔仓储管理系统</h1>
    <div class="middle-box">
      <div class="left">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" alt="">
      </div>
      <div class="right">
        <div class="input-item">
          <i class="icon el-icon-phone"></i>
          <el-input placeholder="手机号码" type="number" v-model="params.userMobile" clearable></el-input>
        </div>
        <div class="input-item password-box">
          <i class="icon el-icon-unlock"></i>
          <el-input placeholder="请输入密码" v-model="params.userPassword" show-password></el-input>
        </div>
        <el-button type="primary" size="medium" @click="handleLogoin">登录</el-button>
        <div class="zhuce">
          <i>忘记密码</i>
          <i @click="handleRegistered">注册</i>
        </div>
      </div>
    </div>
    <div class="bottom-box"></div>
  </div>
</template>
<script>
import api from '@/connection/api'
export default {
  data () {
    return {
      params: {
        userMobile: '',
        userPassword: ''
      }
    }
  },

  created () {
  },

  methods: {
    // 登录
    handleLogoin () {
      this.$axios.post(api.user_login, {
        ...this.params
      }).then(res => {
        if (res.code === 1) {
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          this.$router.push('/')
        } else {
          this.$message(res.massage)
        }
      })
    },

    // 注册
    handleRegistered () {
      this.$router.push('/registered')
    }
  }
}
</script>
<style scoped lang="scss">
.login-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  // background-color: red;
  .title{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle-box{
    flex: 8;
    position: relative;
    background-color: pink;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .left{
    }
    .right{
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: space-around;
      justify-content: center;
      width: 400px;
      background-color: white;
      border: 1px solid #2c2b2b;
      border-radius: 10px;
      .password-box{
        margin: 30px;
      }
      .input-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon{
          margin-right: 10px;
        }
      }
      .zhuce{
        width: 300px;
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        color: var(--blue);
      }
    }
  }
  .bottom-box{
    flex: 1;
    background-color: black;
  }
}
</style>
