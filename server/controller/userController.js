const authController = require('../controller/authController')
const user = require('../model/user')
const utility = require('../helper/utility')

exports.create = async function (req, res) {
  const data = req.body
  utility.validate(data, ['email', 'name', 'password'])

  console.log(`⏱️  Creating user for: ${data.email}`)

  let userData = await user.get({ email: data.email })
  if (userData) return res.status(400).send({ message: 'This email is already in use' })

  userData = await user.create({ user: data })

  console.log(`✅ User created for: ${data.email}`)

  // authenticate the user
  return await authController.signup(req, res)
}
exports.getCards = async function (req, res) {
  const userEmail = req.params.userEmail
  let userDoc = await user.get({ email: userEmail })
  if (!userDoc) return res.status(400).json({ message: 'No user with that email' })
  let userId = userDoc.id

  console.log(`⏱️ Getting user cards for: ${userEmail}`)

  let userCards = await user.getAllUserCards(userId)

  if (userCards.length === 0)
    return res.status(404).json({ message: 'User does not have any cards' })

  res.status(200).json(userCards)
}
exports.addFriend = async function (req, res) {
  const { requestorEmail, friendEmail } = req.body

  let requestor = await user.get({ email: requestorEmail })
  let friend = await user.get({ email: friendEmail })
  if (!requestor || !friend) return res.status(400).send({ message: 'No user with that email' })
  let requestorId = requestor.id
  let friendId = friend.id
  console.log(`⏱️ Adding friend: ${(requestorEmail, friendEmail)}`)
  let result = await user.addFriend({ userId: requestorId, friendId: friendId })
  if (result.modifiedCount === 0)
    return res.status(200).json({ message: 'Users are already friends' })
  console.log(`✅ Friend added ${(requestorEmail, friendEmail)}`)
  res.status(200).send({ message: 'Friend succesfully added' })
}
exports.getFriendsCards = async function (req, res) {
  const userEmail = req.params.userEmail
  let userDoc = await user.get({ email: userEmail })
  if (!userDoc) return res.status(400).send({ message: 'No user with that email' })
  console.log(userDoc)
  let userId = userDoc.id
  console.log(`⏱️ Getting Friends for: ${userEmail}`)
  let friends = await user.getFriends({ userId: userId })

  if (!friends) return res.status(400).send({ message: 'User does not have any friends' })
  let friendsArray = friends[0].friends
  console.log(`✅ Friends get: ${userEmail}`)
  let allFriendsCards = []
  if (friendsArray.length == 0) {
    return res.status(400).send({ message: 'User does not have any friends' })
  }
  for (let friendId of friendsArray) {
    let friendCards = await user.getAllUserCards(friendId)
    allFriendsCards = allFriendsCards.concat(friendCards)
  }
  console.log(`✅ cards get: ${userEmail}`)
  if (allFriendsCards.length === 0)
    return res.status(400).send({ message: 'Friends do not have any cards' })

  return res.status(200).json({ cards: allFriendsCards })
}
