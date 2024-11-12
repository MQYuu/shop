<template>
  <div class="admin-user">
    <h2>Quản lý người dùng</h2>

    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Mật khẩu</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.isActive ? 'Hoạt động' : 'Đã khóa' }}</td>
          <td>
            <button @click="editUser(user)">Chỉnh sửa</button>
            <button @click="deactivateUser(user.id)" v-if="user.isActive">Khóa</button>
            <button @click="activateUser(user.id)" v-if="!user.isActive">Kích hoạt</button>
            <button @click="deleteUser(user.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal chỉnh sửa người dùng -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h3>Chỉnh sửa người dùng</h3>
        <label for="edit-email">Email:</label>
        <input v-model="editedUser.email" type="email" id="edit-email" />

        <label for="edit-password">Mật khẩu:</label>
        <input v-model="editedUser.password" type="password" id="edit-password" />

        <button @click="saveUser">Lưu thay đổi</button>
        <button @click="closeEditModal">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsers, updateUser, deactivateUser, activateUser, deleteUser } from '../api/users'; // Import API functions

export default {
  data() {
    return {
      users: [],
      showEditModal: false,
      editedUser: {
        id: '',
        email: '',
        password: '',
      },
    };
  },
  created() {
    this.fetchUsers();  // Gọi API để lấy dữ liệu người dùng khi component được tạo
  },
  methods: {
    // Lấy danh sách người dùng từ API
    async fetchUsers() {
      try {
        const usersData = await getUsers();
        this.users = usersData;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    // Lưu thay đổi sau khi chỉnh sửa người dùng
    async saveUser() {
      try {
        const updatedUserData = {
          email: this.editedUser.email,
          password: this.editedUser.password,
        };
        // Cập nhật thông tin người dùng
        await updateUser(this.editedUser.id, updatedUserData);
        this.fetchUsers();  // Lấy lại danh sách người dùng sau khi cập nhật
        this.closeEditModal();  // Đóng modal sau khi lưu
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    // Đóng modal
    closeEditModal() {
      this.showEditModal = false;
      this.editedUser = { email: '', password: '' };
    },
    // Mở modal chỉnh sửa người dùng
    editUser(user) {
      this.editedUser = { ...user };
      this.showEditModal = true;
    },
    // Khóa tài khoản người dùng
    async deactivateUser(userId) {
      try {
        await deactivateUser(userId);
        this.fetchUsers();  // Lấy lại danh sách người dùng sau khi khóa
      } catch (error) {
        console.error('Error deactivating user:', error);
      }
    },
    // Kích hoạt tài khoản người dùng
    async activateUser(userId) {
      try {
        await activateUser(userId);
        this.fetchUsers();  // Lấy lại danh sách người dùng sau khi kích hoạt
      } catch (error) {
        console.error('Error activating user:', error);
      }
    },
    // Xóa tài khoản người dùng
    async deleteUser(userId) {
      try {
        await deleteUser(userId);
        this.fetchUsers();  // Lấy lại danh sách người dùng sau khi xóa
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
};
</script>

<style scoped>
.admin-user {
    margin: 20px;
    font-family: Arial, sans-serif;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th, td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
    font-size: 1.1em;
}

th {
    background-color: #4CAF50;
    color: white;
}

td {
    background-color: #f9f9f9;
}

.button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s ease, transform 0.2s;
    width: 100%;
    max-width: 150px;
}

button:hover {
    background-color: #45a049;
    transform: scale(1.05);
}

button:active {
    transform: scale(0.98);
}

/* Button Styles with Semantic Class Names */
.btn-primary {
    background-color: #4CAF50;
}

.btn-secondary {
    background-color: #c7daed;
}

.btn-danger {
    background-color: #dc3545;
}

.btn-warning {
    background-color: #ff9f00;
}

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 350px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease;
}

.modal input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
}

.modal button {
    width: 48%;
    margin-top: 10px;
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
}

.modal .btn-primary {
    background-color: #007bff;
}

.modal .btn-danger {
    background-color: #dc3545;
}

/* Animation for modal */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
