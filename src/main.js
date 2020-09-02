import Vue from 'vue'
// import bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
// bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue for JS portion
Vue.use(BootstrapVue)

Vue.config.productionTip = false

// creates a new Vue instance
new Vue({
  render: h => h(App),
}).$mount('#app')
// mounts to DOM element with id: #app