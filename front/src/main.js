import Vue from 'vue'
import App from './App'
import cscPost from './utils/ajax'
import 'mpvue-weui/src/style/weui.css';
Vue.use(cscPost); //注册封装的axios
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = getApp().globalData;
