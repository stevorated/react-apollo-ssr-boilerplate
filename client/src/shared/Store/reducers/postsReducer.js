export default (state=[], {type, payload}) => {
  switch (type) {
    case 'FETCH_MY_POSTS':
      return {
        ...state,
        ...payload.me
      }
    case 'CREATE_POST':
      return {
        ...state,
        posts: state.posts.concat(payload)
      }
    case 'PUSH_NEW_COMMENT':
      const { id } = payload.post
      const updatedComments = state.posts.map((post)=> {
        if(post.id === id) {
          return {
            ...post,
            comments: post.comments.concat(payload)
          }} else {
            return post
          }
        }
      )
      return { 
        ...state,
        posts: updatedComments
      }
    default:
      return state
  }
}