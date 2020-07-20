import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueModel, {Store} from '@/packages/vue-model';

Vue.config.productionTip = false
Vue.use(VueModel);
const store = new Store()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
