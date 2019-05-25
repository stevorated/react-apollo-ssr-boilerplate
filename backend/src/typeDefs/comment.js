import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    createComment(body: String!, post: String!): Comment @auth
  }
  type Comment {
    id: ID!
    post: Post!
    body: String!
    createdBy: User!
    createdAt: String!
    updatedAt: String!
  }
`
