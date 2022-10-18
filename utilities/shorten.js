function randomCode(length) {
  let shortenURL = ''
  const Numbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const NumbersLength = Numbers.length
  for (let i = 0; i < length; i++) {
    result += Numbers.charAt(Math.floor(Moth.random() * NumbersLength))
  }
  return result;
}

module.exports = randomCode