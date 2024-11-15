import axios from 'axios';

const API_URL = 'http://localhost:3000/bubbleTeas';

// Lấy danh sách tất cả các sản phẩm bubble tea
export const getBubbleTeas = () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Lỗi khi lấy danh sách bubble tea:', error);
      throw error;
    });
};

// Thêm một sản phẩm bubble tea mới
export const addBubbleTea = (newBubbleTea) => {
  const data = {
    name: newBubbleTea.name,
    price: newBubbleTea.price,
    description: newBubbleTea.description,
  };

  return axios.post(API_URL, data)
    .then(response => response.data)
    .catch(error => {
      console.error('Lỗi khi thêm bubble tea:', error);
      throw error;
    });
};

// Cập nhật thông tin sản phẩm bubble tea
export const updateBubbleTea = (id, updatedBubbleTea) => {
  const data = {
    name: updatedBubbleTea.name,
    price: updatedBubbleTea.price,
    description: updatedBubbleTea.description,
  };

  return axios.put(`${API_URL}/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error('Lỗi khi cập nhật bubble tea:', error);
      throw error;
    });
};

// Xóa một sản phẩm bubble tea
export const deleteBubbleTea = (id) => {
  return axios.delete(`${API_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Lỗi khi xóa bubble tea:', error);
      throw error;
    });
};
