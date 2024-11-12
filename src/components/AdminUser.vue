<template>
    <div class="admin-user">
      <h2>Quản lý người dùng</h2>
  
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Mật khẩu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td>
              <button @click="editUser(user)">Chỉnh sửa</button>
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
  export default {
    data() {
      return {
        users: [
          { id: 1, email: 'user1@example.com', password: 'password123' },
          { id: 2, email: 'user2@example.com', password: 'password456' },
          { id: 3, email: 'user3@example.com', password: 'password789' },
        ],
        showEditModal: false,
        editedUser: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      editUser(user) {
        this.editedUser = { ...user };
        this.showEditModal = true;
      },
      saveUser() {
        const index = this.users.findIndex((user) => user.id === this.editedUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.editedUser };
        }
        this.closeEditModal();
      },
      deleteUser(userId) {
        this.users = this.users.filter((user) => user.id !== userId);
      },
      closeEditModal() {
        this.showEditModal = false;
        this.editedUser = { email: '', password: '' };
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
    background-color: #4CAF50;
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
  