import { getUserLocation } from '../../mapAPI'
import { GOOGLE_MAP_API_KEY } from '../../constants'

export function addToOrder (item) {

  return {
    type: 'ADD',
    payload: item
  }
}

export function increaseOrderCount (id, price) {
  return {
    type: 'PLUS_COUNT',
    payload: { id, price }
  }
}

export function decreaseOrderCount (id, price) {
  return {
    type: 'MINUS_COUNT',
    payload: { id, price }
  }
}

export function deleteFromOrder (id) {
  return {
    type: 'DELETE',
    payload: id
  }
}

export function resetOrder () {
  return {
    type: 'RESET_ORDER'
  }
}

export function passOrderListToTotal () {
  return (dispatch, getState) => {
    dispatch({
      type: 'PASS_ORDER_LIST_TO_TOTAL',
      payload: getState().orderList
    })
  }
}

export function estimateDelivery (address) {
  return {
    type: 'ESTIMATE_DELIVERY',
    payload: {
      destination: address,
      price: 10
    }
  }
}

export function getNearbyPlacesBySearchRequest() {
  return async (dispatch) => {
    const { latitude, longitude } = await getUserLocation();
    const location = `location=${latitude},${longitude}`;
    const radiusAndType = 'radius=1500&type=restaurant';
    const searchText = 'pizza restaurants';
    const queryParameters = `${location}&${radiusAndType}&keyword=${searchText}&key=${GOOGLE_MAP_API_KEY}`

    await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${queryParameters}`)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: 'NEARBY_PLACES',
        payload: data.results
      })
    })
    .catch(err => err)
  }
}
