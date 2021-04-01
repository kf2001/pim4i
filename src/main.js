import Vue from 'vue'
// import SuiVue from 'semantic-ui-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
/* import 'semantic-ui-css/semantic.min.css'
 */




Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
