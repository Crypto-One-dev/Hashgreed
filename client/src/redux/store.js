import { createStore, combineReducers } from 'redux'

import walletReducer from './reducers/wallet'
import priceReducer from './reducers/price'

export default function configureStore(initialState) {
  const reducer = combineReducers({
    walletReducer,
    priceReducer,
  })
  const store = createStore(reducer, initialState)
  return store
}