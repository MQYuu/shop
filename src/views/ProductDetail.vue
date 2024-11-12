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
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from 'vue-router';
import ProductDetailCard from "@/components/ProductDetailCard.vue"; // Import component

export default {
  components: {
    ProductDetailCard, // Đăng ký component
  },
  setup() {
    const router = useRouter();
    const products = reactive([
      { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg', description: 'Trà sữa dâu tươi ngon.' },
      { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg', description: 'Trà sữa matcha thơm ngon.' },
      { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
    ]);

    const productId = ref(null);
    const product = ref(null);

    watch(productId, (newProductId) => {
      if (newProductId) {
        product.value = products.find(p => p.id === parseInt(newProductId));
      }
    });

    productId.value = 1;  // Giả sử sản phẩm có ID = 1

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
