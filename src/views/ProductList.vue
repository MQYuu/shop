<template>
  <div class="product-detail">
    <h1>Sản Phẩm Của Chúng Tôi</h1>
    <div v-if="products.length > 0" class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price | currency }}</p>
        <!-- Nút thêm vào giỏ hàng, sẽ thêm sản phẩm vào giỏ và chuyển hướng -->
        <button class="add-to-cart" @click="addToCartAndRedirect(product)">Thêm vào giỏ hàng</button>
      </div>
    </div>
    <p v-else>Không có sản phẩm nào.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Danh sách sản phẩm
      products: [
        { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg', description: 'Trà sữa dâu tươi ngon.' },
        { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg', description: 'Trà sữa matcha thơm ngon.' },
        { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 4, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg', description: 'Trà sữa dâu tươi ngon.' },
        { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg', description: 'Trà sữa matcha thơm ngon.' },
        { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 4, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg', description: 'Trà sữa dâu tươi ngon.' },
        { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg', description: 'Trà sữa matcha thơm ngon.' },
        { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 4, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg', description: 'Trà sữa dâu tươi ngon.' },
        { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg', description: 'Trà sữa matcha thơm ngon.' },
        { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 4, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg', description: 'Trà sữa dâu tươi ngon.' },
        { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg', description: 'Trà sữa matcha thơm ngon.' },
        { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        { id: 4, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
      ],
    };
  },
  methods: {
    // Hàm trả về đường dẫn ảnh từ thư mục assets/images
    getImageUrl(imageName) {
      try {
        return require(`@/assets/images/${imageName}`);  // Lấy ảnh từ thư mục images
      } catch (error) {
        console.error('Không thể tải ảnh:', error);
        return ''; // Trả về một chuỗi rỗng nếu không tìm thấy hình ảnh
      }
    },

    // Thêm sản phẩm vào giỏ hàng và chuyển hướng tới trang giỏ hàng
    addToCartAndRedirect(product) {
      // Thêm sản phẩm vào giỏ hàng trong Vuex
      this.$store.commit('addToCart', product);  // Gọi mutation addToCart trong Vuex

      // Thông báo cho người dùng
      alert(`Sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`);

      // Chuyển hướng tới trang giỏ hàng
      this.$router.push('/cart');
    },
  },
};
</script>

<style scoped>
.product-detail {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 30px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.product-item {
  background-color: #fdfdfd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 200px;
  text-align: center;
  padding: 15px;
}

.product-item:hover {
  transform: translateY(-10px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.2em;
  color: #444;
  margin: 5px 0;
}

p {
  font-size: 1em;
  color: #888;
  font-weight: bold;
}

.add-to-cart {
  background-color: #ff9f00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #e68900;
}
</style>
