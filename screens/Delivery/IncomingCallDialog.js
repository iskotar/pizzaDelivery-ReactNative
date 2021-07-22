import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RoundButton from '../../components/RoundButton'
import { Audio } from 'expo-av'

const IncomingCallDialog = ({ show, onHideCallDialog, driver, onShowFinishOrder }) => {

  if (!show) return null

  const [soundToPlay, setSoundToPlay] = useState()

  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/ringtone.mp3'))
      setSoundToPlay(sound)
      await sound.playAsync()
    })()

    // return sound ? () => sound.unloadAsync() : undefined;
  }, [])

  const onDecline = () => {
    soundToPlay.unloadAsync()
    onHideCallDialog()
    onShowFinishOrder()
  }

  const onAccept = async () => {
    await soundToPlay.unloadAsync()
    console.log('take')
    const { sound } = await Audio.Sound.createAsync(require('../../assets/Ring.mp3'))
    setSoundToPlay(sound)
    await sound.playAsync()
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
          {driver.name} calling...
        </Text>
      </View>

      <View style={styles.buttonContainer}>

        <RoundButton
          onPress={onAccept}
          children={<Feather name="phone-call" size={30} color="white"/>}
        />

        <RoundButton
          onPress={onDecline}
          children={<Feather name="phone-off" size={30} color="white"/>}
          backgroundColor='red'
        />
      </View>
    </View>
  )
}

export default IncomingCallDialog

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(21,21,21,0.94)',
    width: '100%',
    height: '100%',
  },

  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
