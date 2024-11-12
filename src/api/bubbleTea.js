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
  const formData = new FormData();
  formData.append('name', newBubbleTea.name);
  formData.append('price', newBubbleTea.price);
  formData.append('description', newBubbleTea.description);
  if (newBubbleTea.image) {
    formData.append('image', newBubbleTea.image); // Thêm hình ảnh vào FormData
  }

  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Lỗi khi thêm bubble tea:', error);
      throw error;
    });
};

// Cập nhật thông tin sản phẩm bubble tea
export const updateBubbleTea = (id, updatedBubbleTea) => {
  const formData = new FormData();
  formData.append('name', updatedBubbleTea.name);
  formData.append('price', updatedBubbleTea.price);
  formData.append('description', updatedBubbleTea.description);
  if (updatedBubbleTea.image) {
    formData.append('image', updatedBubbleTea.image); // Thêm hình ảnh vào FormData
  }

  return axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Lỗi khi cập nhật bubble tea:', error);
      throw error;
    });
};

// Xóa một sản phẩm bubble tea
export const deleteBubbleTea = (id) => {
  return axios.delete(`${API_URL}/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Lỗi khi xóa bubble tea:', error);
      throw error;
    });
};
