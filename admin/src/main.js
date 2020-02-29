import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import axios from "axios";


axios.interceptors.request.use(function (config) {
  console.log("Chamando:" + config.url)
  let userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpcm1lcnNvbkBodGN1cnNvcy5jb20iLCJzZW5oYSI6IjEyMzQ1NDYiLCJpYXQiOjE1ODMwMDEyNzh9.lo-LIzVdZWVoK9PHxlaQ6xd5FJ_iIWkvO5_7lj-Sbx0";
  config.headers.Authorization = `Bearer ${userToken}`;
  return config;
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')