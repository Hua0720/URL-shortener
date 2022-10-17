// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars');

const mongoose = require('mongoose') // 載入 mongoose


const app = express()
const PORT = 3000

// *使用 mongoose.connect 去連線 process.env 眾多環境變數之中的 MONGODB_URI 這項環境變數的資訊
// *(process.env，是指 Node.js 環境變數的界面)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 指定樣板引擎指定為 Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


// 設定首頁路由 (routes設定好後便可以刪除此路由設定)
app.get('/', (req, res) => {
  res.render('123')
  // Todo.find() // 取出 Todo model 裡的所有資料
  //   .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  //   .sort({ _id: 'asc' }) // 根據 _id 升冪排序
  //   .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
  //   .catch(error => console.error(error)) // 錯誤處理
})


// 設定 port 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})