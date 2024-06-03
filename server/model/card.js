const mongoose = require('mongoose')

const user = require('../model/user')
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

const Card = mongoose.model('Card', CardSchema, 'card')

exports.create = async function (cardData, userId) {
  const data = {
    id: uuidv4(),
    name: cardData?.name ?? '',
    email: cardData?.email ?? '',
    phone: cardData?.phone ?? '',
    facebook: cardData?.facebook ?? '',
    twitter: cardData?.twitter ?? '',
    instagram: cardData?.instagram ?? '',
    linkedin: cardData?.linkedin ?? '',
  }
  const newCard = Card(data)
  await newCard.save()
  await user.addCard({ userId: userId, cardId: newCard.id })

  console.log(`✅ Card created for: ${data.email}`)

  return newCard
}
exports.modify = async function (cardId, cardData) {
  const updatedCard = await Card.findOneAndUpdate({ id: cardId }, { $set: cardData }, { new: true })
  return updatedCard
}

exports.get = async function (cardId) {
  const cardData = await Card.findOne({ id: cardId })

  return cardData
}
