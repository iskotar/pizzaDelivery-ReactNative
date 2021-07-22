import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

const RoundButton = ({ onPress, children, backgroundColor = '#adcd34', size = 80 }) => {

  const styles = StyleSheet.create({
    body: {
      backgroundColor: backgroundColor,
      borderRadius: size / 2,
      height: size,
      width: size,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })

  return (
    <Pressable
      onPress={onPress}
      style={styles.body}
    >
      {children}
    </Pressable>
  )
}

export default RoundButton
