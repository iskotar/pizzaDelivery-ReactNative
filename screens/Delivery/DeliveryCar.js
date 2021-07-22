import React, { useEffect, useState } from 'react'
import { Marker } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const DeliveryCar = ({ routePoints, onShowCallDialog, destinationAddress }) => {

  if (!destinationAddress) return null

  const [curLoc, setCurLoc] = useState(routePoints[0])
  const [idx, setIdx] = React.useState(0);

  useEffect(() => {
    if(idx < routePoints.length) {
      setTimeout(() => setIdx(idx + 1), 1000);
      setCurLoc(routePoints[idx])
    }
    else {
      if(routePoints.length) onShowCallDialog()
    }
  },[idx, routePoints]);

  return (
    <Marker
      title="Rajesh"
      coordinate={curLoc && curLoc}
    >
      <View
        style={styles.car}>
        <Ionicons
          name="car"
          size={25}
          color='black'
        />
      </View>
    </Marker>
  )
}

export default DeliveryCar

const styles = StyleSheet.create({
  car: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#adcd34',
    backgroundColor: 'white',
    padding: 3
  }
})
