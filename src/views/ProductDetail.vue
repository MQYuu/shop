<template>
  <div class="product-detail-page">
    <h1>Chi Tiết Sản Phẩm</h1>
    <div v-if="product">
      <!-- Sử dụng component ProductDetailCard để hiển thị chi tiết sản phẩm -->
      <ProductDetailCard
        :product="product"
        :formattedPrice="formattedPrice"
        :getImageUrl="getImageUrl"
        :addToCartAndRedirect="addToCartAndRedirect"
        :goBackToProducts="goBackToProducts"
      />
    </div>
    <p v-else>Không tìm thấy sản phẩm.</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductDetailCard from '@/components/ProductDetailCard.vue'; // Import component

// API fetch function
import { getBubbleTeas } from '../api/bubbleTea.js';

export default {
  components: {
    ProductDetailCard, // Đăng ký component
  },
  setup() {
    const router = useRouter();
    const productId = ref(null);
    const product = ref(null);

    // Fetch bubble teas when the component is mounted
    onMounted(() => {
      fetchProductDetails();
    });

    // Lấy thông tin sản phẩm chi tiết từ API
    const fetchProductDetails = async () => {
      try {
        const products = await getBubbleTeas();
        const foundProduct = products.find(p => p.id === productId.value);
        if (foundProduct) {
          product.value = foundProduct;
        } else {
          console.error('Sản phẩm không tìm thấy!');
        }
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    };

    // Giả sử sản phẩm có ID = 1
    productId.value = 1; 

    const formattedPrice = computed(() => {
      return product.value ? product.value.price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }) : '';
    });

    const getImageUrl = (imageName) => {
      try {
        return require(`@/assets/images/${imageName}`);
      } catch (error) {
        console.error('Không thể tải ảnh:', error);
        return '';
      }
    };

    const addToCartAndRedirect = (product) => {
      console.log(`Sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`);
      alert(`Sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`);
      router.push('/cart');
    };

    const goBackToProducts = () => {
      router.push('/productslist');
    };

    return {
      product,
      formattedPrice,
      getImageUrl,
      addToCartAndRedirect,
      goBackToProducts,
    };
  },
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
</style>
