const Types = {
  UNLOCK_WALLET: "WALLET.UNLOCK",
  LOCK_WALLET: "WALLET.LOCK",
  SET_BALANCE: "WALLET.SET.BALANCE",
}

// actions
const unlockWallet = (address) => ({
  type: Types.UNLOCK_WALLET,
  payload: { address }
})
const lockWallet = () => ({
  type: Types.LOCK_WALLET
})
const setBalance = (token_balance, waves_balance, credit) => ({
  type: Types.SET_BALANCE,
  payload: { token_balance, waves_balance, credit }
})

const walletActions = {
  unlockWallet,
  lockWallet,
  setBalance,
  Types
}

export default walletActions