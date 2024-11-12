<template>
    <div class="product-item">
      <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      <button @click="goToProductDetail(product.id)">Chi Tiết</button>
      <button class="add-to-cart" @click="addToCartAndRedirect(product)">Thêm vào giỏ hàng</button>
    </div>
  </template>

<style scoped>
button {
  background-color: #ff9f00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #e68900;
}
</style>
  
  <script>
  
  export default {
    props: {
      product: Object, // Nhận dữ liệu sản phẩm từ component cha
    },
    methods: {
      // Hàm trả về đường dẫn ảnh từ thư mục assets/images
      getImageUrl(imageName) {
        try {
          return require(`@/assets/images/${imageName}`);
        } catch (error) {
          console.error('Không thể tải ảnh:', error);
          return ''; // Trả về một chuỗi rỗng nếu không tìm thấy hình ảnh
        }
      },
  
      // Điều hướng đến trang chi tiết sản phẩm
      goToProductDetail(productId) {
        this.$router.push({ name: 'ProductDetail', params: { id: productId } });
      },
  
      // Thêm sản phẩm vào giỏ hàng và chuyển hướng tới trang giỏ hàng
      addToCartAndRedirect(product) {
        if (!localStorage.getItem('userLoggedIn')) {
          // Nếu người dùng chưa đăng nhập, yêu cầu đăng nhập
          alert('Bạn chưa đăng nhập. Vui lòng đăng nhập trước khi thêm vào giỏ hàng.');
          this.$router.push({ name: 'LoginPage' });  // Chuyển hướng đến trang đăng nhập
        } else {
          // Nếu đã đăng nhập, thêm sản phẩm vào giỏ hàng và chuyển hướng đến giỏ hàng
          this.$store.commit('addToCart', product);  // Gọi mutation addToCart trong Vuex
          alert(`Sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`);
          this.$router.push('/cart'); // Chuyển hướng đến trang giỏ hàng
        }
      },
    },
  };
  </script>
  
