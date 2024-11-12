<template>
  <div class="featured-products">
    <h1>Sản phẩm nổi bật</h1>
    <div v-if="filteredProducts.length > 0" class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-item">
        <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="price">{{ formatPrice(product.price) }}</p> <!-- Sử dụng phương thức formatPrice -->
        </div>
      </div>
    </div>
    <p v-else>Không có sản phẩm nổi bật nào.</p>
  </div>
</template>

<style scoped>
/* Layout chung cho phần sản phẩm nổi bật */
.featured-products {
  text-align: center;
  padding: 30px 20px;
}
p {
  font-size: 1.2em;
  color: #888;
  font-weight: bold;
  margin-top: 30px;
}
</style>

<script>
import { getBubbleTeas } from '@/api/bubbleTea';  // Import API function
import '../components/ProductList.css'; 

export default {
  data() {
    return {
      bubbleTeas: [],
      filteredProducts: []
    };
  },
  created() {
    // Sử dụng API để lấy dữ liệu sản phẩm
    getBubbleTeas()
      .then(data => {
        this.bubbleTeas = data;
        this.filteredProducts = this.getHotProducts(this.bubbleTeas);
      })
      .catch(error => {
        console.error('Có lỗi khi lấy dữ liệu sản phẩm:', error);
      });
  },
  methods: {
    getImageUrl(imageName) {
      try {
        return require(`@/assets/images/${imageName}`);
      } catch (error) {
        console.error('Không thể tải ảnh:', error);
        return '';
      }
    },
    getHotProducts(products) {
      return products
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);
    },
    // Phương thức format giá
    formatPrice(price) {
      return price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
    }
  }
};
</script>
