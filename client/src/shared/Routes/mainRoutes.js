import {
  TestPage,
  LoginPage,
  RegisterPage,
  PublicPage, 
  NotFoundPage, 
  ProfilePage,
  FeedPage,
  UserProfilePage
} from '../Pages'
import App from '../App'

const routes = [
  {
    ...App,
    routes: [
      {
        path: '/',
        exact: true,
        ...PublicPage
      },
      {
        path: '/profile',
        exact: true,
        ...ProfilePage,
      },
      {
        path: '/feed',
        exact: true,
        ...FeedPage,
      },

      {
        path: '/login',
        exact: true,
        ...LoginPage
      },
      {
        path: '/register',
        exact: true,
        ...RegisterPage
      },
      {
        path: '/logout',
        exact: true,
        ...LoginPage
      },
      {
        path: '/test',
        exact: true,
        ...TestPage
      },
      {
        path: '/profile/:id',
        exact: true,
        ...UserProfilePage,
      },
      {
        ...NotFoundPage
      }
    ]
  } 
]

export default routes