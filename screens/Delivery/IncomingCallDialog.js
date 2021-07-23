import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Modal } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RoundButton from '../../components/RoundButton'
import { Audio } from 'expo-av'

const IncomingCallDialog = ({ show, onShowCallDialog, driver, onShowFinishOrder }) => {

  if (!show) return null

  const [soundToPlay, setSoundToPlay] = useState()
  const [isCallAccepted, setTsCallAccepted] = useState(false)

  useEffect(() => {
    (async () => {
      const soundObject = new Audio.Sound()
      await soundObject.loadAsync(require('../../assets/ringtone.mp3'))
      await soundObject.playAsync()
      await setSoundToPlay(soundObject)

      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          soundObject.unloadAsync()
          onShowCallDialog(false)

          setTimeout(() => {
            onShowCallDialog(true)
          },3000)
        }
      })
    })()
  }, [])

  const onDecline = () => {
    soundToPlay.unloadAsync()
    onShowCallDialog(false)
    onShowFinishOrder()
  }

  const onAccept = async () => {
    setTsCallAccepted(true)
    await soundToPlay.unloadAsync()
    await soundToPlay.loadAsync(require('../../assets/delivered.mp3'))
    await soundToPlay.playAsync()

    soundToPlay.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        soundToPlay.unloadAsync()
        onDecline()
      }
    })
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
            {driver.name} calling...
          </Text>
        </View>

        <View style={styles.buttonContainer}>

          {
            !isCallAccepted && <RoundButton
              onPress={onAccept}
              children={<Feather name="phone-call" size={30} color="white"/>}
            />
          }

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
