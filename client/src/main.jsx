import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import api from './apis/api'

const store = configureStore({
  reducer:{
    [api.reducerPath]:api.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
     <Provider  store={store}>
     <App />
     </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
