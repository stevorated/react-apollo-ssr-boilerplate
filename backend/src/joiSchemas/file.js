import Joi from './JoiFiles'

export const uploadAvatar = file => Joi.object().keys({
  mimetype: Joi.string().avatarType().label('Invalid File Type'),
  size: Joi.number().required().max(2000000).label('File too big')
})
