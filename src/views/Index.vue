<template>
  <div class="index-page__container">
    <div class=""></div>
  </div>
</template>
<script>
import api from '@/connection/api'
export default {
  data () {
    return {
      km: 123
    }
  },

  created () {
    this.$axios.post(api.user_login, {
      userMobile: '13716171560',
      userPassword: '1122'
    }).then(res => {
      console.log(res)
    })
  },

  methods: {
    handlego () {
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped  lang="scss">
.index-page__container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: red;
}
</style>
