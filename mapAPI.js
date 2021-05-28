import * as Location from 'expo-location'
import { GOOGLE_MAP_API_KEY } from './constants'

export const getUserLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync()

  if (status !== 'granted') {
    console.log('User: Permission to access location was denied')
    return
  }

  let location = await Location.getCurrentPositionAsync({})

  console.log('User: ', location)
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.10,
    longitudeDelta: 0
  }
}

export const getAddressLocation = async (address) => {
  let { status } = await Location.requestForegroundPermissionsAsync()

  if (status !== 'granted') {
    console.log('Address: Permission to access location was denied')
    return
  }

  Location.setGoogleApiKey(GOOGLE_MAP_API_KEY)

  await Location.getCurrentPositionAsync({})
  let location = await Location.geocodeAsync(address, { useGoogleMaps: true })
  console.log('Address: ', location)
  return {
    latitude: location[0].latitude,
    longitude: location[0].longitude,
    latitudeDelta: 0.10,
    longitudeDelta: 0
  }
}

// export const getNearbyPlacesBySearchRequest = async (searchText) => {
//   const { latitude, longitude } = await getUserLocation();
//   const queryParameters = `location=${latitude},${longitude}&radius=1500&type=restaurant&keyword=${searchText}&key=AIzaSyAMPwg2GmuHVq301-VZ-Ei0eftVR8Z31rA`
//   const z = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${queryParameters}`)
//   .then(response => response.json())
//   .then(data => data.results);
//
//   console.log(z)
//   // return {
//   //   latitude: location[0].latitude,
//   //   longitude: location[0].longitude,
//   //   latitudeDelta: 0.10,
//   //   longitudeDelta: 0
//   // }
//
//   return z
// }

