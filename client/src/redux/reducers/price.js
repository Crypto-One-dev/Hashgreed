import ACTIONS from "../actions/price"
import _ from "lodash"

const defaultState = {
  rkmt_price: 0,
  waves_price: 0,
}

const priceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_PRICE: {
      let { type, value } = action.payload
      let newState = _.cloneDeep(state)
      if(type === 'RKMT') {
        newState.rkmt_price = value
      }
      if(type === 'WAVES') {
        newState.waves_price = value
      }
      return newState
    }
    default:
      return state
  }
}

export default priceReducer