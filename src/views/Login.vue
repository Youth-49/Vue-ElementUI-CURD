<template>
  <div>
    <form action="" v-if="!isreg">
      <div>Username:</div>
      <input type="text" v-model = "name">
      <div>Password:</div>
      <input type="password" v-model = "password">
      <button type = "button" @click="login()">登录</button>
      <button type = "button" @click="reg()">注册</button>
    </form>
    <form action="" v-else>
      <div>Username:</div>
      <input type="text" v-model = "name">
      <div>Password:</div>
      <input type="password" v-model = "password">
      <div>Repeat Password:</div>
      <input type="password" v-model = "repeatpasssword">
      <button type = "button" @click="addUser()">确定</button>
      <button type = "button" @click="cancel()">取消</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isreg: false,
      name: '',
      password: '',
      repeatpasssword: '',
    };
  },
  methods: {
    login() {
      if (localStorage.getItem('name') === this.name && localStorage.getItem('password') === this.password) {
        this.name = '';
        this.password = '';
        this.$router.push('/home/list');
      } else {
        alert('用户名或密码不正确');
      }
    },
    reg() {
      this.isreg = true;
    },
    addUser() {
      if (this.password === this.repeatpasssword) {
        localStorage.setItem('name', this.name);
        localStorage.setItem('password', this.name);
        this.name = '';
        this.password = '';
        this.isreg = false;
      } else {
        alert('密码不一致');
      }
    },
    cancel() {
      this.isreg = false;
    },
  },
};
</script>

<style scoped>

</style>
