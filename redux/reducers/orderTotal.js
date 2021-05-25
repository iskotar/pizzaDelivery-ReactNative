const initialState = {
  subtotal: 0,
  tax: 0,
  deliveryPrice: 0
}

export default function orderTotal(state = initialState, action) {

  switch (action.type) {
    case 'PASS_ORDER_LIST_TO_TOTAL':
      const subtotal = action.payload.reduce((acc, order) => acc + order.price, 0);

      return {
        ...state,
        subtotal,
        tax: subtotal * 0.085
      }

    case 'ESTIMATE_DELIVERY':
      return {
        ...state,
        deliveryAddress: action.payload.destination,
        deliveryPrice: action.payload.price
      }

    default:
      return state
  }
}
