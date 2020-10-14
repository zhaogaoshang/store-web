<template>
  <div class="add-category__page">
    <div class="left-box">
      <center>
        <h1>一级分类</h1>
      </center>
      <div>
        <el-table :data="oneCategoryList.list" border>
          <el-table-column fixed prop="oneCategoryName" label="分类名称" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleShowAddCategory(scope.row)" type="text" size="small">添加二级分类</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <center class="add-btn">
        <el-button type="primary" @click="handleShowAddCategory(1)">添加一级分类</el-button>
      </center>
      <center>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleChangPage"
          :total="oneCategoryList.count"
        ></el-pagination>
      </center>
    </div>

    <div class="middle-box">
      <center>
        <h1>二级分类</h1>
        <div>
          <el-table :data="twoCategoryList" border>
            <el-table-column fixed prop="twoCategoryName" label="分类名称" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleLookProduct(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </center>
    </div>

    <div class="right-box">
      <center>
        <h1>商品</h1>
        <div>
          <el-table :data="twoCategoryList" border>
            <el-table-column fixed prop="twoCategoryName" label="商品名称" width="150"></el-table-column>
            <el-table-column fixed prop="twoCategoryName" label="数量" width="150"></el-table-column>
          </el-table>
        </div>
      </center>
    </div>

    <!--添分类的模态框-->
    <el-dialog :title="addCategory==1?'添加一级分类':'添加二級级分类'" :visible.sync="dialogFormVisible">
      <div class="category-name__box">
        <span>分类名称：</span>
        <el-input max="10" v-model="oneCategoryParms.oneCategoryName"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddCategory()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/connection/api";
export default {
  data() {
    return {
      addCategory: 1, // 默认添加一级分类
      dialogFormVisible: false, // 添加一级分类是否显示
      oneCategoryList: {
        list: [],
        next: false,
        count: 0
      },
      oneCategoryParms: {
        oneCategoryName: ""
      },
      searchOneCategoryParams: {
        page: 1
      },

      twoCategoryList: [], // 二级分类列表
      addTwoCategoryParams: {}, // 添加二级分类的参数

      // 商品的参数
      productParams: {
        page: 1
      }
    };
  },

  //
  created() {
    this.handleGetOneCategory();
  },

  methods: {
    // 查看商品
    handleLookProduct (e) {
      console.log(e)
      this.$axios.get(api.product_select_by_category,{
        params: {
          ...this.productParams,
          twoCategoryId: e.twoCategoryId
        }
      }).then(res => {
        console.log(res)
      })
    },

    // 添加分类模态框是否显示
    handleShowAddCategory(e) {
      if (e == 1) {
        this.addCategory = 1
      } else {
        this.addCategory = 2
        this.addTwoCategoryParams = e
      }
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 查看二级分类
    handleLook(e) {
      this.$axios
        .get(api.category_two_by_category_list, {
          params: {
            oneCategoryId: e.oneCategoryId
          }
        })
        .then(res => {
          console.log(res);
          this.twoCategoryList = res;
        });
    },
    // 切换分页
    handleChangPage(e) {
      this.searchOneCategoryParams.page = e;
      this.handleGetOneCategory();
    },
    // 获取一级分类
    handleGetOneCategory() {
      this.$axios
        .get(api.category_one_list, {
          params: {
            ...this.searchOneCategoryParams,
            storeId: JSON.parse(localStorage.getItem("userInfo")).storeId
          }
        })
        .then(res => {
          this.oneCategoryList = res;
        });
    },
    // 添加分类
    handleAddCategory() {
      if(this.addCategory==1){
        this.$axios
          .post(api.category_one_add, {
            ...this.oneCategoryParms,
            storeId: JSON.parse(localStorage.getItem("userInfo")).storeId
          })
          .then(res => {
            console.log(res)
            this.dialogFormVisible = !this.dialogFormVisible
            this.handleGetOneCategory()
          })
      } else {
        this.$axios
          .post(api.category_two_add, {
            oneCategoryId: this.addTwoCategoryParams.oneCategoryId,
            twoCategoryName: this.oneCategoryParms.oneCategoryName,
            storeId: JSON.parse(localStorage.getItem("userInfo")).storeId
          })
          .then(res => {
            console.log(res)
            this.handleLook({oneCategoryId: this.addTwoCategoryParams.oneCategoryId})
          })
      }

      this.dialogFormVisible = !this.dialogFormVisible
    }
  }
}
</script>
<style lang="scss" scoped>
.add-category__page {
  display: flex;
  flex-direction: row;
  height: 100%;
  .left-box,
  .middle-box,
  .right-box {
    flex: 1;
  }
  .middle-box,
  .left-box {
    border-right: 1px solid #e5e5e5;
  }
  .middle-box{
    background-color: #e9e9e9;
  }
  .category-name__box {
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-input {
      flex: 1;
    }
  }
  .add-btn {
    margin: 10px 0;
  }
}
</style>
