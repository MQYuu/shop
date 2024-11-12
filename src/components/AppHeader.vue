<template>
  <header class="header-background">
    <nav>
      <ul class="menu">
        <li><router-link to="/" exact-active-class="active">Trang chủ</router-link></li>
        <li><router-link to="/productslist" active-class="active">Sản phẩm</router-link></li>
        <li><router-link to="/cart" active-class="active">Giỏ hàng ({{ cartCount }})</router-link></li>

        <!-- Hiển thị nút Đăng xuất nếu người dùng đã đăng nhập -->
        <li v-if="isLoggedIn">
          <button @click="logout" class="logout-button">Đăng xuất</button>
        </li>
        
        <!-- Hiển thị nút Đăng nhập nếu người dùng chưa đăng nhập -->
        <li v-else>
          <router-link to="/login" active-class="active">Đăng nhập</router-link>
        </li>
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
    },
    // Kiểm tra xem người dùng đã đăng nhập chưa
    isLoggedIn() {
      return localStorage.getItem('userLoggedIn') !== null;
    }
  },
  methods: {
    // Hàm đăng xuất
    logout() {
      // Xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userName'); // Nếu bạn lưu tên người dùng trong localStorage

      // Chuyển hướng về trang chủ hoặc trang đăng nhập
      this.$router.push({ name: 'Home' }); // Chuyển hướng về trang chủ
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
  align-items: center;
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

.logout-button {
  background-color: #ff6347; /* Màu nền cơ bản */
  border: none;
  padding: 12px 25px; /* Tăng kích thước nút */
  border-radius: 30px; /* Bo tròn viền để tạo hình dạng mềm mại */
  color: white;
  font-weight: bold; /* Làm nổi bật chữ */
  font-size: 1.1em; /* Tăng kích thước chữ */
  text-transform: uppercase; /* Chữ in hoa */
  cursor: pointer;
  transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt mà */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Tạo bóng đổ */
}

.logout-button:hover {
  background-color: #e53e3e; /* Màu nền khi hover */
  transform: translateY(-4px); /* Tạo hiệu ứng nhấn lên */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Tăng cường hiệu ứng bóng đổ khi hover */
}

.logout-button:focus {
  outline: none; /* Xóa viền khi nút được chọn */
  box-shadow: 0 0 0 3px rgba(255, 99, 71, 0.5); /* Hiệu ứng khi nút được chọn */
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
