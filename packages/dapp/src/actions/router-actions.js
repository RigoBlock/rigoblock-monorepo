import { push } from 'react-router-redux'
import ROUTES from '../constants/routes'

export default {
  logout: () => push(ROUTES.LOGIN),
  login: () => push(ROUTES.DASHBOARD)
}
