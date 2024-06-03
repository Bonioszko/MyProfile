const card = require('../model/card')
const user = require('../model/user')
const utility = require('../helper/utility')
exports.create = async function (req, res) {
  const { userEmail, ...cardData } = req.body
  utility.validate({ userEmail }, ['userEmail'])
  console.log(`⏱️  Creating card for: ${userEmail}`)
  let userDoc = await user.get({ email: userEmail })
  let userId = userDoc.id
  if (!userId) return res.status(400).send({ message: 'No user with that email' })

  cardCreated = await card.create(cardData, userId)
  console.log(`✅ Card created for: ${userEmail}`)
  return res.status(200).send({ message: 'Card succesfully created' })
}
exports.get = async function (req, res) {
  const { cardId } = req.params

  let cardDoc = await card.get(cardId)
  if (!cardDoc) return res.status(400).send({ message: 'No card with that id ' })

  return res.status(200).send({ card: cardDoc })
}
exports.modify = async function (req, res) {
  const cardData = req.body
  const cardId = req.params.cardId
  utility.validate(cardData, [
    'name',
    'email',
    'phone',
    'facebook',
    'twitter',
    'instagram',
    'linkedin',
  ])
  console.log(`⏱️  Updating data for: ${cardId}`)

  let cardUpdated = await card.modify(cardId, cardData)
  if (!cardUpdated) {
    return res.status(404).send({ message: 'Card not found' })
  }
  console.log(`✅ Card: ${cardId} udpated`)
  return res.status(200).send({ message: 'Card updated' })
}
