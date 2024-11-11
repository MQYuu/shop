import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'; // Đảm bảo đường dẫn chính xác
import ProductList from '@/views/ProductList.vue'; // Đảm bảo đường dẫn chính xác
import CartPage from '@/views/CartPage.vue'; // Đảm bảo đường dẫn chính xác
import AdminPanel from '@/views/AdminPanel.vue'; // Đảm bảo đường dẫn chính xác

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/productslist',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;