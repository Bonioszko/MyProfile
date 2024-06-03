const mongoose = require('mongoose')
const { factory } = require('typescript')
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid')
const CardSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
})

const Card = mongoose.model('Card', CardSchema, 'user')

exports.create = async function ({ card, userId }) {
  const data = {
    id: uuidv4(),
    name: card.name,
    email: card.email,
    phone: card.phone,
    facebook: card.facebook,
    twitter: card.twitter,
    instagram: card.instagram,
    linkedin: card.linkedin,
  }
  const newCard = Card(data)
  await newCard.save()
  await User.findByIdAndUpdate(userId, { $push: { friends: newCard.id } })

  return newCard
}
