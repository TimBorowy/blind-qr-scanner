import Vue from 'vue'
import App from './App.vue'
import VueQrcodeReader from "vue-qrcode-reader";
import router from './router/router.js';

Vue.use(VueQrcodeReader);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')