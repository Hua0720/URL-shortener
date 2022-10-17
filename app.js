// 載入 express 並建構應用程式伺服器
const express = require('express')

const app = express()
const PORT = 3000

// 設定首頁路由 (routes設定好後便可以刪除此路由設定)
app.get('/', (req, res) => {
  res.send('123')
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