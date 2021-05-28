import * as Location from 'expo-location'
import { GOOGLE_MAP_API_KEY } from './constants'


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
