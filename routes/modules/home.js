// 引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()

// 引用 utilities 的 shorten
const shortenURL = require('../../utilities/shorten')
// 引用 URL model
const makeURL = require('../../models/URL')

// 設定首頁路由 (routes設定好後便可以刪除此路由設定)
router.get('/', (req, res) => {
  res.render('index')
})

// 新增URL網址
router.post('/', (req, res) => {
  // 沒有按下製作鍵只會停留於首頁
  // if (!req.body.url) return res.redirect('/')
  // 產生隨機碼
  const shortURL = shortenURL(5)
  const originalURL = req.body.originalURL
  const origin = req.headers.host
  makeURL.findOne({ originalURL })
    .lean()
    // 產生新縮址
    .then(data => data ? data : makeURL.create({ originalURL, shortURL }))
    // 相同網址，產生相同的縮址
    .then(data => res.render('index', { originalURL, shortURL: data.shortURL, origin }))
    .catch(err => console.log(err))
})

// 將縮址導回原本網站
router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  makeURL.findOne({ shortURL })
    .lean()
    // 若找不到資料，印出error.hbs頁面
    .then(data => {
      if (!data) {
        const errorMessage = 'Can not found this URL:'
        const errorURL = req.header.host + '/' + shortURL
        return res.render('error', { errorMessage, errorURL })
      }
      // 找到資料，導回原URL
      res.redirect(data.originalURL)
    })
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router