import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import axios from "axios";


axios.interceptors.request.use(function (config) {
  console.log("Chamando:" + config.url)
  let userToken = localStorage.getItem("user-token");
  config.headers.Authorization = `Bearer ${userToken}`;
  return config;
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')