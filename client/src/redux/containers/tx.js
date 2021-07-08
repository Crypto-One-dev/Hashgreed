
import { connect } from 'react-redux'
import ACTIONS from '../actions/tx'

const mapStateToProps = state => ({
  txState: {
    tx: state.txReducer.tx
  }
})

const mapDispatchToProps = dispatch => ({
  txActions: {
    setTx: (value) => dispatch(ACTIONS.setTx(value)),
  }
})

function txContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
export default txContainer