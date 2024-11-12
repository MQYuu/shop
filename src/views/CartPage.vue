<template>
  <div class="cart-page">
    <h1>Giỏ Hàng</h1>
    <div v-if="cart.length > 0" class="cart-items">
      <div v-for="(product, index) in cart" :key="product.id" class="cart-item">
        <img :src="getImageUrl(product.image)" alt="Product Image" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ product.name }}</h3>
          <p>{{ formatCurrency(product.price) }}</p>
          <div class="quantity-control">
            <button @click="decreaseQuantity(index)" :disabled="product.quantity <= 1">-</button>
            <span>{{ product.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </div>
          <button class="remove-item" @click="removeFromCart(index)">Xóa</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Tổng tiền: {{ formatCurrency(totalAmount) }}</p>
        <button @click="checkout">Thanh toán</button>
      </div>
    </div>
    <p v-else>Giỏ hàng của bạn trống.</p>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.cartItems; // Lấy giỏ hàng từ Vuex store
    },
    totalAmount() {
      return this.$store.getters.totalAmount; // Tính tổng tiền từ Vuex store
    },
  },
  methods: {
    getImageUrl(imageName) {
      try {
        return require(`@/assets/images/${imageName}`);
      } catch (error) {
        console.error('Không thể tải ảnh:', error);
        return ''; // Trả về chuỗi rỗng nếu không tìm thấy hình ảnh
      }
    },
    increaseQuantity(index) {
      const productId = this.cart[index].id;
      this.$store.commit('updateQuantity', { productId, quantity: this.cart[index].quantity + 1 });
    },
    decreaseQuantity(index) {
      const productId = this.cart[index].id;
      if (this.cart[index].quantity > 1) {
        this.$store.commit('updateQuantity', { productId, quantity: this.cart[index].quantity - 1 });
      }
    },
    removeFromCart(index) {
      this.$store.commit('removeFromCart', index); // Xóa sản phẩm từ giỏ hàng
    },
    checkout() {
      alert('Thanh toán thành công!');
    },
    formatCurrency(price) {
      return price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    },
  },
};
</script>

<style scoped>
p {
  font-size: 1.2em;
  color: #888;
  font-weight: bold;
  margin-top: 30px;
}
.cart-page {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding: 15px;
  background-color: #f9f9f9;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-details {
  flex-grow: 1;
  padding: 0 15px;
}

.cart-item-details h3 {
  font-size: 1.2em;
  color: #444;
}

.cart-item-details p {
  font-size: 1em;
  color: #888;
}

.quantity-control {
  display: flex;
  justify-content: space-between;
  width: 120px;
  margin: 10px 0;
}

.quantity-control button {
  background-color: #ff9f00;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-control button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.remove-item {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.remove-item:hover {
  background-color: #e60000;
}

.cart-summary {
  margin-top: 30px;
  padding: 20px;
  background-color: #f0f8f7;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 1.1em;
  width: 90%;
  text-align: center;
}

.cart-summary p {
  font-size: 1.3em;
  font-weight: bold;
  color: #333;
  margin: 0 0 20px;
}

.cart-summary button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.cart-summary button:hover {
  background-color: #218838;
  box-shadow: 0 4px 10px rgba(33, 136, 56, 0.4);
  transform: translateY(-2px);
}

.cart-summary button:active {
  background-color: #1e7e34;
  transform: translateY(1px);
}
</style>
