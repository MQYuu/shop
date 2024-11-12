<template>
  <div class="product-detail">
    <h1>Sản Phẩm Của Chúng Tôi</h1>

    <!-- Thanh tìm kiếm và lọc -->
    <div class="filters">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Tìm kiếm sản phẩm..." 
        class="search-input"
      />
      <button @click="searchProducts" class="search-button">Tìm kiếm</button>
      <div class="filters-group">
        <label for="price-filter">Lọc theo giá:</label>
        <select v-model="selectedPrice" id="price-filter" class="filter-select">
          <option value="">Tất cả</option>
          <option value="low">Dưới 20,000 VND</option>
          <option value="medium">Từ 20,000 VND đến 50,000 VND</option>
          <option value="high">Trên 50,000 VND</option>
        </select>
      </div>
    </div>

    <!-- Hiển thị danh sách sản phẩm sau khi lọc và tìm kiếm -->
    <div v-if="filteredProducts.length > 0" class="product-list">
      <ProductItem v-for="product in paginatedProducts" :key="product.id" :product="product" />
    </div>
    <p v-else>Không có sản phẩm nào.</p>

    <!-- Phân trang -->
    <div class="pagination">
      <button 
        @click="changePage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        Trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button 
        @click="changePage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="pagination-button"
      >
        Sau
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  text-align: center;
  padding: 30px 20px;
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 20px;
}

.search-input {
  padding: 12px;
  width: 250px;
  font-size: 1.1em;
  border: 2px solid #ff6347;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #e53e3e;
  box-shadow: 0 0 5px rgba(255, 99, 71, 0.5);
}

.search-button {
  padding: 12px 25px;
  font-size: 1.1em;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  min-width: 150px;
}

.search-button:hover {
  background-color: #e53e3e;
  transform: translateY(-3px);
}

.search-button:active {
  transform: translateY(2px);
}

.filters-group {
  display: flex;
  gap: 15px;
  align-items: center;
}

.filter-select {
  padding: 10px;
  font-size: 1.1em;
  border: 2px solid #ff6347;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.filter-select:hover {
  border-color: #e53e3e;
}

.filter-select:focus {
  border-color: #e53e3e;
  box-shadow: 0 0 5px rgba(255, 99, 71, 0.5);
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>

<script>
import { getBubbleTeas } from '../api/bubbleTea.js';
import ProductItem from '../components/ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [], // Dữ liệu sản phẩm từ API
      searchQuery: '', // Giá trị tìm kiếm
      selectedPrice: '', // Lựa chọn lọc theo giá
      currentPage: 1, // Trang hiện tại
      productsPerPage: 10, // Số sản phẩm mỗi trang
    };
  },
  computed: {
    // Hàm lọc sản phẩm dựa trên tìm kiếm và giá
    filteredProducts() {
      return this.products
        .filter(product => {
          return (
            product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
            (this.selectedPrice ? this.filterByPrice(product) : true)
          );
        });
    },
    // Sản phẩm sẽ được phân trang
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
    // Tổng số trang
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.productsPerPage);
    }
  },
  methods: {
    // Hàm xử lý tìm kiếm
    searchProducts() {
      console.log("Đang tìm kiếm sản phẩm với từ khóa:", this.searchQuery);
      this.currentPage = 1; // Reset lại trang khi tìm kiếm mới
    },
    // Lọc sản phẩm theo giá
    filterByPrice(product) {
      if (this.selectedPrice === 'low') {
        return product.price < 20000;
      } else if (this.selectedPrice === 'medium') {
        return product.price >= 20000 && product.price <= 50000;
      } else if (this.selectedPrice === 'high') {
        return product.price > 50000;
      }
      return true;
    },
    // Thay đổi trang
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  },
  mounted() {
    // Gọi getBubbleTeas() từ api.js khi component được tạo ra
    getBubbleTeas()
      .then(data => {
        this.products = data; // Gán dữ liệu nhận được vào `products`
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu sản phẩm:', error);
      });
  },
};
</script>
