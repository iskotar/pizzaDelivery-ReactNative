import React from 'react'
import { Marker } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Restaurants = ({ isHidden, locations, onSelectMarker, selectedMarker }) => {
  if (isHidden) return null

  return locations.restaurants.map(({ geometry }, idx) => {
    const isMarkerSelected = idx === selectedMarker

    return <Marker
      key={idx}
      coordinate={{
        longitude: geometry.location.lng,
        latitude: geometry.location.lat
      }}
      onPress={() => onSelectMarker(idx)}
      style={isMarkerSelected && { zIndex: 1 }}
    >
      <View
        style={[styles.iconContainer, isMarkerSelected && { backgroundColor: '#adcd34'}]}>
        <Ionicons name="pizza" size={25} color={'black'}/>
      </View>
    </Marker>
  })
}

export default Restaurants

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#adcd34',
    backgroundColor: 'white',
    padding: 5
  }
})
