import Joi from './joi' // Custom Joi for userId

export const createComment = userId => Joi.object().keys({
  body: Joi.string().min(2).max(500).label('Comment Body'),
  post: Joi.string().objectId().label('Post ID')
})
