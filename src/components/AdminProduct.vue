<template>
  <div class="admin-product">
    <h2>Quản lý sản phẩm</h2>

    <!-- Form thêm sản phẩm mới -->
    <div class="add-product-form">
      <h3>Thêm sản phẩm mới</h3>
      <form @submit.prevent="addProduct">
        <label for="name">Tên sản phẩm:</label>
        <input v-model="newProduct.name" type="text" id="name" required />

        <label for="price">Giá:</label>
        <input v-model="newProduct.price" type="number" id="price" required />

        <label for="description">Mô tả:</label>
        <textarea v-model="newProduct.description" id="description" required></textarea>

        <!-- Trường hình ảnh -->
        <label for="image">Hình ảnh:</label>
        <input type="file" id="image" @change="handleImageUpload" required />

        <!-- Hiển thị ảnh đã chọn -->
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Image Preview" />
        </div>

        <button type="submit">Thêm sản phẩm</button>
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
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td><img :src="product.image" alt="Product Image" width="50" height="50" /></td>
            <td>
              <button @click="editProduct(product)">Sửa</button>
              <button @click="deleteProduct(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form chỉnh sửa sản phẩm -->
    <div v-if="editingProduct" class="edit-product-form">
      <h3>Chỉnh sửa sản phẩm</h3>
      <form @submit.prevent="updateProduct">
        <label for="edit-name">Tên sản phẩm:</label>
        <input v-model="editingProduct.name" type="text" id="edit-name" required />

        <label for="edit-price">Giá:</label>
        <input v-model="editingProduct.price" type="number" id="edit-price" required />

        <label for="edit-description">Mô tả:</label>
        <textarea v-model="editingProduct.description" id="edit-description" required></textarea>

        <label for="edit-image">Hình ảnh:</label>
        <input type="file" id="edit-image" @change="handleEditImageUpload" />

        <div v-if="editImagePreview" class="image-preview">
          <img :src="editImagePreview" alt="Edit Image Preview" />
        </div>

        <button type="submit">Cập nhật sản phẩm</button>
        <button type="button" @click="cancelEdit">Hủy</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getBubbleTeas, addBubbleTea, updateBubbleTea, deleteBubbleTea } from '../api/bubbleTea'; // Import các API

export default {
  name: 'AdminProduct',
  data() {
    return {
      products: [], // Danh sách sản phẩm
      newProduct: { name: '', price: '', description: '', image: '' }, // Dữ liệu cho sản phẩm mới
      editingProduct: null, // Sản phẩm đang được chỉnh sửa
      imagePreview: null, // Preview hình ảnh cho sản phẩm mới
      editImagePreview: null, // Preview hình ảnh cho sản phẩm đang chỉnh sửa
      imageFile: null, // Dữ liệu file hình ảnh cho sản phẩm mới
      editImageFile: null, // Dữ liệu file hình ảnh cho sản phẩm đang chỉnh sửa
    };
  },
  methods: {
    // Lấy danh sách sản phẩm
    fetchProducts() {
      getBubbleTeas()
        .then(data => {
          this.products = data;
        })
        .catch(error => {
          console.error('Lỗi khi lấy sản phẩm:', error);
        });
    },

    // Thêm sản phẩm mới
    addProduct() {
      const formData = new FormData();
      formData.append('name', this.newProduct.name);
      formData.append('price', this.newProduct.price);
      formData.append('description', this.newProduct.description);
      formData.append('image', this.imageFile); // Thêm hình ảnh vào form data

      addBubbleTea(formData)
        .then(() => {
          this.fetchProducts(); // Cập nhật lại danh sách sản phẩm
          this.newProduct = { name: '', price: '', description: '', image: '' }; // Reset form
          this.imagePreview = null; // Reset preview
          this.showSuccessMessage('Thêm sản phẩm thành công!'); // Hiển thị thông báo thành công
        })
        .catch(error => {
          console.error('Lỗi khi thêm sản phẩm:', error);
        });
    },

    // Hiển thị thông báo thành công
    showSuccessMessage(message) {
      // Tạo thông báo
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
      
      // Hiển thị thông báo trong 3 giây
      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    },

    // Chọn hình ảnh và hiển thị preview
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file); // Hiển thị preview
      }
    },

    // Sửa sản phẩm
    editProduct(product) {
      this.editingProduct = { ...product }; // Sao chép thông tin sản phẩm để chỉnh sửa
    },

    // Cập nhật sản phẩm
    updateProduct() {
      const formData = new FormData();
      formData.append('name', this.editingProduct.name);
      formData.append('price', this.editingProduct.price);
      formData.append('description', this.editingProduct.description);
      if (this.editImageFile) {
        formData.append('image', this.editImageFile); // Thêm hình ảnh nếu có thay đổi
      }

      updateBubbleTea(this.editingProduct.id, formData)
        .then(() => {
          this.fetchProducts(); // Cập nhật lại danh sách sản phẩm
          this.editingProduct = null; // Dừng chỉnh sửa
          this.editImagePreview = null; // Reset preview
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
        });
    },

    // Hủy chỉnh sửa
    cancelEdit() {
      this.editingProduct = null;
      this.editImagePreview = null;
    },

    // Xóa sản phẩm
    deleteProduct(id) {
      deleteBubbleTea(id)
        .then(() => {
          this.fetchProducts(); // Cập nhật lại danh sách sản phẩm
        })
        .catch(error => {
          console.error('Lỗi khi xóa sản phẩm:', error);
        });
    },

    // Chọn hình ảnh khi chỉnh sửa
    handleEditImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.editImageFile = file;
        this.editImagePreview = URL.createObjectURL(file); // Hiển thị preview
      }
    },
  },
  mounted() {
    this.fetchProducts(); // Lấy danh sách sản phẩm khi trang được tải
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

.image-preview {
  margin-top: 10px;
}

.image-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
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

.product-list table td img {
  width: 50px;
  height: 50px;
  object-fit: cover;
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
