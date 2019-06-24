import Joi from '@hapi/joi'

const avatarType = {
  name: 'string',
  base: Joi.string(),
  language: {
    objectId: 'must be a valid file type'
  },
  rules: [{
    name: 'avatarType',
    validate (params, value, state, options) {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowed.includes(value)) {
        return this.createError('string.avatarType', {}, state, options)
      }
      return value
    }
  }]
}

export default Joi.extend(avatarType)
