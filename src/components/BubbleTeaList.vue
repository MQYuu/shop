<template>
    <div>
      <h2>Danh sách Trà Sữa</h2>
      <div v-if="bubbleTeas.length">
        <ul>
          <li v-for="tea in bubbleTeas" :key="tea.id">
            <img :src="tea.image" :alt="tea.name" width="100" />
            <h3>{{ tea.name }}</h3>
            <p>{{ tea.description }}</p>
            <p>Giá: {{ tea.price }} VND</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Đang tải dữ liệu...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        bubbleTeas: [] // Khởi tạo danh sách trà sữa rỗng
      };
    },
    mounted() {
      // Lấy dữ liệu từ JSON Server khi component được mount
      axios.get('http://localhost:3000/bubbleTeas')
        .then(response => {
          this.bubbleTeas = response.data; // Gán dữ liệu vào biến `bubbleTeas`
        })
        .catch(error => {
          console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        });
    }
  };
  </script>
  
  <style scoped>
  /* Thêm kiểu cho danh sách trà sữa */
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  img {
    margin-right: 20px;
    border-radius: 5px;
  }
  </style>
  