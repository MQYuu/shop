<!-- src/views/HomePage.vue -->
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
import ProductItem from '../components/ProductItem.vue';

export default {
  components: {
    ProductItem, // Đăng ký component ProductItem
  },
  data() {
    return {
      products: [
        { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg', description: 'Trà sữa dâu tươi ngon.' },
        { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg', description: 'Trà sữa matcha thơm ngon.' },
        { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        // Các sản phẩm khác...
      ],
    };
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
