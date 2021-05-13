
import { connect } from 'react-redux'
import ACTIONS from '../actions/wallet'

const mapStateToProps = state => ({
  walletState: {
    address: state.walletReducer.address,
    publicKey: state.walletReducer.publicKey,
    rkmt_balance: state.walletReducer.rkmt_balance,
    hash_balance: state.walletReducer.hash_balance,
    usdt_balance: state.walletReducer.usdt_balance,
    waves_balance: state.walletReducer.waves_balance,
  }
})

const mapDispatchToProps = dispatch => ({
  walletActions: {
    unlockWallet: (address, publicKey) => dispatch(ACTIONS.unlockWallet(address, publicKey)),
    lockWallet: () => dispatch(ACTIONS.lockWallet()),
    setBalance: (rkmt_balance, hash_balance, usdt_balance, waves_balance) => dispatch(ACTIONS.setBalance(rkmt_balance, hash_balance, usdt_balance, waves_balance)),
  }
})

function walletContainer(component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
export default walletContainer