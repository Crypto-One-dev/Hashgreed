import ACTIONS from "../actions/wallet"
import _ from "lodash"

const defaultState = {
  address: '',
  token_balance: 0,
  waves_balance: 0,
  credit: 0,
}

const walletReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.UNLOCK_WALLET: {
      let { address } = action.payload
      let newState = _.cloneDeep(state)
      newState.address = address
      return newState
    }
    case ACTIONS.Types.LOCK_WALLET: {
      let newState = _.cloneDeep(state)
      newState.address = ''
      window.waves = null
      return newState
    }
    case ACTIONS.Types.SET_BALANCE: {
      let { token_balance, waves_balance, credit } = action.payload
      let newState = _.cloneDeep(state)
      newState.token_balance = token_balance
      newState.waves_balance = waves_balance
      newState.credit = credit
      return newState
    }
    default:
      return state
  }
}

export default walletReducer