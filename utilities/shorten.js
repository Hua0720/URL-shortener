function randomCode(length) {
  let shortenURL = ''
  const Numbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const NumbersLength = Numbers.length
  for (let i = 0; i < length; i++) {
    shortenURL += Numbers.charAt(Math.floor(Math.random() * NumbersLength))
  }
  return shortenURL;
}

module.exports = randomCode