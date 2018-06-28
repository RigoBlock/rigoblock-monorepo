import * as ROUTES from '../constants/routes'
import { push } from 'react-router-redux'

export default {
  logout: () => push(ROUTES.LOGIN),
  login: () => push(ROUTES.DASHBOARD),
  goToVault: id => push(`${ROUTES.VAULTS}/${id}`)
}
