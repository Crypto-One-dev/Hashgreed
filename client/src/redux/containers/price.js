
import { connect } from 'react-redux'
import ACTIONS from '../actions/price'

const mapStateToProps = state => ({
  priceState: {
    rkmt_price: state.priceReducer.rkmt_price,
    waves_price: state.priceReducer.waves_price,
    usdt_price: state.priceReducer.usdt_price,
    hash_price: state.priceReducer.hash_price
  }
})

const mapDispatchToProps = dispatch => ({
  priceActions: {
    setPrice: (type, value) => dispatch(ACTIONS.setPrice(type, value)),
  }
})

function priceContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
export default priceContainer