import * as ROUTES from '../constants/routes'
import { push } from 'react-router-redux'

export default {
  logout: () => push(ROUTES.LOGIN),
  login: url => push(url || ROUTES.DASHBOARD),
  navigateToVault: id => push(`${ROUTES.VAULTS}${id}`)
}
