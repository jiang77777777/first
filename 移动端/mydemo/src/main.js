// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入你的store仓库
import store from './store'

//引入移动端的rem
import './assets/js/rem'

//引入共通的css文件
import './assets/css/reset.css'

//引入vantUi框架
import VantUI from 'vant'
Vue.use(VantUI)
import 'vant/lib/index.css'

//在vue原型上挂载一个服务器地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
