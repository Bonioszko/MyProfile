const jwt = require('jsonwebtoken')

exports.token = function ({ data, secret, duration }) {
  return jwt.sign(data, secret || process.env.TOKEN_SECRET, {
    expiresIn: '7d',
  })
}

exports.token.verify = function ({ token, secret }) {
  return jwt.verify(token, secret || process.env.TOKEN_SECRET)
}

exports.verify = function () {
  return async function (req, res, next) {
    try {
      const header = req.headers['authorization']

      // check header was provided
      if (!header) {
        throw { message: 'No authorization header provided' }
      }

      // process the header
      const type = header.split(' ')[0]
      const token = header.split(' ')[1]

      // request is using api key
      if (type === 'Bearer') {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET)

        if (decode.userId && decode.provider) {
          req.user = decode.userId
          req.provider = decode.provider
          next()
        } else throw { message: 'Invalid token' }
      } else throw { message: 'Unsupported auth header' }
    } catch (err) {
      res.status(401).send({
        message: err.message || 'You do not have permission to perform this action.',
      })
    }
  }
}
