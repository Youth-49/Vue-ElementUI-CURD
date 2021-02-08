import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// import moment from 'moment';

export default new Vuex.Store({
  state: {
    lists: [],
  },
  mutations: {
    addItem(state, value) {
      // value.time = moment(value.time).format('YYYY-MM-DD HH:mm');
      state.lists.push(value);
    },
    // removeItem(state, id) {
    //   alert('yes');
    //   const i = state.list.findIndex((x) => (x).id === id);
    //   alert('yes');
    //   // 根据索引，删除对应的元素
    //   if (i !== -1) {
    //     state.list.splice(i, 1);
    //   }
    // },
  },
  // removeItem(state, value) {
  //   state.lists.splice(value, 1);
  // },
  actions: {
  },
  modules: {
  },
});
