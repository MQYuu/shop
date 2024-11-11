import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Đảm bảo import store
import router from './router';

createApp(App)
  .use(store)  // Đăng ký Vuex store
  .use(router)
  .mount('#app');
