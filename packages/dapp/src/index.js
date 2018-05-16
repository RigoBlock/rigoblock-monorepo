import './components/_settings/_base.scss'
import './images/favicon.ico'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { persistor, store } from './store'
import Dashboard from './pages/Dashboard'
import Help from './pages/Help'
import Login from './pages/Login'
import Preferences from './pages/Preferences'
import ROUTES from './constants/routes'
import React from 'react'
import ReactDOM from 'react-dom'
import globalActions from './actions/global-actions'
import history from './store/history'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path={ROUTES.DASHBOARD} render={() => <Dashboard />} />
          <Route exact path={ROUTES.LOGIN} render={() => <Login />} />
          <Route
            exact
            path={ROUTES.PREFERENCES}
            render={() => <Preferences />}
          />
          <Route exact path={ROUTES.HELP} render={() => <Help />} />
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
const init = () => store.dispatch(globalActions.init())

window.init = process.env.REACT_APP_TEST ? init : undefined

init()

registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
