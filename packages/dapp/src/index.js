import './components/_settings/_base.scss'
import './images/favicon.ico'
import * as ROUTES from './constants/routes'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { persistor, store } from './store'
import Dashboard from './pages/Dashboard'
import Dragos from './pages/Dragos'
import Help from './pages/Help'
import Login from './pages/Login'
import Preferences from './pages/Preferences'
import React from 'react'
import ReactDOM from 'react-dom'
import Vaults from './pages/Vaults'
import globalActions from './actions/global-actions'
import history from './store/history'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.PREFERENCES} component={Preferences} />
          <Route exact path={ROUTES.HELP} component={Help} />
          <Route
            path={ROUTES.VAULTS || `${ROUTES.VAULTS}/:id`}
            component={Vaults}
          />
          <Route exact path={ROUTES.DRAGOS} component={Dragos} />
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
const init = () => store.dispatch(globalActions.init())

process.env.REACT_APP_TEST ? (window.init = init) : init()

registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
