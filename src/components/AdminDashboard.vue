<template>
    <div class="admin-dashboard">
      <h1>Trang Quản Trị</h1>
      <nav>
        <ul>
          <li><router-link to="/admin/products">Quản lý sản phẩm</router-link></li>
          <li><router-link to="/admin/orders">Quản lý đơn hàng</router-link></li>
          <li><router-link to="/admin/users">Quản lý người dùng</router-link></li>
        </ul>
      </nav>
      <router-view />  <!-- Đây sẽ là nơi hiển thị các component con của admin -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminDashboard',
  };
  </script>
  
  <style scoped>
  /* Tổng thể trang quản trị */
  .admin-dashboard {
    font-family: 'Arial', sans-serif;
    padding: 20px;
    background-color: #f4f4f9;
  }
  
  /* Tiêu đề trang quản trị */
  .admin-dashboard h1 {
    text-align: center;
    font-size: 2.5em;
    color: #333;
    margin-bottom: 30px;
  }
  
  /* Thanh điều hướng */
  nav ul {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 0;
    list-style: none;
  }
  
  nav ul li {
    display: inline-block;
  }
  
  nav ul li a {
    text-decoration: none;
    font-size: 1.1em;
    color: #ff6347;
    padding: 10px 20px;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: block;
  }
  
  nav ul li a:hover {
    background-color: #ff6347;
    color: white;
    transform: translateY(-3px); /* Hiệu ứng nâng lên khi hover */
  }
  
  /* Thêm hiệu ứng cho khi hover */
  nav ul li a:active {
    transform: translateY(1px); /* Khi nhấn vào */
  }
  
  /* Cải thiện giao diện ở màn hình nhỏ */
  @media (max-width: 768px) {
    .admin-dashboard {
      padding: 15px;
    }
  
    nav ul {
      flex-direction: column;
      align-items: center;
    }
  
    nav ul li {
      margin-bottom: 15px;
    }
  
    nav ul li a {
      font-size: 1.2em;
    }
  }
  </style>
  