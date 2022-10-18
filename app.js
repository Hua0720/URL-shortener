// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars');

const mongoose = require('mongoose') // 載入 mongoose

const shortenURL = require('../../utilities/shorten')
const makeURL = require('../../models/URL')


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
  // 沒有按下製作鍵只會停留於首頁
  if (!req.body.url) return res.redirect('/')
  // 產生隨機碼
  const shortURL = shortenURL(5)
  makeURL.findOne({ originalUrl: req.body.url })
    .lean()
    // 產生新縮址
    .then(data => data ? data : makeURL.create({
      shortURL, 
      originalUrl: req.body.url
      })
    )
    // 相同網址，產生相同的縮址
    .then(data => res.render('index', {
      origin: req.headers.origin,
      shortURL: data.shortURL
      })
    )
    .catch(err => console.log(err))
})

// 將縮址導回原本網站
app.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  makeURL.findOne({ shortURL })
    .lean()
    // 若找不到資料，印出error.hbs頁面
    .then(data => {
      if (!data) {
        const errorMessage = 'Can not found this URL:'
        const errorURL = req.header.host + '/' + shortURL
        return res.render('error', { errorMessage, errorURL })
      }
    })
})


// 設定 port 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})