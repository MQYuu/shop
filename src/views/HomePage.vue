<template>
  <div>
    <!-- Hiển thị danh sách sản phẩm nổi bật -->
    <h1>Sản phẩm nổi bật</h1>
    <div v-if="filteredProducts.length > 0" class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-item">
        <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price | currency }}</p>
      </div>
    </div>
    <p v-else>Không có sản phẩm nổi bật nào.</p>
  </div>
</template>

<script>
import axios from 'axios';
import '../components/ProductList.css';

export default {
  data() {
    return {
      bubbleTeas: [], // Lưu danh sách tất cả sản phẩm
      filteredProducts: [] // Lưu danh sách sản phẩm nổi bật
    };
  },
  created() {
    // Lấy dữ liệu từ JSON Server khi component được tạo
    axios.get('http://localhost:3000/bubbleTeas')
      .then(response => {
        this.bubbleTeas = response.data;
        // Lọc ra 5 sản phẩm hot nhất dựa trên giá hoặc bất kỳ tiêu chí nào
        this.filteredProducts = this.getHotProducts(this.bubbleTeas);
      })
      .catch(error => {
        console.error('Có lỗi khi lấy dữ liệu sản phẩm:', error);
      });
  },
  methods: {
    // Hàm trả về đường dẫn ảnh từ thư mục assets/images
    getImageUrl(imageName) {
      try {
        return require(`@/assets/images/${imageName}`);
      } catch (error) {
        console.error('Không thể tải ảnh:', error);
        return ''; // Trả về chuỗi rỗng nếu không tìm thấy hình ảnh
      }
    },

    // Hàm lọc 5 sản phẩm hot nhất dựa trên giá (có thể thay đổi điều kiện)
    getHotProducts(products) {
      // Lọc và sắp xếp sản phẩm theo giá từ cao đến thấp, sau đó lấy 5 sản phẩm đầu
      return products
        .sort((a, b) => b.price - a.price) // Sắp xếp sản phẩm theo giá giảm dần
        .slice(0, 5); // Lấy 5 sản phẩm đầu tiên
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 2em;
  color: #333;
  margin-bottom: 30px;
}

p {
  font-size: 1em;
  color: #888;
  font-weight: bold;
}
</style>
