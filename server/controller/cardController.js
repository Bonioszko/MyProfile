const card = require('../model/card')
const user = require('../model/user')

exports.create = async function (req, res) {
  const { email, ...cardData } = req.body
  utility.validate({ email }, ['email'])
  console.log(`⏱️  Creating card for: ${email}`)
  let userDoc = await User.findOne({ email }).select('id')
  let userId = userDoc.id
  if (!userId) return res.status(400).send({ message: 'No user with that email' })

  cardData = await card.create(cardData)
  console.log(`✅ Card created for: ${data.email}`)
}
