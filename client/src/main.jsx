import React from 'react'
import 'flowbite'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store/store.jsx'
import { BidsContextProvider } from './context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <BidsContextProvider>
        <App />
      </BidsContextProvider>
      </BrowserRouter>

    {/* </Provider> */}
  </React.StrictMode>,
)
