import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RoundButton from '../../components/RoundButton'
import { Audio } from 'expo-av'

const OutgoingCallDialog = ({ show, onHide, driver }) => {

  if (!show) return null

  const [soundToPlay, setSoundToPlay] = useState()

  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/ringback.mp3'))
      setSoundToPlay(sound)
      await sound.playAsync()
    })()

    // return sound ? () => sound.unloadAsync() : undefined;
  }, [])

  const onDecline = () => {
    soundToPlay.unloadAsync()
    onHide()
  }

  return (
    <View
      style={styles.backdrop}
    >

      <View style={styles.avatarContainer}>
        <View
          style={styles.avatar}
        >
          <Image source={driver.avatar}/>
        </View>

        <Text style={{ color: 'white', fontSize: 20 }}>
          Calling to {driver.name}...
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <RoundButton
          onPress={onDecline}
          children={<Feather name="phone-off" size={30} color="white"/>}
          backgroundColor='red'
        />
      </View>
    </View>
  )
}

export default OutgoingCallDialog

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(21,21,21,0.94)',
    width: '100%',
    height: '100%',
  },

  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 150,
  },

  avatarContainer: {
    top: 200,
    alignItems: 'center'
  },

  avatar: {
    borderColor: '#adcd34',
    borderWidth: 2,
    borderRadius: 100,
    overflow: 'hidden',
    width: 200,
    marginBottom: 30
  }
})
