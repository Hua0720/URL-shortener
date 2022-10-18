// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars');

const routes = require('./routes')// 引用路由器
require("./config/mongoose") // 引用mongoose

const app = express()
const PORT = 3000 // 設定預設port

// 指定樣板引擎指定為 Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定靜態檔案位置
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))





// 設定 port 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})