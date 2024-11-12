const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware để phân tích dữ liệu JSON
app.use(express.json());

// Hàm đọc file JSON
const readJSONFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
};

// Route mặc định cho '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Bubble Tea API!');
});

// Endpoint lấy danh sách sản phẩm
app.get('/api/products', async (req, res) => {
  try {
    // Tạo đường dẫn tuyệt đối đến file JSON của sản phẩm
    const productsPath = path.resolve(__dirname, '..', 'database', 'product.json');
    console.log('Products path:', productsPath);  // Xem đường dẫn được tạo ra
    const products = await readJSONFile(productsPath);
    res.json(products);
  } catch (err) {
    console.error('Error reading products data:', err);
    res.status(500).send('Error reading products data');
  }
});

// Endpoint lấy danh sách người dùng
app.get('/api/users', async (req, res) => {
  try {
    // Tạo đường dẫn tuyệt đối đến file JSON của người dùng
    const usersPath = path.resolve(__dirname, '..', 'database', 'users.json');
    console.log('Users path:', usersPath);  // Xem đường dẫn được tạo ra
    const users = await readJSONFile(usersPath);
    res.json(users);
  } catch (err) {
    console.error('Error reading users data:', err);
    res.status(500).send('Error reading users data');
  }
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
