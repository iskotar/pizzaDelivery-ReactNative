import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const SplashScreen = () => {

  return (
    <View style={{
      backgroundColor: '#adcd34',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>

      <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold', transform: [{ rotate: "45deg" }]}}>Zae</Text>
      <Text style={{ color: 'white', fontSize: 80, fontWeight: 'bold'}}>PiZZA</Text>
      <Ionicons name="pizza" size={150} color='white'/>
    </View>
  )
}

export default SplashScreen
