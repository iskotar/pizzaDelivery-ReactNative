import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const SplashScreen = () => {

  return (
    <View style={styles.body}>

      <Text style={}>Zae</Text>
      <Text style={}>PiZZA</Text>
      <Ionicons name="pizza" size={150} color='white'/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#adcd34',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  name1: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    transform: [{ rotate: "45deg" }]
  },

  name2: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold'
  }
})
