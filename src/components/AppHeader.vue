<template>
  <header class="header-background">
    <nav>
      <ul class="menu">
        <li><router-link to="/" exact-active-class="active">Trang chủ</router-link></li>
        <li><router-link to="/productslist" active-class="active">Sản phẩm</router-link></li>
        <li><router-link to="/cart" active-class="active">Giỏ hàng ({{ cartCount }})</router-link></li>
        <li><router-link to="/login" active-class="active">Đăng nhập</router-link></li>
      </ul>
      <div class="logo">
        <img src="@/assets/logo/OIP.jpg" alt="Logo Trà Sữa" />
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    // Lấy số lượng sản phẩm trong giỏ hàng từ Vuex store
    cartCount() {
      return this.$store.state.cart.length;  // Giả sử bạn lưu giỏ hàng trong Vuex
    }
  }
};
</script>

<style scoped>
.header-background {
  background-image: url('@/assets/background/watermelon-boba-drink-with-straw-table_868797-13721.jpg');
  background-size: cover;
  background-position: center;
  height: 200px;
  padding: 20px 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between; /* Đưa logo sang bên phải và các nút sang bên trái */
  align-items: center;
  padding: 0 20px;
}

.menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  margin: 0 15px;
  position: relative;
}

.menu li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.1em;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
}

.menu li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ff6347;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.menu li a:hover::after {
  transform: scaleX(1);
}

.menu li a:hover {
  background-color: rgba(255, 99, 71, 0.1);
  color: #ff6347;
  transform: translateY(-5px);
}

.menu li a.active {
  color: #ff6347;
}

.logo img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.1); /* Tăng kích thước logo khi hover */
}

/* Media query cho các màn hình nhỏ */
@media (max-width: 768px) {
  .logo img {
    height: 50px;
  }

  nav {
    flex-direction: row-reverse; /* Đổi hướng các phần tử khi màn hình nhỏ, logo sang bên trái */
    justify-content: space-between;
  }

  .menu {
    flex-direction: column;
    align-items: center;
  }

  .menu li {
    margin: 10px 0;
  }
}
</style>
