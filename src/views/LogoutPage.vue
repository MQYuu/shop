<template>
  <div class="logout-container">
    <button v-if="isLoggedIn" @click="logout" >Đăng xuất</button>
    <button v-else @click="login">Đăng nhập</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Biến để theo dõi trạng thái đăng nhập
    };
  },
  created() {
    this.checkLoginStatus(); // Kiểm tra trạng thái đăng nhập khi tạo component
  },
  methods: {
    // Kiểm tra nếu người dùng đã đăng nhập
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('userLoggedIn');
    },
    // Hàm đăng xuất
    logout() {
      // Xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userName');

      // Cập nhật lại trạng thái đăng nhập
      this.isLoggedIn = false;

      // Chuyển hướng về trang chủ hoặc trang đăng nhập
      this.$router.push({ name: 'Home' }); // Chuyển hướng về trang chủ
    },
    // Hàm đăng nhập (giả lập)
    login() {
      // Giả lập đăng nhập
      localStorage.setItem('userLoggedIn', true);
      localStorage.setItem('userName', 'user'); // Thêm tên người dùng ví dụ

      // Cập nhật lại trạng thái đăng nhập
      this.isLoggedIn = true;

      // Chuyển hướng đến trang người dùng đã đăng nhập (hoặc trang dashboard)
      this.$router.push({ name: 'UserDashboard' });
    },
  },
  watch: {
    // Quan sát sự thay đổi của trạng thái đăng nhập
    isLoggedIn(newVal) {
      if (!newVal) {
        // Khi người dùng đăng xuất, cập nhật trạng thái
        this.checkLoginStatus();
      }
    }
  }
};
</script>

<style scoped>
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  background-color: #007bff; /* Màu xanh lam cho nút */
  color: white;
  border: 1px solid #007bff;
  padding: 12px 25px;
  border-radius: 50px; /* Bo tròn nút */
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ nhẹ */
}

button:hover {
  background-color: #0056b3; /* Đổi màu khi hover */
  border-color: #0056b3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Bóng đổ khi hover */
  transform: translateY(-3px); /* Nâng nút lên khi hover */
}

button:active {
  background-color: #004085; /* Đổi màu khi nhấn */
  border-color: #004085;
  transform: translateY(1px); /* Tạo hiệu ứng khi nhấn */
}

button:focus {
  outline: none; /* Tắt viền khi focus */
}
</style>
