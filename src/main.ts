import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueModel, {Store} from '@/packages/vue-model';
import Toast from '@/components/toast';
import '@/mixins/dialog';

Vue.config.productionTip = false
Vue.use(VueModel);
const store = new Store()
//@ts-ignore
Vue.$toast = Vue.prototype.$toast = Toast;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
