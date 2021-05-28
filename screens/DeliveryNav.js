import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import { Entypo } from '@expo/vector-icons'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAP_API_KEY } from '../constants'
import { getAddressLocation, getNearbyPlacesBySearchRequest, getUserLocation } from '../mapAPI'


const DeliveryNav = ({ route }) => {
const [restaurantLocation, setRestaurantLocation] = useState()
const [destinationLocation, setDestinationLocation] = useState()
const [userLocation, setUserLocation] = useState()


  useEffect(() => {
    (async () => {
      // const locU = await getUserLocation()
      // setUserLocation(locU)
      // const loc = await getAddressLocation('pizza restaurants Fremont, CA')
      // setAddressLocation(loc)

      // await getNearbyPlacesBySearchRequest('pizza restaurants Fremont, CA')
    })()

    // return () => (async () => {
    //   const loc = await getAddressLocation('Apple Park Visitor Center')
    //   setAddressLocation(loc)
    // })()
  },[])

  const Map = () => {

    // const origin = {
    //   latitude: 37.5497738,
    //   longitude: -121.9881435,
    //   latitudeDelta: 0.10,
    //   longitudeDelta: 0
    // }
    // const destination = {
    //   latitude: 37.5491738,
    //   longitude: -121.9181435,
    //   latitudeDelta: 0.10,
    //   longitudeDelta: 0
    // }


    return (
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={restaurantLocation}
        showsUserLocation
      >

        <MapViewDirections
          origin={restaurantLocation}
          destination={destinationLocation}
          apikey={GOOGLE_MAP_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
    )
  }

  return (
    <View style={styles.container}>
      <Map/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapStyle: {
    width: '100%',
    height: '100%'
  },
})

export default DeliveryNav
