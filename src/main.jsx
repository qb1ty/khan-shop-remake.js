import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

import './index.css'
import Root from './App.jsx';
import "./Languages/locales.js"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Root />
  </Provider>
)