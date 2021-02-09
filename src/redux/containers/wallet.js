
import { connect } from "react-redux"
import ACTIONS from "../actions/wallet"

const mapStateToProps = state => ({
  walletState: {
    address: state.walletReducer.address,
    token_balance: state.walletReducer.token_balance,
    waves_balance: state.walletReducer.waves_balance,
    credit: state.walletReducer.credit,
  }
})

const mapDispatchToProps = dispatch => ({
  walletActions: {
    unlockWallet: (address) => dispatch(ACTIONS.unlockWallet(address)),
    lockWallet: () => dispatch(ACTIONS.lockWallet()),
    setBalance: (token_balance, waves_balance, credit) => dispatch(ACTIONS.setBalance(token_balance, waves_balance, credit)),
  }
})

function walletContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
export default walletContainer