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

const store = new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async getToken(context, payload) {
      const response = await axios.post('http://localhost:1780/api/login', {
        email: payload.email,
        password: payload.password,
      });
      context.commit('setToken', response.data.data);
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
