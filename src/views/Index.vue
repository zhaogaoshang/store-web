<template>
  <div class="index-page__container">
    <!-- 左边 -->
    <div class="side">
      <el-row class="tac-box">
        <el-col>
          <h5 class="projuct-name">金塔仓储管理</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu :index="index+''" v-for="(item,index) in side" :key="index">
              <template slot="title">{{item.name}}</template>
              <el-menu-item-group>
                <el-menu-item :index="index + '-' +idx" v-for="(only,idx) in item.sideSun" :key="idx" @click="handleSearch(only)">{{only.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <!-- 右边 -->
    <div class="right-box">
      <!-- 上边 -->
      <div class="global-top"></div>
      <!-- 下边 -->
      <div class="global-bottom"></div>
    </div>
  </div>
</template>
<script>
import api from '@/connection/api'
export default {
  data () {
    return {
      side: [
        {
          name: '商品',
          sideSun: [
            {
              name: '商品总价值',
              path: '/product/list'
            }
          ]
        },
        {
          name: '入库',
          sideSun: [
            {
              name: '商品入库',
              path: '/product/list'
            },
            {
              name: '删除入库单',
              path: '/product/list'
            },
            {
              name: '更改入库单',
              path: '/product/list'
            },
            {
              name: '查找入库单',
              path: '/product/list'
            },
          ]
        },
        {
          name: '出库',
          sideSun: [
            {
              name: '商品出库',
              path: '/product/list'
            },
            {
              name: '删除出库单',
              path: '/product/list'
            },
            {
              name: '更改出库单',
              path: '/product/list'
            },
            {
              name: '查找出库',
              path: '/product/list'
            }
          ]
        },
        {
          name: '分类',
          sideSun: [
            {
              name: '添加分类',
              path: '/product/list'
            },
            {
              name: '删除分类',
              path: '/product/list'
            },
            {
              name: '更改分类',
              path: '/product/list'
            },
            {
              name: '查找分类',
              path: '/product/list'
            }
          ]
        },
        {
          name: '设置',
          sideSun: [
            {
              name: '仓库信息',
              path: '/product/list'
            },
            {
              name: '个人信息',
              path: '/product/list'
            },
            {
              name: '添加仓库管理员',
              path: '/product/list'
            },
            {
              name: '加入仓库管理',
              path: '/product/list'
            },
            {
              name: '退出仓库管理',
              path: '/product/list'
            }
          ]
        }
      ]
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
  .right-box{
    flex: 1;
    display: flex;
    flex-direction: column;
    .global-top{
      height: 60px;
      background-color: #e5e5e5;
    }
    .global-bottom{
      flex: 1;
    }
  }
  .side{
    background-color: rgb(84, 92, 100);
  }
  .tac-box{
    width: 150px;
    .projuct-name{
      background-color: white;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
    }
  }
}
</style>
