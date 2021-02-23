import ACTIONS from "../actions/wallet"
import _ from "lodash"

const defaultState = {
  address: '',
  publicKey: '',
  rkmt_balance: 0,
  hash_balance: 0,
  usdt_balance: 0,
  waves_balance: 0,
}

const walletReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.UNLOCK_WALLET: {
      let { address, publicKey } = action.payload
      let newState = _.cloneDeep(state)
      newState.address = address
      newState.publicKey = publicKey
      return newState
    }
    case ACTIONS.Types.LOCK_WALLET: {
      let newState = _.cloneDeep(state)
      newState.address = ''
      newState.publicKey = ''
      window.waves = null
      return newState
    }
    case ACTIONS.Types.SET_BALANCE: {
      let { rkmt_balance, hash_balance, usdt_balance, waves_balance } = action.payload
      let newState = _.cloneDeep(state)
      newState.rkmt_balance = rkmt_balance
      newState.hash_balance = hash_balance
      newState.usdt_balance = usdt_balance
      newState.waves_balance = waves_balance
      return newState
    }
    default:
      return state
  }
}

export default walletReducer