const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const card = require('../model/card')
const { useReducer } = require('react')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  friends: [{ type: String, ref: 'User' }],
  cards: [{ type: String, ref: 'Card' }],
  date_created: Date,
  google_id: { type: String },
})

const User = mongoose.model('User', UserSchema, 'user')

exports.create = async function ({ user, account }) {
  const data = {
    id: uuidv4(),
    name: user.name,
    email: user.email,
    friends: [],
    cards: [],
    date_created: new Date(),
    google_id: user.google_id,
  }

  // encrypt password
  if (user.password) {
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(user.password, salt)
  }

  const newUser = User(data)
  await newUser.save()

  if (data.password) {
    delete data.password
    data.has_password = true
  }

  return data
}

exports.get = async function ({ id, email, social }) {
  let data

  if (social) {
    const cond = {
      [`${social.provider}_id`]: social.id,
    }
    data = await User.findOne({ $or: [{ email: email }, cond] }).lean()
  } else {
    data = await User.findOne({
      ...{
        ...(id && { id: id }),
        ...(email && { email: email }),
      },
    }).lean()
  }

  if (!data) return null

  data.has_password = data.password ? true : false
  delete data.password

  return data
}

exports.verifyPassword = async function ({ id, account, password }) {
  const data = await User.findOne({ id: id, 'account.id': account }).select({
    name: 1,
    email: 1,
    password: 1,
  })

  const verified = data?.password ? await bcrypt.compare(password, data.password) : false

  delete data.password
  return verified ? data : false
}

exports.addCard = async function ({ userId, cardId }) {
  const updatedUser = await User.findOneAndUpdate(
    { id: userId },
    { $push: { cards: cardId } },
    { new: true }
  )
  return updatedUser
}

exports.getAllUserCards = async function (userId) {
  const user = await User.findOne({ id: userId })

  const cardData = await card.get(user.cards[0])
  const x = { ...cardData._doc, user_name: user.name }
  // let cards = await Promise.all(cardPromises)
  // cards[0].user_name = user.name
  // console.log(cards)

  return [x]
}

exports.addFriend = async function ({ userId, friendId }) {
  const result = await User.updateOne({ id: userId }, { $addToSet: { friends: friendId } })
  console.log(result)
  const friend = await User.updateOne({ id: friendId }, { $addToSet: { friends: userId } })
  return result
}

exports.deleteFriend = async function ({ userId, friendId }) {
  await User.updateOne({ id: userId }, { $pull: { friends: friendId } })
  await User.updateOne({ id: friendId }, { $pull: { friends: userId } })
}

exports.getFriends = async function ({ userId }) {
  const result = await User.find({ id: userId }, { friends: 1, _id: 0 })
  return result
}
