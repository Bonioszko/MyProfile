const auth = require('../model/auth')
const user = require('../model/user')
const token = require('../model/token')
const utility = require('../helper/utility')

exports.signin = async function (req, res, next) {
  const data = req.body
  let userData,
    useEmail = false // determine if flow is email or social

  if (data.email) {
    useEmail = true
    data.provider = 'app'
    utility.validate(data, ['email', 'password'])
  } else {
    utility.validate(data, ['token'])
    const decode = auth.token.verify({ token: data.token })
    data.provider = decode.provider
    data.provider_id = decode.provider_id
    data.email = decode.email
  }

  // check user exists
  userData = useEmail
    ? await user.get({ email: data.email })
    : await user.get({
        social: { provider: data.provider, id: data.provider_id },
      })

  utility.assert(userData, 'Please enter the correct login details', 'email')

  // verify password
  if (useEmail) {
    const verified = await user.verifyPassword({
      id: userData.id,
      account: userData.account_id,
      password: data.password,
    })
    utility.assert(verified, 'Please enter the correct login details', 'password')
  }

  // done
  return authenticate(req, res, userData, data)
}

exports.signup = async function (req, res, next) {
  const data = req.body
  // utility.validate(data, ['email'])

  // check user exists
  const userData = await user.get({
    email: data.email,
  })

  // log the sign in and check if it's suspicious
  return authenticate(req, res, userData, data)
}

exports.signout = async function (req, res) {
  await token.delete({ provider: req.provider, user: req.user })
  return res.status(200).send()
}

async function authenticate(req, res, userData, data) {
  const provider = data?.provider || 'app'

  // create & store the token
  const jwt = auth.token({
    data: {
      userId: userData.id,
      provider: provider,
    },
  })

  // save token
  await token.save({
    provider: provider,
    data: { access: jwt },
    user: userData.id,
  })

  return res.status(200).send({
    token: jwt,
    name: userData.name,
    has_password: userData.has_password,
  })
}
