<template>
  <div class="cart-page">
    <h1>Giỏ Hàng</h1>
    <div v-if="cart.length > 0" class="cart-items">
      <div v-for="(product, index) in cart" :key="product.id" class="cart-item">
        <img :src="getImageUrl(product.image)" alt="Product Image" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price | currency }}</p>
          <div class="quantity-control">
            <button @click="decreaseQuantity(index)" :disabled="product.quantity <= 1">-</button>
            <span>{{ product.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </div>
          <button class="remove-item" @click="removeFromCart(index)">Xóa</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Tổng tiền: {{ totalAmount | currency }}</p>
        <button @click="checkout">Thanh toán</button>
      </div>
    </div>
    <p v-else>Giỏ hàng của bạn trống.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || [], // Lấy giỏ hàng từ localStorage
    };
  },
  computed: {
    totalAmount() {
      return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
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
      this.cart[index].quantity++;
      this.updateCart();
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.updateCart();
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart)); // Cập nhật giỏ hàng trong localStorage
    },
    checkout() {
      // Logic thanh toán sẽ được thực hiện ở đây, có thể điều hướng đến trang thanh toán.
      alert('Thanh toán thành công!');
    },
  },
};
</script>

<style scoped>
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
  margin-top: 20px;
  font-size: 1.2em;
}

.cart-summary button {
  background-color: #00cc66;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
