const Types = {
  UNLOCK_WALLET: "WALLET.UNLOCK",
  LOCK_WALLET: "WALLET.LOCK",
  SET_BALANCE: "WALLET.SET.BALANCE",
}

// actions
const unlockWallet = (address, publicKey) => ({
  type: Types.UNLOCK_WALLET,
  payload: { address, publicKey }
})
const lockWallet = () => ({
  type: Types.LOCK_WALLET
})
const setBalance = (rkmt_balance, hash_balance, usdt_balance, waves_balance) => ({
  type: Types.SET_BALANCE,
  payload: { rkmt_balance, hash_balance, usdt_balance, waves_balance }
})

const walletActions = {
  unlockWallet,
  lockWallet,
  setBalance,
  Types
}

export default walletActions