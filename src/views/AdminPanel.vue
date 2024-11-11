<template>
  <div class="admin-panel">
    <h1>Admin Panel</h1>
    <div>
      <h2>Manage Products</h2>
      <button @click="addProduct">Add New Product</button>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ formatCurrency(product.price) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data() {
    return {
      products: [
        { id: 1, name: 'Bubble Tea', price: 50000 },
        { id: 2, name: 'Milk Tea', price: 35000 }
      ]
    };
  },
  methods: {
    addProduct() {
      this.products.push({ id: 3, name: 'Fruit Tea', price: 45000 });
    },
    formatCurrency(value) {
      return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
  }
};
</script>

<style scoped>
/* Styles here */
</style>
