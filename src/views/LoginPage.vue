<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Nhập email"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit" class="login-btn">Đăng nhập</button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/api/users';  // Import API loginUser

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Gửi thông tin đăng nhập tới API
        const response = await loginUser(this.email, this.password);
        
        if (response.success) {
          // Lưu thông tin người dùng vào localStorage
          localStorage.setItem('userLoggedIn', true);
          localStorage.setItem('userEmail', response.user.email);  // Lưu email người dùng
          this.$router.push({ name: 'Home' });  // Chuyển đến trang chủ
        }
      } catch (error) {
        this.errorMessage = error.message;  // Hiển thị lỗi nếu có
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.login-card {
  background-color: #fff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.1em;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1.1em;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

input:focus {
  border-color: #ff9f00;
  outline: none;
}

.login-btn {
  background-color: #ff9f00;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  width: 100%;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #e68900;
}

.error-message {
  color: red;
  margin-top: 15px;
  font-size: 1em;
}

.sign-up-link {
  margin-top: 20px;
  font-size: 1em;
  color: #555;
}

.sign-up-link a {
  color: #ff9f00;
  text-decoration: none;
}

.sign-up-link a:hover {
  text-decoration: underline;
}
</style>
