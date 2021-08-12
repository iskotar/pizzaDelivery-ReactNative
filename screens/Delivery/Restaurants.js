import React from 'react'
import { Marker } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Restaurants = ({ isHidden, locations, onSelectMarker, selectedMarker }) => {
  if (isHidden) return null

  return locations.restaurants.map(({ geometry }, idx) => {
    const isMarkerSelected = idx === selectedMarker ? 50 : 25;
    return <Marker
      key={idx}
      coordinate={{
        longitude: geometry.location.lng,
        latitude: geometry.location.lat
      }}
      onPress={() => onSelectMarker(idx)}
      style={{ zIndex: idx === selectedMarker ? 1 : 0 }}
    >
      <View
        style={[styles.iconContainer, { borderRadius: isMarkerSelected }]}>
        <Ionicons name="pizza" size={isMarkerSelected} color='black'/>
      </View>
    </Marker>
  })
}

export default Restaurants

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 1,
    borderColor: '#adcd34',
    backgroundColor: 'white',
    padding: 5
  }
})
