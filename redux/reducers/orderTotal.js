import { drivers } from '../../constants'

const initialState = {
  subtotal: 0,
  tax: 0,
  deliveryPrice: 0,
  isPayed: false,
  destination: null,
  driver: drivers[Math.floor(Math.random() * 2)]
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
        destination: action.payload.destination,
        deliveryPrice: action.payload.price
      }

    case 'PAY_AND_FINISH':
      return {
        ...state,
        creditCard: action.payload,
        isPayed: true,
        driver: drivers[Math.floor(Math.random() * 2)]
      }

    case 'RESET_TOTAL':
      return initialState

    default:
      return state
  }
}
