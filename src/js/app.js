//var ipcRenderer = require('electron').ipcRenderer;
var errors = [];

import Vue from 'vue';

import App from './App.vue';

import router from './router/router.js';

Vue.router = router;

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

errors.forEach(function(err) {
  console.error(err);
});
