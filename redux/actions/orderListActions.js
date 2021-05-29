import { GOOGLE_MAP_API_KEY } from '../../constants'
import * as Location from 'expo-location'

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

export function resetTotal () {
  return {
    type: 'RESET_TOTAL'
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

export function estimateDelivery (destination) {
  return {
    type: 'ESTIMATE_DELIVERY',
    payload: {
      destination: destination,
      price: 10
    }
  }
}

export function payAndFinish (creditCard) {

  return {
    type: 'PAY_AND_FINISH',
    payload: creditCard
  }
}

export function getUserLocation () {
  return async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      console.log('User: Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})

    const userLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.10,
      longitudeDelta: 0
    }

    dispatch({
      type: 'USER_LOCATION',
      payload: userLocation
    })

    return userLocation
  }
}


export function getNearbyPlacesBySearchRequest () {
  return async (dispatch) => {

    const {latitude, longitude} = await dispatch(getUserLocation())

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
