const Types = {
  SET_TX: "TX.SET",
}

// actions
const setTx = (value) => ({
  type: Types.SET_TX,
  payload: { value }
})

const txActions = {
  setTx,
  Types
}

export default txActions