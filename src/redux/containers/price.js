
import { connect } from "react-redux"
import ACTIONS from "../actions/price"

const mapStateToProps = state => ({
  priceState: {
    token_price: state.priceReducer.token_price,
    waves_price: state.priceReducer.waves_price,
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