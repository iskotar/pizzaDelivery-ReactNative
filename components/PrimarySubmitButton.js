import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const PrimarySubmitButton = ({ onPress, children, text }) => {
  return (
    <TouchableOpacity style={styles.body} onPress={onPress}>
      {
        children && <View style={styles.children}>
          {children}
        </View>
      }
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default PrimarySubmitButton

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#adcd34',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },

  children: {
    marginRight: 10
  }
})
