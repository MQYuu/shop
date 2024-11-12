import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'; 
import ProductList from '@/views/ProductList.vue'; 
import CartPage from '@/views/CartPage.vue'; 
import LoginPage from '@/views/LoginPage.vue'; 
import ProductDetail from '@/views/ProductDetail.vue';  // Import ProductDetail
import AdminDashboard from '@/components/AdminDashboard.vue';  // Trang admin
import AdminProduct from '@/components/AdminProduct.vue'; // Trang quản lý sản phẩm admin
import AdminOrder from '@/components/AdminOrder.vue'; // Trang quản lý đơn hàng admin
import AdminUser from '@/components/AdminUser.vue'; // Trang quản lý người dùng admin

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/admin',
    component: AdminDashboard,  // Trang admin
    children: [
      { path: 'products', component: AdminProduct },
      { path: 'orders', component: AdminOrder },
      { path: 'users', component: AdminUser },
    ],
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
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('userLoggedIn')) {
        next({ name: 'LoginPage' }); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  // Thêm route cho trang chi tiết sản phẩm
  {
    path: '/product/:id',  // Sử dụng dynamic route
    name: 'ProductDetail',
    component: ProductDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
