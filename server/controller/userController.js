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
