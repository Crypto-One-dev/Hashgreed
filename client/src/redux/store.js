import { createStore, combineReducers } from 'redux'

import walletReducer from './reducers/wallet'
import priceReducer from './reducers/price'
import txReducer from './reducers/tx'

export default function configureStore(initialState) {
  const reducer = combineReducers({
    walletReducer,
    priceReducer,
    txReducer,
  })
  const store = createStore(reducer, initialState)
  return store
}