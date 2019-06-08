import Joi from './joi' // Custom Joi for userId

export const createPost = userId => Joi.object().keys({
  body: Joi.string().min(2).max(500).label('Post Body'),
  createdBy: Joi.string().objectId().label('User ID')
})
