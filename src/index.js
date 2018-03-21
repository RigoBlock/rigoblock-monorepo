import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './images/favicon.ico'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
