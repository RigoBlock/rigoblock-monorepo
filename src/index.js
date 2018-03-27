import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './images/favicon.ico'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App title={'RigoBlock'} />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
