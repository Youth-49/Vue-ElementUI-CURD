<template>
  <div>
<!--    <el-table :data="slist" :stripe="true" :border="true">-->
<!--      <el-table-column type="index"></el-table-column>-->
<!--      <el-table-column prop="username" label="Author"></el-table-column>-->
<!--      <el-table-column prop="title" label="Title"></el-table-column>-->
<!--      <el-table-column prop="content" label="Content"></el-table-column>-->
<!--      <el-table-column prop="time" label="Time"></el-table-column>-->
<!--      <el-table-column label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          &lt;!&ndash; 修改按钮 &ndash;&gt;-->
<!--          <el-button type="primary" icon="el-icon-edit" size="mini"-->
<!--                     @click="showEditDialog(scope.row.id)"></el-button>-->
<!--          &lt;!&ndash; 删除按钮 &ndash;&gt;-->
<!--          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>-->
<!--          &lt;!&ndash; 分配角色按钮 &ndash;&gt;-->
<!--          <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable="false">-->
<!--            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>-->
<!--          </el-tooltip>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
    <div v-if="!isShow" class="wrapper" ref="main">
      <el-input v-model="list_title" placeholder="Title" style="width: 200px;"
                class="filter-item" @keyup.enter.native="handleFilter" />
      <tr>
        <td>ID</td> |
        <td>Time</td> |
        <td>Title</td> |
        <td>Username</td> |
        <td>Content</td>
      </tr>

      <tr v-cloak v-for="(item, index) in activeItemList" @click="choose(index)" :key="index">
        <td>{{index+1}}</td> |
        <td>{{item.time}}</td> |
        <td>{{item.title}}</td> |
        <td>{{item.username}}</td> |
        <td>{{item.content}}</td>
        <td><a href="javascript:;" @click="showEditDialog(index)">修改</a> |
          <a href="javascript:;" @click='slist.splice(index, 1)'>删除</a> |
          <!--          删除或许有点问题？没有删去store.state.list里的，不过只是个单页面，也不涉及跨组件和前后端交互。。。-->
          <button class="detail" v-show="index === current" @click="showInfo(item)">
            查看详情
          </button></td>
      </tr>

      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed">
        <el-form :model="editForm" ref="editFormRef" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled>qqq</el-input>
          </el-form-item>
          <el-form-item label="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="title">
            <el-input v-model="editForm.content"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo">确 定</el-button>
      </span>
      </el-dialog>

    </div>
    <Info :obj="chooseOne"
          @backEvent="()=>{this.isShow = false;}"
          v-else></Info>
  </div>
</template>

<script>
import store from '@/store';
import Info from '@/components/Info.vue';
import Vue from 'vue';

export default {
  name: 'List',
  store,
  components: {
    Info,
  },
  data() {
    return {
      isShow: false,
      editDialogVisible: false, // showEditDialog
      edit_index: '', // 修改表单
      current: '',
      chooseOne: '', // showInfo
      editForm: {}, // 修改表单
      slist: [], // 用于渲染表单
      list_title: '', // 搜索栏
    };
  },
  // mounted() {
  //   this.$refs.main.style.maxHeight = window.innerHeight - 60 + 'px';
  // },
  computed: {
    activeItemList() { // 语法糖
      return this.slist.filter((item) => (item).isShowed); // https://cn.vuejs.org/v2/style-guide/
    }, // https://cloud.tencent.com/developer/section/1135805
    lists() {
      return store.state.lists;
    },
  },
  created() {
    this.slist = store.state.lists;
  },
  methods: {
    choose(index) { // 用于点击变色效果
      this.current = index;
    },
    showInfo(item) {
      this.chooseOne = item;
      this.isShow = true;
      this.current = '';
    },
    async showEditDialog(index) {
      this.editForm = JSON.parse(JSON.stringify(this.slist[index])); // 深拷贝
      this.editDialogVisible = true;
      this.edit_index = index;
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    editInfo() {
      Vue.set(this.slist, this.edit_index, this.editForm);
      this.editDialogVisible = false;
    },
    handleFilter() {
      // 过滤需要的数据
      this.slist.forEach((item, index) => {
        this.slist[index].isShowed = false;
        // 检测用户名
        if (item.title.indexOf(this.list_title) > -1) { // 包含即可
          this.slist[index].isShowed = true;
        }
      });
    },
    // removebyID(index) {
    //   this.$store.commit('removeItem', index);
    // },
  },
};
</script>

<style scoped lang="scss">
$main-color: #42b983;
.wrapper{
  padding: 10px;
  overflow-y: scroll;
}
.item{
  position: relative;
  padding: 5px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  line-height: 18px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  margin-bottom: 10px;
  &.active{
    border: 1px solid $main-color;
    background: $main-color;
    color: #fff;
  }
  .title{
    font-size: 18px;
    font-weight: 500;
    line-height: 36px;
    border-bottom: 1px solid #dcdcdc;
  }
  .content{
    font-size: 16px;
    line-height: 22px;
    padding: 10px 0 30px 0;
  }
  .time{
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
  .detail{
    position: absolute;
    right: 10px;
    bottom: 10px;
    text-align: right;
    /*color: #42b983;*/
    text-decoration: underline;
  }
}

</style>
