import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Modal } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RoundButton from '../../components/RoundButton'
import { Audio } from 'expo-av'
import { driver } from '../../constants'

const OutgoingCallDialog = ({ show, onHide }) => {

  if (!show) return null

  const [soundToPlay, setSoundToPlay] = useState()

  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/dialing.mp3'))
      setSoundToPlay(sound)
      await sound.playAsync()

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.positionMillis >= 14000) {
          sound.unloadAsync()
          onHide()
        }
      })
    })()
  }, [])

  const onDecline = () => {
    soundToPlay.unloadAsync()
    onHide()
  }

  return (
    <Modal>
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
    </Modal>
  )
}

export default OutgoingCallDialog

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(21,21,21,0.94)',
    flex: 1,
    justifyContent: 'space-around'
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },

  avatarContainer: {
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
