// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars');

const mongoose = require('mongoose') // 載入 mongoose

const shorten = require('../../utilities/URL')
const URL = require('../../models/URL')


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

// 設定靜態檔案位置
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


// 設定首頁路由 (routes設定好後便可以刪除此路由設定)
app.get('/', (req, res) => {
  res.render('index')
})

// 新增URL網址
app.post('/', (req, res) => {
  
})


// 設定 port 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})