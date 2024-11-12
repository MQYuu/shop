import axios from 'axios';

const API_URL = 'http://localhost:3000/users';  // URL của API lấy thông tin người dùng

// Lấy thông tin người dùng
export const getUsers = () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching users:', error);
      throw error;
    });
};

// Đăng nhập người dùng
export const loginUser = (email, password) => {
  return axios.get(`${API_URL}?email=${email}&password=${password}`)
    .then(response => {
      if (response.data.length > 0) { // Nếu tìm thấy người dùng
        const user = response.data[0];
        if (user.isActive) {
          return { success: true, user };  // Đăng nhập thành công
        } else {
          throw new Error('Tài khoản bị khóa!');
        }
      } else {
        throw new Error('Email hoặc mật khẩu không đúng!');
      }
    })
    .catch(error => {
      console.error('Error logging in:', error);
      throw error;
    });
};

// Kích hoạt tài khoản người dùng
export const activateUser = (userId) => {
    return axios.get(`${API_URL}/${userId}`)  // Lấy thông tin người dùng trước
      .then(response => {
        const user = response.data;
        // Cập nhật chỉ trạng thái isActive
        return axios.put(`${API_URL}/${userId}`, { 
          ...user,           // Giữ nguyên các thông tin như email, password, id...
          isActive: true     // Chỉ thay đổi trạng thái isActive
        });
      })
      .then(response => response.data)  // Trả về dữ liệu đã được cập nhật
      .catch(error => {
        console.error('Error activating user:', error);
        throw error;
      });
};

// Khóa tài khoản người dùng
export const deactivateUser = (userId) => {
  return axios.get(`${API_URL}/${userId}`)  // Lấy thông tin người dùng trước
    .then(response => {
      const user = response.data;
      // Cập nhật chỉ trạng thái isActive
      return axios.put(`${API_URL}/${userId}`, { 
        ...user,           // Giữ nguyên các thông tin như email, password, id...
        isActive: false    // Chỉ thay đổi trạng thái isActive
      });
    })
    .then(response => response.data)  // Trả về dữ liệu đã được cập nhật
    .catch(error => {
      console.error('Error deactivating user:', error);
      throw error;
    });
};

// Xóa tài khoản người dùng
export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/${userId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting user:', error);
      throw error;
    });
};

// Cập nhật thông tin người dùng (Chỉnh sửa)
export const updateUser = (userId, updatedUserData) => {
  return axios.put(`${API_URL}/${userId}`, updatedUserData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating user:', error);
      throw error;
    });
};
