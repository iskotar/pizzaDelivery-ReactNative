export default function locations(state = {}, action) {

  switch (action.type) {
    case 'NEARBY_PLACES':
      return {
        ...state,
        restaurants: action.payload
      }

    case 'USER_LOCATION':
      return {
        ...state,
        userLocation: action.payload
      }

    default:
      return state
  }
}
