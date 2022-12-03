import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configurationOfStores } from './models/index.store'
import RouterApp from './router'
import './index.less'
import 'antd/dist/antd.css'
import createHistory from 'history/createBrowserHistory'

if (module.hot) {
  module.hot.accept()
}

const container = document.getElementById('root')

// create a root components
const root = createRoot(container)

// call the config of stores redux
const store = configurationOfStores()

store.addModels(require('./models/main/model.main')) // initialize the models of "main" at the first opened application
store.addModels(require('./models/utilities/model.loading'))

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterApp history={createHistory()} />
  </Provider>
  // </React.StrictMode>
)


// reportWebVitals()
