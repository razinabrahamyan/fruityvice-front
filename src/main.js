import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import Vue from "vue";
import App from './App.vue'
import router from "@/router";
import { store } from './store'

Vue.config.productionTip = false;
const app = createApp(App);
app.component('BootstrapIcon', BootstrapIcon);
app.use(store);
app.use(router);
app.mount('#app')


import "bootstrap/dist/js/bootstrap"
