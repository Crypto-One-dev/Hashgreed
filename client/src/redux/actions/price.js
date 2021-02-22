const Types = {
  SET_PRICE: "PRICE.SET",
}

// actions
const setPrice = (type, value) => ({
  type: Types.SET_PRICE,
  payload: { type, value }
})

const priceActions = {
  setPrice,
  Types
}

export default priceActions