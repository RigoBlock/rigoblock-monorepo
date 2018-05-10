import { push } from 'react-router-redux'
import ROUTES from '../constants/routes'

export default {
  logOut: () => push(ROUTES.LOGIN),
  logIn: () => push(ROUTES.DASHBOARD)
}
