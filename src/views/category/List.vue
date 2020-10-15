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
              <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleEditCategory(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDeleteOneCategory(scope.row)" type="text" size="small">删除</el-button>
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

    <!--二级分类-->
    <div class="middle-box">
      <center>
        <h1>二级分类</h1>
        <h6>{{getTwoCategoryParams.oneCategoryName}}</h6>
        <div>
          <el-table :data="twoCategoryList.list" border>
            <el-table-column fixed prop="twoCategoryName" label="分类名称" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleLookProduct(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="handleEditCategory(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDeleteTwoCategory(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </center>
      <center>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleLook"
          :total="twoCategoryList.count"
        ></el-pagination>
      </center>
    </div>

    <div class="right-box">
      <center>
        <h1>商品</h1>
        <h6></h6>
        <div>
          <el-table :data="productList.list" border>
            <el-table-column fixed prop="product_name" label="商品名称" width="150"></el-table-column>
            <el-table-column fixed prop="product_count" label="数量" width="150"></el-table-column>
          </el-table>
        </div>
      <center>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleChangProductPage"
          :total="productList.count"
        ></el-pagination>
      </center>
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

    <!--修改分类名字-->
    <el-dialog
      title="提示"
      :visible.sync="isShowEditCategory"
      width="30%">
      <div class="category-edit__box">
        <span>{{editCategoryParams.twoCategoryName? editCategoryParams.twoCategoryName : editCategoryParams.oneCategoryName}}修改为：</span>
        <el-input v-model="editCategoryParamsName" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditCategory = false">取 消</el-button>
        <el-button type="primary" @click="handleEditCategorySend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/connection/api'
export default {
  data () {
    return {
      addCategory: 1, // 默认添加一级分类
      dialogFormVisible: false, // 添加一级分类是否显示
      oneCategoryList: {
        list: [],
        next: false,
        count: 0
      },
      oneCategoryParms: {
        oneCategoryName: ''
      },
      searchOneCategoryParams: {
        page: 1
      },

      twoCategoryList: [], // 二级分类列表
      addTwoCategoryParams: {}, // 添加二级分类的参数

      // 获取二级分类的参数
      getTwoCategoryParams: {
        oneCategoryName: '',
        oneCategoryId: '',
        page: 1
      },

      // 修改分类的参数
      editCategoryParams: {},
      editCategoryParamsName: '',
      isShowEditCategory: false, // 修改分类的模态框是否显示

      productList: {}, // 商品的列表
      // 商品的参数
      productParams: {
        page: 1,
        twoCategoryId: ''
      }
    }
  },

  //
  created () {
    this.handleGetOneCategory()
  },

  methods: {
    // 编辑分类
    handleEditCategory (e) {
      e.type = e.twoCategoryIndex ? 2 : 1
      this.editCategoryParams = e
      this.isShowEditCategory = true
    },

    // 发送编辑的分类
    handleEditCategorySend () {
      this.$axios.post(api.category_edit, {
        ...this.editCategoryParams,
        editCategoryParamsName: this.editCategoryParamsName
      }).then(res => {
        console.log(res)
        if (res.code !== 1) return this.$message(res.message)
        this.$message({
          type: 'success',
          message: '编辑成功!'
        })

        if (this.editCategoryParams.type === 1) {
          this.handleGetOneCategory()
        } else {
          this.handleLook()
        }

        this.isShowEditCategory = false
      })
    },

    // 删除二级分类
    handleDeleteTwoCategory (e) {
      console.log(e)
      this.$confirm('二级分类：' + e.twoCategoryName + '要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(api.category_two_delete, {
          params: e
        }).then(res => {
          if (res.code !== 1) return this.$message(res.message)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.handleLook({
            oneCategoryId: e.oneCategoryId
          })
        })
      })
    },

    // 删除一级分类
    handleDeleteOneCategory (e) {
      console.log(e)
      this.$confirm('一级分类：' + e.oneCategoryName + '要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(api.category_one_delete, {
          params: {
            categoryId: e.oneCategoryId
          }
        }).then(res => {
          console.log(res)
          if (res.code !== 1) return this.$message(res.message)
          this.handleGetOneCategory()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    // 商品翻页
    handleChangProductPage (e) {
      console.log(e)
      this.productParams.page = e
      this.handleLookProduct()
    },

    // 查看商品
    handleLookProduct (e) {
      console.log(e)
      this.productParams.twoCategoryId = e ? e.twoCategoryId : this.productParams.twoCategoryId
      this.$axios.get(api.product_select_by_category, {
        params: {
          ...this.productParams
        }
      }).then(res => {
        if (res.code !== 1) return this.$message(res.message)
        console.log(res)
        this.productList = res.data
      })
    },

    // 添加分类模态框是否显示
    handleShowAddCategory (e) {
      if (e === 1) {
        this.addCategory = 1
      } else {
        this.addCategory = 2
        this.addTwoCategoryParams = e
      }
      this.dialogFormVisible = !this.dialogFormVisible
    },

    // 查看二级分类
    handleLook (e) {
      console.log(e)
      // 点击一级分类的时候所查看的二级分类
      if (e.oneCategoryId) {
        this.getTwoCategoryParams.oneCategoryId = e.oneCategoryId
        this.getTwoCategoryParams.oneCategoryName = e.oneCategoryName ? e.oneCategoryName + '下的二级分类' : ''
      } else {
        // 二级分类翻页的时候
        this.getTwoCategoryParams.page = e
      }

      this.$axios
        .get(api.category_two_by_category_list, {
          params: {
            ...this.getTwoCategoryParams
          }
        })
        .then(res => {
          if (res.code !== 1) return this.$message(res.message)
          console.log(res)
          this.twoCategoryList = res.data
        })
    },

    // 切换分页
    handleChangPage (e) {
      this.searchOneCategoryParams.page = e
      this.handleGetOneCategory()
    },

    // 获取一级分类
    handleGetOneCategory () {
      this.$axios
        .get(api.category_one_list, {
          params: {
            ...this.searchOneCategoryParams,
            storeId: JSON.parse(localStorage.getItem('userInfo')).storeId
          }
        })
        .then(res => {
          if (res.code !== 1) return this.$message(res.message)
          this.oneCategoryList = res.data
        })
    },

    // 添加分类
    handleAddCategory () {
      if (!this.oneCategoryParms.oneCategoryName) {
        alert('不能为空')
        return
      }

      if (this.addCategory === 1) {
        this.$axios
          .post(api.category_one_add, {
            ...this.oneCategoryParms,
            storeId: JSON.parse(localStorage.getItem('userInfo')).storeId
          })
          .then(res => {
            if (res.code !== 1) return this.$message(res.message)
            this.handleGetOneCategory()
          })
      } else {
        this.$axios
          .post(api.category_two_add, {
            oneCategoryId: this.addTwoCategoryParams.oneCategoryId,
            twoCategoryName: this.oneCategoryParms.oneCategoryName,
            storeId: JSON.parse(localStorage.getItem('userInfo')).storeId
          })
          .then(res => {
            if (res.code !== 1) return this.$message(res.message)
            console.log(res)
            this.handleLook({
              oneCategoryId: this.addTwoCategoryParams.oneCategoryId
            })
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
  .category-edit__box{
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-input{
      width: auto;
    }
  }
  .middle-box,
  .left-box {
    border-right: 1px solid #e5e5e5;
  }
  .middle-box{
    background-color: #f8f8f8;
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
