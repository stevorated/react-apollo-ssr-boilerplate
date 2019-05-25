import {
  TestPage,
  LoginPage, 
  HomePage, 
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
        ...HomePage
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