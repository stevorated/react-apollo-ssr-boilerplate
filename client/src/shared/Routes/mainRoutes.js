import {
  TestPage,
  LoginPage,
  RegisterPage,
  PublicPage, 
  NotFoundPage, 
  PrivatePage
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
        ...PrivatePage,
        path: '/admins'
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
        ...NotFoundPage
      }
    ]
  } 
]

export default routes