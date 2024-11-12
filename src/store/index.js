import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [], // Lấy giỏ hàng từ localStorage
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Lưu giỏ hàng vào localStorage
    },
    removeFromCart(state, productId) {
      const index = state.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        state.cart.splice(index, 1);
        if (state.cart.length === 0) {
          localStorage.removeItem('cart'); // Xóa giỏ hàng khi trống
        } else {
          localStorage.setItem('cart', JSON.stringify(state.cart)); // Cập nhật giỏ hàng vào localStorage
        }
      }
    },
    updateQuantity(state, { productId, quantity }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Lưu giỏ hàng vào localStorage
    },
  },
  getters: {
    cartItems(state) {
      return state.cart;
    },
    cartCount(state) {
      return state.cart.reduce((total, product) => total + product.quantity, 0);
    },
    totalAmount(state) {
      return state.cart.reduce((total, product) => total + product.price * product.quantity, 0);
    },
  },
});
