import React from 'react'
import { Marker } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Restaurants = ({ isHidden, locations }) => {
  if (isHidden) return null

  return locations.restaurants.map(({ geometry, name, vicinity }, idx) => (
    <Marker
      key={idx}
      coordinate={{
        longitude: geometry.location.lng,
        latitude: geometry.location.lat
      }}
      title={vicinity}
    >
      <View
        style={styles.iconContainer}>
        <Ionicons name="pizza" size={25} color='black'/>
      </View>
    </Marker>
  ))
}

export default Restaurants

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#adcd34',
    backgroundColor: 'white',
    padding: 5
  }
})
