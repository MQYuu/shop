<template>
  <div class="admin-product">
    <h2>Quản lý sản phẩm</h2>

    <!-- Form thêm sản phẩm mới -->
    <div class="add-product-form" v-if="!editingProduct">
      <h3>Thêm sản phẩm mới</h3>
      <form @submit.prevent="addProduct">
        <label for="name">Tên sản phẩm:</label>
        <input v-model="newProduct.name" type="text" id="name" required />

        <label for="price">Giá:</label>
        <input v-model="newProduct.price" type="number" id="price" required />

        <label for="description">Mô tả:</label>
        <textarea v-model="newProduct.description" id="description" required></textarea>

        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>

    <!-- Form sửa sản phẩm -->
    <div class="edit-product-form" v-if="editingProduct">
      <h3>Sửa sản phẩm</h3>
      <form @submit.prevent="updateProduct">
        <label for="name">Tên sản phẩm:</label>
        <input v-model="editingProduct.name" type="text" id="name" required />

        <label for="price">Giá:</label>
        <input v-model="editingProduct.price" type="number" id="price" required />

        <label for="description">Mô tả:</label>
        <textarea v-model="editingProduct.description" id="description" required></textarea>

        <button type="submit">Lưu</button>
        <button type="button" @click="cancelEdit">Hủy</button>
      </form>
    </div>

    <!-- Danh sách sản phẩm -->
    <div class="product-list">
      <h3>Danh sách sản phẩm</h3>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td>
              <button @click="editProduct(product)">Sửa</button>
              <button @click="deleteProduct(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getBubbleTeas, addBubbleTea, updateBubbleTea, deleteBubbleTea } from '../api/bubbleTea';

export default {
  name: 'AdminProduct',
  data() {
    return {
      products: [],
      newProduct: { name: '', price: '', description: '' },
      editingProduct: null,
    };
  },
  methods: {
    fetchProducts() {
      getBubbleTeas()
        .then(data => {
          this.products = data;
        })
        .catch(error => {
          console.error('Lỗi khi lấy sản phẩm:', error);
        });
    },

    addProduct() {
      const productData = {
        name: this.newProduct.name,
        price: this.newProduct.price,
        description: this.newProduct.description,
      };

      addBubbleTea(productData)
        .then(() => {
          this.fetchProducts();
          this.newProduct = { name: '', price: '', description: '' };
          this.showSuccessMessage('Thêm sản phẩm thành công!');
        })
        .catch(error => {
          console.error('Lỗi khi thêm sản phẩm:', error);
        });
    },

    showSuccessMessage(message) {
      const successMessage = document.createElement('div');
      successMessage.textContent = message;
      successMessage.style.position = 'fixed';
      successMessage.style.top = '20px';
      successMessage.style.right = '20px';
      successMessage.style.padding = '10px 20px';
      successMessage.style.backgroundColor = 'green';
      successMessage.style.color = 'white';
      successMessage.style.borderRadius = '5px';
      successMessage.style.zIndex = '9999';

      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    },

    editProduct(product) {
      this.editingProduct = { ...product };
    },

    updateProduct() {
      const updatedProductData = {
        name: this.editingProduct.name,
        price: this.editingProduct.price,
        description: this.editingProduct.description,
      };

      updateBubbleTea(this.editingProduct.id, updatedProductData)
        .then(() => {
          this.fetchProducts();
          this.editingProduct = null;
          this.showSuccessMessage('Cập nhật sản phẩm thành công!');
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
        });
    },

    cancelEdit() {
      this.editingProduct = null;
    },

    deleteProduct(id) {
      deleteBubbleTea(id)
        .then(() => {
          this.fetchProducts();
        })
        .catch(error => {
          console.error('Lỗi khi xóa sản phẩm:', error);
        });
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
/* Style cho trang quản lý sản phẩm */
.admin-product {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.add-product-form, .edit-product-form {
  margin-bottom: 30px;
}

form label {
  display: block;
  margin: 5px 0;
}

form input, form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #45a049;
}

.product-list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-list table th, .product-list table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.product-list table th {
  background-color: #f4f4f4;
}

.product-list button {
  padding: 5px 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.product-list button:hover {
  background-color: #e53e36;
}
</style>
