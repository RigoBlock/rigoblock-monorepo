import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import history from './store/history'
import App from './pages/App'
import Vault from './pages/Vault'
import './images/favicon.ico'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" render={() => <App title={'RigoBlock'} />} />
        <Route exact path="/vault" render={() => <Vault />} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
