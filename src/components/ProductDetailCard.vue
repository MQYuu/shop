<template>
    <div class="product-detail-card">
      <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image" />
      <h3>{{ product.name }}</h3>
      <p>{{ formattedPrice }}</p>
      <p class="description">{{ product.description }}</p>
      <div class="button-container">
        <button @click="addToCartAndRedirect(product)" class="add-to-cart">Thêm vào giỏ hàng</button>
        <button @click="goBackToProducts" class="back-to-products">Quay lại sản phẩm</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object,  // Nhận dữ liệu sản phẩm từ component cha
      formattedPrice: String,  // Giá đã định dạng
      getImageUrl: Function,  // Hàm lấy đường dẫn ảnh
      addToCartAndRedirect: Function,  // Hàm thêm vào giỏ hàng và chuyển hướng
      goBackToProducts: Function  // Hàm quay lại trang sản phẩm
    },
  };
  </script>
  
  <style scoped>
  .product-detail-card {
    text-align: center;
    padding: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-detail-card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 2em;
    color: #333;
    margin: 20px 0;
    font-weight: 600;
  }
  
  p {
    font-size: 1.2em;
    color: #555;
    margin: 10px 0;
    line-height: 1.6;
    text-align: justify;
    max-width: 700px;
    margin: 0 auto;
  }
  
  .description {
    font-style: italic;
    color: #777;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }
  
  button {
    background-color: #ff9f00;
    color: white;
    padding: 15px 35px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.2s ease;
    border: none;
  }
  
  button:hover {
    background-color: #e68900;
    transform: translateY(-2px);
  }
  
  .add-to-cart {
    background-color: #ff9f00;
  }
  
  .add-to-cart:hover {
    background-color: #e68900;
  }
  
  .back-to-products {
    background-color: #ccc;
  }
  
  .back-to-products:hover {
    background-color: #aaa;
  }
  </style>
  