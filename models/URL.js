const mongoose = require('mongoose')
const Schema = mongoose.Schema //物件建構子

const urlSchema = new Schema({
  shortURL: {
    type: String, 
    required: true,
    unique: true 
  },
  originalURL: {
    type: String,
    required: true 
  },
})

module.exports = mongoose.model('makeURL', urlSchema)