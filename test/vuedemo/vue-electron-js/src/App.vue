<template>
  <div id="app">
    <div v-for="item in clipboardlist">
      {{item}}
    </div>
  </div>
</template>

<script>
const {ipcRenderer} = require('electron')

export default {
  name: 'App',
  data(){
    return {
      clipboardlist:[]
    }
  },
  mounted() {
    ipcRenderer.on("refreshclipboardlist",()=>{

    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
