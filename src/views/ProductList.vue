<template>
  <div class="product-detail">
    <h1>Sản Phẩm Của Chúng Tôi</h1>
    <div v-if="products.length > 0" class="product-list">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
    <p v-else>Không có sản phẩm nào.</p>
  </div>
</template>

<script>
import axios from 'axios';
import ProductItem from '../components/ProductItem.vue';

export default {
  components: {
    ProductItem, // Đăng ký component ProductItem
  },
  data() {
    return {
      products: [], // Để trống và sẽ lấy dữ liệu từ JSON Server
    };
  },
  mounted() {
    // Gọi axios để lấy dữ liệu từ JSON Server khi component được tạo ra
    axios.get('http://localhost:3000/bubbleTeas')
      .then(response => {
        this.products = response.data; // Gán dữ liệu nhận được vào `products`
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu sản phẩm:', error);
      });
  },
};
</script>

<style scoped>
.product-detail {
  text-align: center;
  padding: 30px 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-list .product-item {
  margin: 10px;
}
</style>
