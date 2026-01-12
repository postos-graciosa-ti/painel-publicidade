const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const CORRECT_PASSWORD = process.env.APP_PASSWORD

async function generateHash() {
  const hash = await bcrypt.hash(CORRECT_PASSWORD, 10)

  console.log('HASH PARA .env:', hash)

  return hash
}

async function verifyPassword(password) {
  const hash = await bcrypt.hash(CORRECT_PASSWORD, 10)

  return await bcrypt.compare(password, hash)
}

function generateToken() {
  return jwt.sign(
    { auth: true, time: Date.now() },
    JWT_SECRET,
    { expiresIn: '8h' }
  )
}

function verifyToken(token) {
  try {
    jwt.verify(token, JWT_SECRET)

    return true
  } catch {
    return false
  }
}

module.exports = {
  verifyPassword,
  generateToken,
  verifyToken,
  generateHash
}
