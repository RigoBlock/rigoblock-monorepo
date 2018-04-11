import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import history from './store/history'
import { store, persistor } from './store'
import Dashboard from './pages/Dashboard'
import Vault from './pages/Vault'
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
          <Route exact path="/vault" render={() => <Vault />} />
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
