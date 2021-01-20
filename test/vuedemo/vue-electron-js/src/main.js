import Vue from 'vue'
import App from './App.vue'
//  主进程
import { ipcMain } from 'electron'
new BrowserWindow({
  parent:win,
  width:300,
  height:400
})
ipcMain.on('refreshclipboardlist',(event,param)=>{
  //  event 是渲染进程中的webContent对象实例
  console.log(param)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
