import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import history from './store/history'
import { store, persistor } from './store'
import Dashboard from './pages/Dashboard'
import Preferences from './pages/Preferences'
import Help from './pages/Help'
import './images/favicon.ico'
import './components/_settings/_base.scss'
import registerServiceWorker from './registerServiceWorker'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" render={() => <Dashboard />} />
          <Route exact path="/preferences" render={() => <Preferences />} />
          <Route exact path="/help" render={() => <Help />} />
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

console.log(store.dispatch)

registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
