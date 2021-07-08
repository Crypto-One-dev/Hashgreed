import ACTIONS from '../actions/tx'
import _ from 'lodash'

const defaultState = {
  tx: ''
}

const txReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_TX: {
      let { value } = action.payload
      let newState = _.cloneDeep(state)
      newState.tx = value
      return newState
    }
    default:
      return state
  }
}

export default txReducer