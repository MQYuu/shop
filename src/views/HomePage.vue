<template>
  <div>
    <!-- Hiển thị danh sách sản phẩm -->
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
import '../components/ProductList.css';
export default {
  data() {
    return {
      // Mảng sản phẩm bao gồm tên, giá và tên ảnh (không cần đường dẫn đầy đủ)
      products: [
        { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg' },
        { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg' },
        { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png' },
        { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg' },
        { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg' },
        
      ],
      filteredProducts: [],
    };
  },
  created() {
    // Giả sử lọc sản phẩm nổi bật (có thể thêm điều kiện lọc)
    this.filteredProducts = this.products.filter(product => product.price >= 25000);
  },
  methods: {
    // Hàm trả về đường dẫn ảnh từ thư mục assets/images
    getImageUrl(imageName) {
      try {
        return require(`@/assets/images/${imageName}`);
      } catch (error) {
        console.error('Không thể tải ảnh:', error);
        return ''; // Trả về một chuỗi rỗng nếu không tìm thấy hình ảnh
      }
    },
  },
};
</script>

<style scoped>

/* .product-list {
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
} */

h1 {
  text-align: center;
  font-size: 2em;
  color: #333;
  margin-bottom: 30px;
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
</style>
