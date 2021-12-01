import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMaterial from 'vue-material';
import './assets/scss/main.scss';
import Vuex from 'vuex';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Vuex);

const api = axios.create({
  baseURL: 'http://localhost:1780/api/',
});

Vue.prototype.$api = api;

const classMap = ['waiting', 'active', 'done'];

const store = new Vuex.Store({
  state: {
    tasks: [],
  },
  getters: {
    getTaskById: (state) => (taskId) => {
      return state.tasks.find(({ id }) => +id === +taskId);
    },
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    async getTasks(context) {
      const response = await this._vm.$api.post('request/list');
      const tasks = response.data.data.map((task) => ({ ...task, className: classMap[task.status.id] }));
      context.commit('setTasks', tasks);
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
