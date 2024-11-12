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
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #45a049;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal button {
  width: 48%;
  margin-top: 10px;
}

.modal button:first-child {
  margin-right: 4%;
}
</style>
