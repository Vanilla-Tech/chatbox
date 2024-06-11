const crypto = require('crypto')

const aesWrapper = {}
function base64ToBuffer(base64) {
  var binstr = atob(base64)
  var buf = new Uint8Array(binstr.length)
  Array.prototype.forEach.call(binstr, function(ch, i) {
    buf[i] = ch.charCodeAt(0)
  })
  return buf
}

function bufferToBase64(buf) {
  var binstr = Array.prototype.map
    .call(buf, function(ch) {
      return String.fromCharCode(ch)
    })
    .join('')
  return btoa(binstr)
}

// get list of supportable encryption algorithms
aesWrapper.getAlgorithmList = () => {}

aesWrapper.getKey = () => {
  return Buffer.from('TWVyY2hhbnRyYWRlTW9uZXlDaGF0IUAjJF4pKComIUA=', 'base64')
  //return crypto.randomBytes(32);
}
var aesKey = Buffer.from(
  'TWVyY2hhbnRyYWRlTW9uZXlDaGF0IUAjJF4pKComIUA=',
  'base64'
)

aesWrapper.generateIv = () => {
  //return crypto.randomBytes(16)
  var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 16; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   // return btoa(result);
     var buff = new Buffer(result)
 return buff;
}

// separate initialization vector from message
aesWrapper.separateVectorFromData = data => {
  var iv = data.slice(-24)
  var message = data.substring(0, data.length - 24)

  return {
    iv: iv,
    message: message
  }
}

aesWrapper.encrypt = (key, iv, text) => {
  let encrypted = ''
  let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  encrypted += cipher.update(Buffer.from(text), 'utf8', 'base64')
  encrypted += cipher.final('base64')

  return encrypted
}

aesWrapper.decrypt = text => {
  try {
    let dec = ''
    let data = aesWrapper.separateVectorFromData(text)
    let cipher = crypto.createDecipheriv(
      'aes-256-cbc',
      aesKey,
      Buffer.from(data.iv, 'base64')
    )
    dec += cipher.update(Buffer.from(data.message, 'base64'), 'base64', 'utf8')
    dec += cipher.final('utf8')

    return dec
  } catch (error) {
    return ''
  }
}

// add initialization vector to message
aesWrapper.addIvToBody = (iv, encryptedBase64) => {
  encryptedBase64 += iv.toString('base64')

  return encryptedBase64
}

aesWrapper.createAesMessage = message => {
  let aesIv = aesWrapper.generateIv()
  let encryptedMessage = aesWrapper.encrypt(aesKey, aesIv, message)
  encryptedMessage = aesWrapper.addIvToBody(aesIv, encryptedMessage)

  return encryptedMessage
}

module.exports = aesWrapper
