import axios from 'axios';

const API_URL = 'http://localhost:3000/bubbleTeas';

// Lấy danh sách tất cả các sản phẩm bubble tea
export const getBubbleTeas = () => {
  return axios.get(API_URL)
    .then(response => response.data) // Trả về dữ liệu sau khi lấy thành công
    .catch(error => {
      console.error('Lỗi khi lấy danh sách bubble tea:', error); // In ra lỗi nếu có
      throw error;
    });
};

// Thêm một sản phẩm bubble tea mới (hỗ trợ hình ảnh)
export const addBubbleTea = (newBubbleTea, imageFile) => {
  const formData = new FormData();
  formData.append('name', newBubbleTea.name); // Thêm tên sản phẩm
  formData.append('price', newBubbleTea.price); // Thêm giá sản phẩm
  formData.append('description', newBubbleTea.description); // Thêm mô tả sản phẩm

  if (imageFile) {
    formData.append('image', imageFile); // Thêm hình ảnh vào form data nếu có
  }

  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Xác định rằng dữ liệu gửi đi là loại multipart (hình ảnh, file)
    }
  })
    .then(response => {
      console.log('Thêm sản phẩm thành công:', response.data); // Log dữ liệu trả về từ server
      return response.data; // Trả về dữ liệu sản phẩm đã thêm
    })
    .catch(error => {
      console.error('Lỗi khi thêm bubble tea:', error); // In ra lỗi nếu có
      throw error; // Ném lỗi để có thể xử lý ở nơi khác
    });
};

// Cập nhật thông tin sản phẩm bubble tea (hỗ trợ hình ảnh)
export const updateBubbleTea = (id, updatedBubbleTea, imageFile) => {
  const formData = new FormData();
  formData.append('name', updatedBubbleTea.name); // Cập nhật tên sản phẩm
  formData.append('price', updatedBubbleTea.price); // Cập nhật giá sản phẩm
  formData.append('description', updatedBubbleTea.description); // Cập nhật mô tả sản phẩm

  if (imageFile) {
    formData.append('image', imageFile); // Thêm hình ảnh vào form data nếu có
  }

  return axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Xác định dữ liệu gửi đi là loại multipart
    }
  })
    .then(response => {
      console.log('Cập nhật sản phẩm thành công:', response.data); // Log thông báo cập nhật thành công
      return response.data; // Trả về dữ liệu đã cập nhật
    })
    .catch(error => {
      console.error('Lỗi khi cập nhật bubble tea:', error); // In ra lỗi nếu có
      throw error; // Ném lỗi để xử lý ở nơi khác
    });
};

// Xóa một sản phẩm bubble tea
export const deleteBubbleTea = (id) => {
  return axios.delete(`${API_URL}/${id}`)
    .then(response => {
      console.log('Xóa sản phẩm thành công:', response.data); // Log thông báo xóa thành công
      return response.data; // Trả về dữ liệu sau khi xóa
    })
    .catch(error => {
      console.error('Lỗi khi xóa bubble tea:', error); // In ra lỗi nếu có
      throw error; // Ném lỗi để xử lý ở nơi khác
    });
};
