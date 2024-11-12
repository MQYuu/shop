<template>
  <div class="product-detail-page">
    <h1>Chi Tiết Sản Phẩm</h1>
    
    <!-- Card hiển thị chi tiết sản phẩm -->
    <ProductDetailCard
      v-if="product"
      :product="product"
      :formattedPrice="formattedPrice"
      :getImageUrl="getImageUrl"
      :addToCartAndRedirect="addToCartAndRedirect"
      :goBackToProducts="goBackToProducts"
    />
    <p v-else>Đang tải sản phẩm...</p>
  </div>
</template>

<script>
import ProductDetailCard from '../components/ProductDetailCard.vue';
import { getBubbleTeas } from '../api/bubbleTea.js';

export default {
  components: {
    ProductDetailCard
  },
  data() {
    return {
      product: null,
      formattedPrice: '',
    };
  },
  methods: {
    // Fetch dữ liệu sản phẩm
    fetchProduct() {
      const productId = this.$route.params.id;

      getBubbleTeas()
        .then(data => {
          this.product = data.find(p => p.id === productId);
          if (this.product) {
            this.formatPrice();
          } else {
            console.error('Không tìm thấy sản phẩm');
          }
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        });
    },
    
    // Định dạng giá
    formatPrice() {
      if (this.product) {
        this.formattedPrice = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(this.product.price);
      }
    },

    // Lấy URL ảnh từ thư mục assets
    getImageUrl(imageName) {
      try {
        return require(`@/assets/images/${imageName}`);
      } catch (error) {
        console.error('Không thể tải ảnh:', error);
        return '';
      }
    },

    // Thêm sản phẩm vào giỏ hàng và chuyển hướng đến trang giỏ hàng
    addToCartAndRedirect(product) {
      this.$store.commit('addToCart', product); // Gọi mutation addToCart
      console.log('Thêm vào giỏ hàng:', product);

      // Điều hướng đến trang giỏ hàng
      this.$router.push('/cart');
    },

    // Quay lại trang danh sách sản phẩm
    goBackToProducts() {
      this.$router.push('/productslist');
    }
  },
  mounted() {
    this.fetchProduct();
  }
};
</script>

<style scoped>
.product-detail-page {
  text-align: center;
  padding: 30px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.login-prompt {
  margin-top: 20px;
  font-size: 1.2em;
  color: #ff0000;
}

.login-prompt a {
  color: #007bff;
  text-decoration: none;
}
</style>