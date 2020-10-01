import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  iconfont: 'mdi' || 'md' || 'mdi' || 'fa' || 'fa4',
  render: h => h(App)
}).$mount('#app')
