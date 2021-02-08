<template>
  <div>
    <div class="form-group">
      <div class="form-item">
        <div class="form-title">标题</div>
        <input class="form-input" type="text" v-model="title">
      </div>
      <div class="form-item">
        <div class="form-title">作者</div>
        <input class="form-input" type="text" v-model="username">
      </div>
      <div class="form-item">
        <div class="form-title">内容</div>
        <textarea class="form-input" type="text" v-model="content" rows="15"></textarea>
      </div>
    </div>
    <div class="btns">
      <button type="button" @click="add()">完成</button>
      <button type="button" @click="()=>{this.$router.back()}">取消</button>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'Add',
  store,
  data() {
    return {
      username: '',
      title: '',
      content: '',
      isShowed: true,
    };
  },
  methods: {
    add() {
      store.commit('addItem', {
        username: this.username,
        title: this.title,
        content: this.content,
        isShowed: this.isShowed, // 展示某一条与否
        time: new Date(),
      });
      this.username = '';
      this.title = '';
      this.content = '';
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="scss">
.form-group{
  padding: 10px;
  .form-item{
    padding-bottom: 15px;
    .form-title{
      padding: 8px 0;
    }
    .form-input{
      border: 1px solid #dcdcdc;
      border-radius: 6px;
      width: 100%;
      line-height: 18px;
      outline: none;
      padding: 10px
    }
  }
}
</style>
