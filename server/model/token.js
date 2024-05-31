const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Schema = mongoose.Schema

const TokenSchema = new Schema({
  id: { type: String, required: true, unique: true },
  provider: { type: String, required: true },
  jwt: { type: String },
  access: { type: String },
  user_id: { type: String, required: true },
})

const Token = mongoose.model('Token', TokenSchema, 'token')

exports.save = async function ({ provider, data, user }) {
  // is there already a token for this provider?
  const tokenData = await Token.findOne({ provider: provider, user_id: user })

  // update existing token
  if (tokenData) {
    await Token.findOneAndUpdate({ id: tokenData.id, user_id: user }, data)
  } else {
    // create a new token
    const newToken = Token({
      id: uuidv4(),
      provider: provider,
      jwt: data.jwt,
      user_id: user,
    })

    await newToken.save()
  }

  return data
}

exports.get = async function ({ id, provider, user }) {
  const data = await Token.find({
    user_id: user,
    ...(id && { id: id }),
    ...(provider && { provider: provider }),
  })

  return data
}

exports.verify = async function ({ provider, user }) {
  const data = await Token.find({ user_id: user, provider: provider })
  return data.length ? true : false
}

exports.delete = async function ({ provider, user }) {
  return await Token.deleteMany({
    user_id: user,
    ...(provider && { provider: provider }),
  })
}
