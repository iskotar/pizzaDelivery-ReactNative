import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAP_API_KEY } from '../constants'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'


const DeliveryNav = ({ locations, orderList, orderTotal, navigation }) => {

  useFocusEffect(
    React.useCallback(() => {
      console.log('DeliveryNav mounted')

      return () => {
        console.log('DeliveryNav UNmounted')
      };
    }, [navigation])
  )

  const destinationAddress = orderTotal.destination
  const restaurantsInOrder = orderList.map(({ restaurant }) => restaurant)

  const Restaurants = () => {
    return locations.restaurants.map(({ geometry, name, vicinity }, idx) => (
      <Marker
        key={idx}
        coordinate={{
          longitude: geometry.location.lng,
          latitude: geometry.location.lat
        }}
        title={vicinity}
      >
        <View style={{borderRadius: 25, borderWidth: 1, borderColor: '#adcd34', backgroundColor: 'white', padding: 5}}>
          <Ionicons name="pizza" size={25} color='black'/>
        </View>
      </Marker>
    ))
  }

  const RoutePoints = () => {
    return locations.restaurants.map(({ geometry, name, vicinity }, idx) => {
      if (!restaurantsInOrder.includes(name)) return null

      return (
        <Marker
          key={idx}
          coordinate={{
            longitude: geometry.location.lng,
            latitude: geometry.location.lat
          }}
          title={vicinity}
        >
          <View
            style={{ borderRadius: 25, borderWidth: 1, borderColor: '#adcd34', backgroundColor: 'white', padding: 5 }}>
            <Ionicons name="pizza" size={25} color='black'/>
          </View>
        </Marker>
      )
    })
  }

  const Route = () => {
    if (!orderList.length) return null

    return (
      <MapViewDirections
        origin={orderList[0].address}
        destination={destinationAddress ? destinationAddress.address : locations.userLocation}
        apikey={GOOGLE_MAP_API_KEY}
        strokeWidth={5}
        strokeColor='hotpink'
        waypoints={orderList.map(({ address }) => address)}
        optimizeWaypoints
      />
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={locations.userLocation}
        showsUserLocation
      >
        {
          restaurantsInOrder.length ? <RoutePoints/> : <Restaurants/>
        }
        <Route/>
      </MapView>
    </View>
  )
}

const mapStateToProps = (state) => ({
  locations: state.locations,
  orderList: state.orderList,
  orderTotal: state.orderTotal,
})

export default connect(mapStateToProps)(DeliveryNav)

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
