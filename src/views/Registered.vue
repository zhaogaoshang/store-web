<template>
  <div class="register-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户姓名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="userMobile">
        <el-input type="number" v-model="ruleForm.userMobile"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="ruleForm.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="userPassword2">
        <el-input v-model="ruleForm.userPassword2"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="userIdCard">
        <el-input v-model="ruleForm.userIdCard"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="userSex">
        <el-radio-group v-model="ruleForm.userSex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from '@/connection/api'
export default {
  data () {
    return {
      ruleForm: {
        userName: '',
        userMobile: '',
        userPassword: '',
        userPassword2: '',
        userSex: '1',
        userIdCard: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        userMobile: [
          {
            required: true,
            message: '输入手机号码有误',
            trigger: 'blur',
            pattern: /^1[0-9]{10}$/
          }
        ],
        userPassword: [
          { required: true, min: 6, message: '长度在6位以上', trigger: 'blur' }
        ],
        userPassword2: [
          { required: true, min: 6, message: '长度在6位以上', trigger: 'blur' }
        ],
        userIdCard: [
          { required: true, min: 18, max: 18, message: '长度为18', trigger: 'blur' }
        ],
        userSex: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },

  created () {},
  methods: {
    // 提交表單
    submitForm (formName) {
      if (this.ruleForm.userPassword !== this.ruleForm.userPassword2) {
        alert('密码不一致')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(api.user_registered, this.ruleForm).then(res => {
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
    },

    // 表单重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.register-container{
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
