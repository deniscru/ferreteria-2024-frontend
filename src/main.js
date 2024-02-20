import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(VueSweetalert2);
app.use(router);
app.mount('#app')