import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    createPost(body: String): Post @auth
  }

  type Post {
    id: ID!
    body: String!
    createdBy: User!
    comments: [Comment!] # // TODO: consider removing "!"
    lastComments: Comment
    createdAt: String!
    updatedAt: String!
  }
`
