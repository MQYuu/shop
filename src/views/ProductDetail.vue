<template>
    <div class="product-detail" v-if="product">
      <h1>{{ product.name }}</h1>
      <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image" />
      <p>{{ product.description }}</p>
      <p>{{ product.price | currency }}</p>
      <button @click="addToCart(product)">Thêm vào giỏ hàng</button>
    </div>
    <p v-else>Không tìm thấy sản phẩm.</p>
  </template>
  
  <script>
  export default {
    props: ['id'], // Nhận id từ router
    data() {
      return {
        product: null, // Sản phẩm chi tiết
        products: [
          { id: 1, name: 'Trà Sữa Dâu', price: 30000, image: 'hinh-anh-tra-sua-1.jpg', description: 'Trà sữa dâu tươi ngon.' },
          { id: 2, name: 'Trà Sữa Matcha', price: 25000, image: 'R.jpg', description: 'Trà sữa matcha thơm ngon.' },
          { id: 3, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
          { id: 4, name: 'Trà Sữa Nướng', price: 28000, image: 'tra-sua-nuong-1.png', description: 'Trà sữa nướng đậm đà.' },
        ]
      };
    },
    created() {
      this.fetchProductDetail();
    },
    methods: {
      fetchProductDetail() {
        this.product = this.products.find(p => p.id === parseInt(this.id)); // Tìm sản phẩm theo ID
      },
      getImageUrl(imageName) {
        try {
          return require(`@/assets/images/${imageName}`);
        } catch (error) {
          console.error('Không thể tải ảnh:', error);
          return ''; // Trả về chuỗi rỗng nếu không tìm thấy ảnh
        }
      },
      addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-detail {
    text-align: center;
    padding: 20px;
  }
  
  .product-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  button {
    background-color: #ff9f00;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e68900;
  }
  </style>
  