<template>
    <div class="logout-container">
      <button @click="logout">Đăng xuất</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
  // Hàm đăng xuất
  logout() {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName'); 

    // Chuyển hướng về trang chủ hoặc trang đăng nhập
    this.$router.push({ name: 'Home' }).then(() => {
    this.$router.go(0);  // Điều hướng lại trang hiện tại (làm mới)
            });
        }
    }

  };
  </script>
  
  <style scoped>
  /* Các style cho nút đăng xuất */
  </style>
  