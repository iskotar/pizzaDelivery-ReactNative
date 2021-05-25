export default function orderList(state = [], action) {

  switch (action.type) {
    case 'ADD':
      const {cheese, name, size, price} = action.payload;
      let isElementExist = false;
      const updatedState = state.map((el) => {
        if(el.cheese === cheese && el.name === name && el.size === size) {
          el.count++
          el.price += price
          isElementExist = true;
        }
        return el
      })
      if(isElementExist) return updatedState
      else return [
        ...state,
        {
          ...action.payload,
          count: 1,
          originalPrice: price,
          id: Date.now()
        }
      ]

    case 'PLUS_COUNT':
      return state.map(el => {
        if(el.id === action.payload.id){
          el.count++
          el.price += el.originalPrice
        }
        return el
      })

    case 'MINUS_COUNT':
      return state.map(el => {
        if(el.id === action.payload.id && el.count > 1){
          el.count--
          el.price -= el.originalPrice
        }
        return el
      })

    case 'DELETE':
      return state.filter(el => el.id !== action.payload)

    case 'RESET':
      return []

    default:
      return state
  }
}
